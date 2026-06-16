const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    envVars[key] = val;
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  console.log('Testing "eventi" table...');
  const { data: data1, error: error1 } = await supabase.from('eventi').select('*').limit(1);
  if (error1) {
    console.log('Error querying "eventi":', error1.message);
  } else {
    console.log('Success querying "eventi":', data1);
  }

  console.log('Testing "eventi_sito" table...');
  const { data: data2, error: error2 } = await supabase.from('eventi_sito').select('*').limit(1);
  if (error2) {
    console.log('Error querying "eventi_sito":', error2.message);
  } else {
    console.log('Success querying "eventi_sito":', data2);
  }
}

check().catch(console.error);
