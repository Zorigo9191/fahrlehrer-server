import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY ist nicht in den Umgebungswerten definiert!');
}

if (!supabaseUrl) {
  throw new Error('SUPABASE_KEY ist nicht in den Umgebungswerten definiert!');
}

const supabase = createClient(supabaseUrl, supabaseKey);
