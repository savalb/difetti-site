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

const SEED_EVENTI = [
  {
    id: 'aperitivo-vigna',
    slug: 'aperitivo-in-vigna',
    titolo: 'Aperitivo in Vigna',
    sotto_occhiello: 'Eccellenze & Convivialità',
    data: '14 Giugno 2026',
    ora: '18:30',
    luogo: 'Montefalcione (AV)',
    indirizzo: 'Contrada Macchia, Agriturismo Macchia dei Briganti',
    descrizione: 'Un aperitivo B2B esclusivo per il settore HoReCa, tra i vigneti di Fiano dell\'Irpinia. Degustazione di focacce artigianali, conserve ed eccellenze Difetti.',
    descrizione_estesa: 'Il 14 Giugno 2026 si è tenuto il nostro format esclusivo "Aperitivo in Vigna" presso la splendida cornice dell\'Agriturismo Macchia dei Briganti a Montefalcione (AV). Un evento dedicato interamente ai ristoratori, chef, gestori di enoteche e wine bar del territorio campano per toccare con mano (e con il palato) la differenza della selezione Difetti.\n\nDurante la serata abbiamo presentato il nostro corner espositore B2B in legno con codice QR/NFC integrato per facilitare il riordino, mostrando come l\'artigianalità crei valore e attrattiva nei locali.\n\nGli ospiti hanno potuto degustare la focaccia dorata preparata con le nostre conserve di pomodoro a ridotta acidità, abbinata al Fiano locale di Macchia dei Briganti, immersi in un sound design acustico rustico e accogliente.',
    immagine_copertina: '/images/eventi/aperitivo-in-vigna/locandina.png',
    galleria_immagini: [
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.05.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.06_2.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.04.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.05_3.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.06.jpeg'
    ],
    video_url: '/images/eventi/aperitivo-in-vigna/bozza_video_aperitivo.mp4',
    promozione_titolo: 'Espositore in Legno Omaggio',
    promozione_desc: 'Ospitando una degustazione o effettuando un ordine iniziale minimo per la tua enoteca/ristorante, riceverai l\'espositore B2B Difetti in legno massello per valorizzare i prodotti artigianali nel tuo locale.',
    promozione_link: '',
    stato: 'passato',
    whatsapp_custom_text: 'Ciao Antonio, ho visto il video dell\'Aperitivo in Vigna e vorrei maggiori informazioni sulla selezione prodotti B2B.'
  }
];

async function seed() {
  console.log('Seeding Supabase with "Aperitivo in Vigna" event...');
  const { data, error } = await supabase
    .from('eventi_sito')
    .upsert(SEED_EVENTI)
    .select();
  
  if (error) {
    console.error('Error seeding events:', error.message);
  } else {
    console.log('Successfully seeded events! Data:', data);
  }
}

seed().catch(console.error);
