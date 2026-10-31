-- ============================================================================
-- Chennai Rents - Google Auth Users Table & Secure Upsert Setup
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/hnnkhmfrpwdrkkjbgckv/sql
-- ============================================================================

-- 1. Create public.users table for Google Sign-Up / Sign-In records
create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    auth_user_id uuid references auth.users(id) on delete set null,
    google_id text unique not null,
    email text unique not null,
    name text not null,
    given_name text,
    picture text,
    email_verified boolean default true not null,
    login_count integer default 1 not null,
    created_at timestamptz default now() not null,
    last_login_at timestamptz default now() not null
);

-- 2. Indexes for fast lookup
create index if not exists users_google_id_idx on public.users (google_id);
create index if not exists users_email_idx on public.users (email);
create index if not exists users_last_login_idx on public.users (last_login_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- Allow authenticated users to read only their own profile
drop policy if exists "Users can view own profile" on public.users;
create policy "Users can view own profile" on public.users
    for select
    using (auth.uid() = auth_user_id);

-- 4. Secure RPC to record/update Google Sign-In in public.users
-- Uses SECURITY DEFINER so the frontend can record sign-ins without exposing
-- the users table to public SELECT scraping.
create or replace function public.upsert_google_user(
    p_google_id text,
    p_email text,
    p_name text,
    p_given_name text default null,
    p_picture text default null,
    p_email_verified boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    v_user record;
begin
    if p_google_id is null or length(trim(p_google_id)) = 0 then
        raise exception 'google_id is required';
    end if;

    if p_email is null or length(trim(p_email)) = 0 then
        raise exception 'email is required';
    end if;

    insert into public.users (
        auth_user_id,
        google_id,
        email,
        name,
        given_name,
        picture,
        email_verified,
        login_count,
        created_at,
        last_login_at
    )
    values (
        auth.uid(),
        p_google_id,
        lower(trim(p_email)),
        coalesce(nullif(trim(p_name), ''), split_part(p_email, '@', 1)),
        p_given_name,
        p_picture,
        coalesce(p_email_verified, true),
        1,
        now(),
        now()
    )
    on conflict (google_id) do update
    set
        auth_user_id = coalesce(auth.uid(), public.users.auth_user_id),
        email = excluded.email,
        name = excluded.name,
        given_name = coalesce(excluded.given_name, public.users.given_name),
        picture = coalesce(excluded.picture, public.users.picture),
        email_verified = excluded.email_verified,
        login_count = public.users.login_count + 1,
        last_login_at = now()
    returning id, google_id, email, name, given_name, picture, login_count, created_at, last_login_at
    into v_user;

    return to_jsonb(v_user);
end;
$$;

grant execute on function public.upsert_google_user(text, text, text, text, text, boolean) to anon, authenticated;

-- 5. Automatic Trigger: Sync Supabase Auth (auth.users) into public.users
create or replace function public.handle_supabase_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    if new.email is not null then
        insert into public.users (
            auth_user_id,
            google_id,
            email,
            name,
            given_name,
            picture,
            email_verified,
            login_count,
            created_at,
            last_login_at
        )
        values (
            new.id,
            coalesce(new.raw_user_meta_data->>'sub', new.id::text),
            lower(new.email),
            coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
            new.raw_user_meta_data->>'given_name',
            coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture'),
            coalesce((new.raw_user_meta_data->>'email_verified')::boolean, true),
            1,
            now(),
            now()
        )
        on conflict (google_id) do update
        set
            auth_user_id = new.id,
            email = excluded.email,
            name = excluded.name,
            picture = coalesce(excluded.picture, public.users.picture),
            last_login_at = now();
    end if;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert or update on auth.users
    for each row execute function public.handle_supabase_auth_user();
