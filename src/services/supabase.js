import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://axxaqbfcsullpkcfvlxa.supabase.co';

const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4eGFxYmZjc3VsbHBrY2Z2bHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwODU1NjMsImV4cCI6MjA1NTY2MTU2M30.L6I4RuxrTpewCRaZnsHXKUY1aPZjOFV5AIpk9-UQwtk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
