import { createClient } from '@supabase/supabase-js';

/**
 * Chennai Rents - Brand Constants & Links
 */
export const INSTAGRAM_URL = 'https://www.instagram.com/chennai_rents?stkn=MXVtb3cwdXhqOXQ1YQ==';
export const INSTAGRAM_HANDLE = '@chennai_rents';
export const SITE_NAME = 'Chennai Rents';
export const SITE_TAGLINE = 'Locality-First Rental Guide';

/**
 * Supabase Database Client & Configuration
 * Connected to project: hnnkhmfrpwdrkkjbgckv
 */
export const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL)
  || 'https://hnnkhmfrpwdrkkjbgckv.supabase.co';

export const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY)
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubmtobWZycHdkcmtramJnY2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4NDk1ODgsImV4cCI6MjA5NzQyNTU4OH0.oCXDCH1J80HLb8AfQA31Fdqi-vbVN2cMdCTZm-NWngc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export const db = supabase;

export default db;
