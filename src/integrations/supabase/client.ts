// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xaewmqkqrnngobysvldr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXdtcWtxcm5uZ29ieXN2bGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODQyOTgsImV4cCI6MjA1OTM2MDI5OH0.h1t1bmafP4g0nRYjr0NxkXkI0VYQpNAyy2mVtm3OU8w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);