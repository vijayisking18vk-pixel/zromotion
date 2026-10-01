-- chennai.rent Supabase Database Setup Script (Complete bengaluru.rent Form Parity)
-- Paste this script into the Supabase SQL Editor (https://supabase.com/dashboard/project/hnnkhmfrpwdrkkjbgckv/sql)

-- 1. Enable PostGIS Extension
create extension if not exists postgis;

-- 2. Drop existing tables and views to allow clean reset
drop view if exists pins_public cascade;
drop view if exists seeker_pins_public cascade;
drop view if exists city_stats cascade;
drop view if exists neighbourhood_stats cascade;
drop table if exists comments cascade;
drop table if exists ratings cascade;
drop table if exists reports cascade;
drop table if exists daily_matches cascade;
drop table if exists seeker_pins cascade;
drop table if exists pins cascade;
drop table if exists message_board cascade;
drop table if exists ip_nudges cascade;

-- 3. Create PINS Table (Combines Rent Reports & Owner Listings)
create table pins (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now() not null,
    latitude double precision not null,
    longitude double precision not null,
    location geography(Point, 4326),
    bhk integer not null check (bhk >= 1 and bhk <= 5), -- 5 represents 5+ BHK
    rent numeric not null check (rent > 0),
    deposit numeric default 0 not null,
    furnishing text not null check (furnishing in ('furnished', 'unfurnished', 'semi')),
    gated boolean not null,
    occupant_type text check (occupant_type in ('family', 'bachelor', 'couple')),
    society text,
    feedback text,
    parking_count integer default 0 not null,
    
    -- New Form Parity Columns
    maintenance_included boolean default false not null,
    pets_allowed text check (pets_allowed in ('yes', 'no', 'not_sure')),
    sqft integer,
    email text,
    area text,
    
    -- Listing specific columns
    is_listing boolean default false not null,
    looking_for_flatmate boolean default false not null,
    available_from text, -- 'asap', 'next_month', 'flexible'
    flatmate_gender text check (flatmate_gender in ('male', 'female', 'any')),
    flatmate_smoke text check (flatmate_smoke in ('yes', 'no', 'any')),
    flatmate_food text check (flatmate_food in ('veg', 'nonveg', 'any')),
    contact_email text,
    contact_phone text,
    
    -- Moderation & Access controls
    is_flagged boolean default false not null,
    is_suspicious boolean default false not null,
    device_id uuid not null,
    ip_hash text not null
);

-- 4. Create RATINGS Table
create table ratings (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now() not null,
    pin_id uuid references pins(id) on delete cascade not null,
    locality_rating integer not null check (locality_rating >= 1 and locality_rating <= 5),
    quality_rating integer not null check (quality_rating >= 1 and quality_rating <= 5),
    ip_hash text not null,
    unique (pin_id, ip_hash)
);

-- 5. Create COMMENTS Table
create table comments (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now() not null,
    pin_id uuid references pins(id) on delete cascade not null,
    content text not null check (char_length(content) > 0 and char_length(content) <= 500),
    ip_hash text not null
);

-- 6. Create REPORTS Table
create table reports (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now() not null,
    pin_id uuid references pins(id) on delete cascade not null,
    ip_hash text not null,
    unique (pin_id, ip_hash)
);

-- 7. Create SEEKER_PINS Table
create table seeker_pins (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now() not null,
    latitude double precision not null,
    longitude double precision not null,
    location geography(Point, 4326),
    max_budget numeric not null check (max_budget > 0),
    min_bhk integer not null check (min_bhk >= 1 and min_bhk <= 4),
    looking_for text not null check (looking_for in ('whole_flat', 'room')),
    email text not null,
    phone text not null,
    move_in_timeline text not null check (move_in_timeline in ('asap', 'next_month', 'flexible')),
    
    -- Room specific filters
    seeker_gender text check (seeker_gender in ('male', 'female', 'other')),
    flatmate_gender text check (flatmate_gender in ('male', 'female', 'any')),
    flatmate_smoke text check (flatmate_smoke in ('yes', 'no', 'any')),
    flatmate_food text check (flatmate_food in ('veg', 'nonveg', 'any')),
    note text,

    is_active boolean default true not null,
    expires_at timestamptz default (now() + interval '30 days') not null,
    ip_hash text not null
);

-- 8. Create MESSAGE_BOARD Table
create table message_board (
    id uuid primary key default gen_random_uuid(),
    message text not null,
    is_active boolean default true not null,
    updated_at timestamptz default now() not null
);

-- 9. Create IP_NUDGES Table
create table ip_nudges (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz default now() not null,
    pin_id uuid references pins(id) on delete cascade,
    message text not null,
    shown boolean default false not null,
    ip_hash text not null
);

-- 9b. Create DAILY_MATCHES Table
create table daily_matches (
    seeker_id uuid references seeker_pins(id) on delete cascade,
    listing_id uuid references pins(id) on delete cascade,
    notified boolean default false not null,
    created_at timestamptz default now() not null,
    primary key (seeker_id, listing_id)
);

-- 10. Enable Row Level Security (RLS)
alter table pins enable row level security;
alter table ratings enable row level security;
alter table comments enable row level security;
alter table reports enable row level security;
alter table seeker_pins enable row level security;
alter table message_board enable row level security;
alter table ip_nudges enable row level security;
alter table daily_matches enable row level security;

-- 11. Create Geography Column Auto-Population Trigger
create or replace function update_geography_location()
returns trigger language plpgsql as $$
begin
    new.location := ST_SetSRID(ST_MakePoint(new.longitude, new.latitude), 4326)::geography;
    return new;
end;
$$;

create trigger trigger_pins_geography
before insert or update on pins
for each row execute function update_geography_location();

create trigger trigger_seeker_pins_geography
before insert or update on seeker_pins
for each row execute function update_geography_location();

-- 12. Create Spatial & Search Indexes
create index pins_geo_idx on pins using gist (location);
create index seeker_pins_geo_idx on seeker_pins using gist (location);
create index pins_is_flagged_idx on pins (is_flagged, is_listing);
create index pins_ip_hash_idx on pins (ip_hash);
create index seeker_pins_active_idx on seeker_pins (is_active, expires_at);

-- 13. Create RLS Policies
create policy "Allow public select on pins" on pins
    for select using (is_flagged = false);

create policy "Allow public insert on pins" on pins
    for insert with check (true);

create policy "Allow public updates on pins" on pins
    for update using (true) with check (true);

create policy "Allow public select on ratings" on ratings
    for select using (true);

create policy "Allow public insert on ratings" on ratings
    for insert with check (true);

create policy "Allow public select on comments" on comments
    for select using (true);

create policy "Allow public insert on comments" on comments
    for insert with check (true);

create policy "Allow public select on reports" on reports
    for select using (true);

create policy "Allow public insert on reports" on reports
    for insert with check (true);

create policy "Allow public select on seeker_pins" on seeker_pins
    for select using (is_active = true and expires_at > now());

create policy "Allow public insert on seeker_pins" on seeker_pins
    for insert with check (true);

create policy "Allow public delete on seeker_pins" on seeker_pins
    for delete using (true);

create policy "Allow public select on message_board" on message_board
    for select using (is_active = true);

create policy "Allow public select on ip_nudges" on ip_nudges
    for select using (shown = false);

create policy "Allow public update on ip_nudges" on ip_nudges
    for update using (true) with check (true);

-- 14. Create Public Views
create or replace view pins_public as
select
    id,
    created_at,
    latitude,
    longitude,
    bhk,
    rent,
    deposit,
    furnishing,
    gated,
    occupant_type,
    society,
    feedback,
    parking_count,
    maintenance_included,
    pets_allowed,
    sqft,
    email,
    area,
    is_listing,
    looking_for_flatmate,
    available_from,
    flatmate_gender,
    flatmate_smoke,
    flatmate_food,
    is_suspicious,
    device_id
from pins
where is_flagged = false;

create or replace view seeker_pins_public as
select
    id,
    created_at,
    latitude,
    longitude,
    max_budget,
    min_bhk,
    looking_for,
    move_in_timeline,
    seeker_gender,
    flatmate_gender,
    flatmate_smoke,
    flatmate_food,
    note
from seeker_pins
where is_active = true and expires_at > now();

-- 15. Dynamic Averages Views
create or replace view neighbourhood_stats as
with points_grouped as (
    select
        p.id,
        p.bhk,
        p.rent,
        p.gated,
        p.society,
        p.is_flagged,
        p.area
    from pins p
    where p.is_flagged = false
)
select
    area,
    bhk,
    count(*) as total_pins,
    round(avg(rent), 0) as avg_rent,
    percentile_cont(0.5) within group (order by rent) as median_rent,
    min(rent) as min_rent,
    max(rent) as max_rent
from points_grouped
where area is not null
group by area, bhk;

-- 16. Secure Stored Procedures for Client-Side RPC calls
create or replace function create_pin(
    p_lat double precision,
    p_lng double precision,
    p_bhk integer,
    p_rent numeric,
    p_deposit numeric,
    p_furnishing text,
    p_gated boolean,
    p_occupant_type text,
    p_society text,
    p_feedback text,
    
    -- New Form Parity Parameters
    p_maintenance_included boolean default false,
    p_pets_allowed text default null,
    p_sqft integer default null,
    p_email text default null,
    p_parking_count integer default 0,
    p_area text default null,
    
    p_device_id uuid default null,
    p_ip_hash text default ''
) returns jsonb language plpgsql security definer as $$
declare
    rounded_lat double precision;
    rounded_lng double precision;
    calculated_area text;
    new_id uuid;
begin
    -- Coordinate rounding to ~100m grid for privacy
    rounded_lat := round(p_lat::numeric, 3)::double precision;
    rounded_lng := round(p_lng::numeric, 3)::double precision;

    -- Calculate the closest known Chennai neighbourhood if not explicitly provided
    if p_area is null or p_area = '' then
        with distances as (
            select 'OMR' as area_name, st_distance(st_setsrid(st_makepoint(p_lng, p_lat), 4326)::geography, st_setsrid(st_makepoint(80.2312, 12.9229), 4326)::geography) as dist
            union all
            select 'Anna Nagar', st_distance(st_setsrid(st_makepoint(p_lng, p_lat), 4326)::geography, st_setsrid(st_makepoint(80.2101, 13.0850), 4326)::geography)
            union all
            select 'Velachery', st_distance(st_setsrid(st_makepoint(p_lng, p_lat), 4326)::geography, st_setsrid(st_makepoint(80.2201, 12.9796), 4326)::geography)
            union all
            select 'T. Nagar', st_distance(st_setsrid(st_makepoint(p_lng, p_lat), 4326)::geography, st_setsrid(st_makepoint(80.2341, 13.0418), 4326)::geography)
            union all
            select 'Adyar', st_distance(st_setsrid(st_makepoint(p_lng, p_lat), 4326)::geography, st_setsrid(st_makepoint(80.2565, 13.0012), 4326)::geography)
        )
        select area_name into calculated_area from distances order by dist limit 1;
    else
        calculated_area := p_area;
    end if;

    insert into pins (
        latitude, longitude, bhk, rent, deposit, furnishing, gated, occupant_type, society, feedback,
        maintenance_included, pets_allowed, sqft, email, parking_count, area, device_id, ip_hash
    ) values (
        rounded_lat, rounded_lng, p_bhk, p_rent, p_deposit, p_furnishing, p_gated, p_occupant_type, p_society, p_feedback,
        p_maintenance_included, p_pets_allowed, p_sqft, p_email, coalesce(p_parking_count, 0), calculated_area, p_device_id, p_ip_hash
    ) returning id into new_id;

    return jsonb_build_object('success', true, 'id', new_id);
end;
$$;

-- create_seeker_pin rpc
create or replace function create_seeker_pin(
    p_lat double precision,
    p_lng double precision,
    p_budget numeric,
    p_min_bhk integer,
    p_looking_for text,
    p_email text,
    p_phone text,
    p_move_in text,
    p_seeker_gender text,
    p_flatmate_gender text,
    p_flatmate_smoke text,
    p_flatmate_food text,
    p_note text,
    p_ip_hash text
) returns jsonb language plpgsql security definer as $$
declare
    new_id uuid;
begin
    insert into seeker_pins (
        latitude, longitude, max_budget, min_bhk, looking_for, email, phone, move_in_timeline, seeker_gender, flatmate_gender, flatmate_smoke, flatmate_food, note, ip_hash
    ) values (
        p_lat, p_lng, p_budget, p_min_bhk, p_looking_for, p_email, p_phone, p_move_in, p_seeker_gender, p_flatmate_gender, p_flatmate_smoke, p_flatmate_food, p_note, p_ip_hash
    ) returning id into new_id;

    return jsonb_build_object('success', true, 'id', new_id);
end;
$$;

-- submit_rating rpc
create or replace function submit_rating(
    p_pin_id uuid,
    p_locality_rating integer,
    p_quality_rating integer,
    p_ip_hash text
) returns jsonb language plpgsql security definer as $$
begin
    insert into ratings (pin_id, locality_rating, quality_rating, ip_hash)
    values (p_pin_id, p_locality_rating, p_quality_rating, p_ip_hash)
    on conflict (pin_id, ip_hash) do update set
        locality_rating = excluded.locality_rating,
        quality_rating = excluded.quality_rating;
    return jsonb_build_object('success', true);
end;
$$;

-- handle_report rpc
create or replace function handle_report(
    p_pin_id uuid,
    p_ip_hash text
) returns jsonb language plpgsql security definer as $$
declare
    rep_count integer;
begin
    insert into reports (pin_id, ip_hash)
    values (p_pin_id, p_ip_hash)
    on conflict do nothing;

    select count(*) into rep_count from reports where pin_id = p_pin_id;

    if rep_count >= 3 then
        update pins set is_flagged = true where id = p_pin_id;
    end if;

    return jsonb_build_object('success', true, 'reports_count', rep_count);
end;
$$;

-- delete_pin rpc
create or replace function delete_pin(
    p_pin_id uuid,
    p_device_id uuid
) returns jsonb language plpgsql security definer as $$
declare
    deleted boolean := false;
begin
    delete from pins where id = p_pin_id and device_id = p_device_id;
    if found then
        deleted := true;
    end if;
    return jsonb_build_object('success', deleted);
end;
$$;

-- mark_pin_as_listing rpc (turns any pin into a direct owner flat listing)
create or replace function mark_pin_as_listing(
    p_pin_id uuid,
    p_available_from text,
    p_parking_count integer,
    p_looking_for_flatmate boolean,
    -- Room lister specs
    p_rent numeric,
    p_flatmate_gender text,
    p_flatmate_smoke text,
    p_flatmate_food text
) returns jsonb language plpgsql security definer as $$
begin
    update pins set
        is_listing = true,
        available_from = p_available_from,
        parking_count = p_parking_count,
        looking_for_flatmate = p_looking_for_flatmate,
        rent = coalesce(p_rent, rent),
        flatmate_gender = p_flatmate_gender,
        flatmate_smoke = p_flatmate_smoke,
        flatmate_food = p_flatmate_food
    where id = p_pin_id;
    
    return jsonb_build_object('success', true);
end;
$$;

-- set_pin_owner_contact rpc
create or replace function set_pin_owner_contact(
    p_pin_id uuid,
    p_email text,
    p_phone text
) returns jsonb language plpgsql security definer as $$
begin
    update pins set
        contact_email = p_email,
        contact_phone = p_phone
    where id = p_pin_id;
    
    return jsonb_build_object('success', true);
end;
$$;

-- check_pin_limit rpc
create or replace function check_pin_limit(p_ip_hash text)
returns boolean language plpgsql security definer as $$
declare
    cnt integer;
begin
    select count(*) into cnt from pins where ip_hash = p_ip_hash and created_at > now() - interval '24 hours';
    return cnt >= 3;
end;
$$;

-- check_seeker_limit rpc
create or replace function check_seeker_limit(p_ip_hash text)
returns boolean language plpgsql security definer as $$
declare
    cnt integer;
begin
    select count(*) into cnt from seeker_pins where ip_hash = p_ip_hash and created_at > now() - interval '24 hours';
    return cnt >= 3;
end;
$$;

-- check_existing_seeker_pins rpc
create or replace function check_existing_seeker_pins(p_email text, p_phone text)
returns integer language plpgsql security definer as $$
declare
    cnt integer;
begin
    select count(*) into cnt from seeker_pins where (email = p_email or phone = p_phone) and is_active = true;
    return cnt;
end;
$$;

-- archive_seeker_pins rpc
create or replace function archive_seeker_pins(p_email text, p_phone text)
returns jsonb language plpgsql security definer as $$
begin
    update seeker_pins set is_active = false where (email = p_email or phone = p_phone);
    return jsonb_build_object('success', true);
end;
$$;

-- get_my_data rpc
create or replace function get_my_data(p_device_id uuid, p_ip_hash text)
returns jsonb language plpgsql security definer as $$
declare
    my_pin_ids uuid[];
    my_seeker_ids uuid[];
    my_reported_pins uuid[];
    my_ratings jsonb;
begin
    select array_agg(id) into my_pin_ids from pins where device_id = p_device_id or ip_hash = p_ip_hash;
    select array_agg(id) into my_seeker_ids from seeker_pins where ip_hash = p_ip_hash;
    select array_agg(pin_id) into my_reported_pins from reports where ip_hash = p_ip_hash;
    
    select json_agg(json_build_object('pin_id', pin_id, 'locality_rating', locality_rating, 'quality_rating', quality_rating))
    into my_ratings
    from ratings
    where ip_hash = p_ip_hash;
    
    return jsonb_build_object(
        'my_pin_ids', coalesce(my_pin_ids, '{}'::uuid[]),
        'my_seeker_ids', coalesce(my_seeker_ids, '{}'::uuid[]),
        'my_reported_pins', coalesce(my_reported_pins, '{}'::uuid[]),
        'my_ratings', coalesce(my_ratings, '[]'::jsonb)
    );
end;
$$;

-- 17. Daily Matches Finder RPC
create or replace function find_daily_matches()
returns table (
    seeker_id uuid,
    listing_id uuid,
    seeker_email text,
    seeker_phone text,
    seeker_min_bhk integer,
    seeker_max_budget numeric,
    seeker_timeline text,
    listing_email text,
    listing_phone text,
    listing_bhk integer,
    listing_rent numeric,
    listing_deposit numeric,
    listing_furnishing text,
    area text
) language plpgsql security definer as $$
begin
    return query
    select
        s.id as seeker_id,
        p.id as listing_id,
        s.email as seeker_email,
        s.phone as seeker_phone,
        s.min_bhk as seeker_min_bhk,
        s.max_budget as seeker_max_budget,
        s.move_in_timeline as seeker_timeline,
        coalesce(p.contact_email, p.email) as listing_email,
        p.contact_phone as listing_phone,
        p.bhk as listing_bhk,
        p.rent as listing_rent,
        p.deposit as listing_deposit,
        p.furnishing as listing_furnishing,
        p.area as area
    from seeker_pins s
    cross join pins p
    where s.is_active = true
      and s.expires_at > now()
      and p.is_listing = true
      and p.is_flagged = false
      and (p.contact_email is not null or p.email is not null)
      and st_distance(p.location, s.location) <= 2500
      and p.rent <= s.max_budget
      and p.rent >= s.max_budget * 0.8
      and p.bhk >= s.min_bhk
      and not exists (
          select 1 
          from daily_matches dm 
          where dm.seeker_id = s.id 
            and dm.listing_id = p.id
      );
end;
$$;

