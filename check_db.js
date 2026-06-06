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
  console.log('\n--- CONTROLLO CAMPAGNE ---');
  const { data: campaigns } = await supabase.from('campagne_marketing').select('*');
  const activeCamp = campaigns.find(c => c.slug === 'vip' && c.attiva);
  
  if (!activeCamp) {
    console.log('Nessuna campagna VIP attiva!');
    return;
  }

  console.log('\n--- TEST INSERIMENTO CIECO (SENZA SELECT) ---');
  const testCoupon = {
    campagna_id: activeCamp.id,
    nome: 'Test Blind User',
    telefono: '987654321',
    codice_coupon: 'VIP-BLND-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    stato: 'Valido'
  };

  const { error: insertError } = await supabase
    .from('coupon_richiesti')
    .insert(testCoupon);

  if (insertError) {
    console.error('Errore inserimento cieco:', insertError);
  } else {
    console.log('Inserimento cieco riuscito con successo! (Nessun errore RLS)');
    
    // Per pulire il test, usiamo la nostra chiave anonima ma stavolta dobbiamo eliminare.
    // Nota: l'eliminazione richiede RLS che di solito è limitata ad admin, quindi proviamo
    const { error: deleteError } = await supabase
      .from('coupon_richiesti')
      .delete()
      .eq('codice_coupon', testCoupon.codice_coupon);
      
    if (deleteError) {
      console.log('Nota: eliminazione del test non consentita dall\'anon key (corretto secondo RLS admin).');
    } else {
      console.log('Test ripulito dal database.');
    }
  }
}

check().catch(console.error);
