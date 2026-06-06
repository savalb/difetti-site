const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
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
  console.log('--- TEST QUERY ESATTA ADMIN ---');
  const { data, error } = await supabase
    .from('coupon_richiesti')
    .select(`
      *,
      campagne_marketing (
        titolo,
        prodotto_nome
      )
    `)
    .order('creato_il', { ascending: false });
    
  if (error) {
    console.error('Errore query admin:', error);
  } else {
    console.log('Risultati query admin:', JSON.stringify(data, null, 2));
  }
}

check().catch(console.error);
