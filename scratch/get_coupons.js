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

const supabase = createClient(envVars.NEXT_PUBLIC_SUPABASE_URL, envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  console.log('--- FETCHING MARKETING CAMPAIGNS ---');
  const { data: campaigns, error: err1 } = await supabase
    .from('campagne_marketing')
    .select('*');
    
  if (err1) {
    console.error('Error fetching campaigns:', err1.message);
  } else {
    console.log('Campaigns:', JSON.stringify(campaigns, null, 2));
  }

  console.log('--- FETCHING COUPONS ---');
  const { data: coupons, error: err2 } = await supabase
    .from('coupon_richiesti')
    .select('*')
    .limit(5);
    
  if (err2) {
    console.error('Error fetching coupons:', err2.message);
  } else {
    console.log('Coupons:', JSON.stringify(coupons, null, 2));
  }
}

check().catch(console.error);
