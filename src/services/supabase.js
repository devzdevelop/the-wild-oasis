import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://odzbwstwbxbppnhieyxf.supabase.co';

const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kemJ3c3R3YnhicHBuaGlleXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1NTA1MTgsImV4cCI6MjAzODEyNjUxOH0.j4C9Ad9nu_xveUbwvzJSF-m9HlzcBbPxAayGd9DI-Uw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
