// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://epenhecwshgnvkmdmqrk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZW5oZWN3c2hnbnZrbWRtcXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NjA5NDIsImV4cCI6MjA1NzQzNjk0Mn0.5ToiWdHaa5wtcD8zKbgBkK_1CNyZrDs34MKOI0CGDSU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);