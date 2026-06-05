import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

async function testSupabase() {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;
  
  console.log("Checking Supabase Variables...");
  console.log("URL:", NEXT_PUBLIC_SUPABASE_URL);
  console.log("Key starting with:", NEXT_PUBLIC_SUPABASE_ANON_KEY ? NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 15) : 'MISSING');

  if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error("Missing credentials in .env!");
    return;
  }

  const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

  console.log("Attempting to insert a test row...");
  const { data, error } = await supabase
    .from('inquiries')
    .insert([
      {
        type: 'quote',
        company_name: 'Test Co',
        customer_name: 'John Doe',
        email: 'test@example.com',
        country: 'USA',
        product_name: 'Test Product',
        quantity: '10 MT',
        message: 'This is a test from Node'
      }
    ]);

  if (error) {
    console.error("Supabase insert error:", error);
  } else {
    console.log("Successfully saved test inquiry to Supabase!");
  }
}

testSupabase();
