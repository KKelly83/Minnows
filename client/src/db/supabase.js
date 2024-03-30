import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nxnpgtreyigoekhnysca.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54bnBndHJleWlnb2VraG55c2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNjAzNzYsImV4cCI6MjAyNjgzNjM3Nn0.gtGNd7NQzAQfr1jau9r03t8_xqWoEjLKrhbeArMD3PQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);