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

async function testWrite() {
  console.log('Trying to insert a test record into "partner_sito" to verify permission structure...');
  const testSlug = 'temp-test-slug-delete-me';
  
  // Try to insert
  const { data, error } = await supabase
    .from('partner_sito')
    .upsert({
      slug: testSlug,
      nome: 'Test Temp',
      zona: 'Test',
      prodotto: 'Test',
      storia_paragrafi: ['Test story'],
      dettagli: {}
    })
    .select();

  if (error) {
    console.error('Insert/Upsert failed:', error.message);
  } else {
    console.log('Insert/Upsert succeeded! Record:', data);
    
    // Now delete it
    const { error: delError } = await supabase
      .from('partner_sito')
      .delete()
      .eq('slug', testSlug);
      
    if (delError) {
      console.error('Cleanup delete failed:', delError.message);
    } else {
      console.log('Cleanup delete succeeded!');
    }
  }
}

testWrite().catch(console.error);
