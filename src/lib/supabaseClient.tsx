import { createClient } from '@supabase/supabase-js';

const supabase_url = import.meta.env.VITE_SUPABASE_URL
const supabase_publ_key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Create a single supabase client for interacting with the database
const supabase = createClient(supabase_url, supabase_publ_key)