import type { Metadata } from 'next';
import { EventiClient } from '@/components/eventi/EventiClient';
import { supabase } from '@/lib/supabaseClient';

export const metadata: Metadata = {
  title: 'Eventi — Degustazioni e Fiere | Difetti Eccellenze Campane',
  description: 'Calendario eventi Difetti: degustazioni B2B, fiere gastronomiche, incontri con produttori. Scopri i prossimi appuntamenti con Antonio De Matteis in Irpinia e Campania.',
};

export const revalidate = 10; // Ricarica ogni 10 secondi per aggiornamenti rapidi

export const FALLBACK_EVENTI = [
  {
    id: 'aperitivo-vigna',
    slug: 'aperitivo-in-vigna',
    titolo: 'Aperitivo in Vigna',
    sotto_occhiello: 'Eccellenze & Convivialità',
    data: '14 Giugno 2026',
    ora: '10:00',
    luogo: 'Montefalcione (AV)',
    indirizzo: 'Contrada Fortuna 13, Montefalcione',
    descrizione: 'Un caso studio pratico di come un locale può generare valore e attrarre clienti con una serata degustazione. Oltre 30 partecipanti e un indotto reale tangibile.',
    descrizione_estesa: 'Domenica 14 Giugno 2026, l\'Agriturismo Macchia dei Briganti a Montefalcione (AV) ha ospitato il nostro format "Aperitivo in Vigna". L\'evento, iniziato alle ore 10:00, è stato concepito come una vera e propria dimostrazione pratica per ristoratori e gestori di locali campani, ma aperto anche a persone comuni e appassionati venuti per godersi una degustazione di qualità in un\'atmosfera conviviale e rilassata.\n\nAl centro dell\'evento c\'erano le nostre materie prime e i prodotti artigianali Difetti, protagonisti assoluti come ingredienti chiave per la farcitura delle focacce calde servite sul momento. Ad accompagnare il cibo, gli ospiti hanno potuto degustare una selezione dei pregiati vini prodotti direttamente dalla cantina dell\'agriturismo che ospitava la giornata, creando un connubio perfetto tra territorio, autenticità e gusto.\n\nDurante le ore dell\'evento, circa 30 partecipanti tra professionisti HoReCa e clienti finali hanno testato con mano l\'indotto reale che un simile format può generare per una struttura. Sono stati consumati sul posto:\n- 2 kg di alici di Cetara premium\n- 4 kg di pomodorini cotti a sole e conserve artigianali Difetti\n- 30 bottiglie di Fiano Irpino IGT prodotte dalla cantina ospitante\n\nQuesto dimostra il potere di attrazione di un evento basato sulla trasparenza del KM Vero, sulla qualità degli ingredienti e sulla bellezza dell\'esperienza condivisa.',
    immagine_copertina: '/images/eventi/aperitivo-in-vigna/ai_mockup_vigna_irpinia.png',
    galleria_immagini: [
      '/images/eventi/aperitivo-in-vigna/ai_mockup_vigna_irpinia.png',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.05.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.06_2.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.04.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.05_3.jpeg',
      '/images/eventi/aperitivo-in-vigna/whatsapp_image_2026-06-14_at_22.16.06.jpeg',
      '/images/eventi/aperitivo-in-vigna/bozza_video_aperitivo.mp4'
    ],
    video_url: '',
    promozione_titolo: 'Lancio Gin Sintony',
    promozione_desc: 'In occasione dell\'evento Aperitivo in Vigna, Difetti ha proposto ai partecipanti una promozione esclusiva di lancio, offrendo la possibilità di acquistare in anteprima una bottiglia di Gin Sintony da 70cl con il 20% di sconto riservato.',
    promozione_link: '/vip',
    stato: 'passato',
    whatsapp_custom_text: 'Ciao Antonio, sono un ristoratore. Vorrei sapere come funziona l\'organizzazione degli eventi Difetti e ricevere informazioni sul listino prodotti B2B.'
  }
];

export default async function EventiPage() {
  let eventi = [];
  
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('eventi_sito')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        eventi = data;
      } else {
        eventi = FALLBACK_EVENTI;
      }
    } else {
      eventi = FALLBACK_EVENTI;
    }
  } catch (e) {
    console.warn('Tabella eventi_sito non trovata in Supabase, caricamento fallback statico:', e);
    eventi = FALLBACK_EVENTI;
  }

  return <EventiClient initialEventi={eventi} />;
}
