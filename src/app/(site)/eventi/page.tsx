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
    ora: '18:30',
    luogo: 'Montefalcione (AV)',
    indirizzo: 'Contrada Fortuna 13, Montefalcione',
    descrizione: 'Un caso studio pratico di come un locale può generare valore e attrarre clienti con una serata degustazione. Oltre 30 partecipanti e un indotto reale tangibile.',
    descrizione_estesa: 'Domenica 14 Giugno 2026, l\'Agriturismo Macchia dei Briganti a Montefalcione (AV) ha ospitato il nostro format B2B "Aperitivo in Vigna". L\'evento è stato concepito come una vera e propria dimostrazione pratica per ristoratori, enoteche e wine bar campani di come sia possibile creare un indotto concreto e un\'esperienza memorabile per i clienti finali.\n\nAl centro dell\'evento, oltre alla poesia del paesaggio irpino, c\'era il nostro corner shop/espositore in legno massello dotato di tag QR/NFC. Questo sistema, che permette il riordino istantaneo dei prodotti, ha dimostrato come l\'integrazione tra artigianalità e tecnologia possa stimolare l\'interesse all\'acquisto direttamente in sala.\n\nDurante le poche ore dell\'evento, circa 30 professionisti del settore HoReCa hanno testato l\'indotto reale della degustazione. Sono stati serviti e consumati sul posto:\n- 2 kg di alici di Cetara premium\n- 4 kg di pomodorini cotti a sole e conserve artigianali Difetti\n- 30 bottiglie di Fiano Irpino IGT della cantina ospitante\n\nQuesto dimostra il potere di attrazione di una proposta gastronomica basata sulla trasparenza del KM Vero e sul racconto delle unicità dei produttori.',
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
    promozione_titolo: 'Sconto 20% su Gin Sintony',
    promozione_desc: 'Sei un ristoratore o hai partecipato all\'evento? Richiedi subito il tuo coupon VIP personale e acquista una bottiglia di Gin Sintony da 70cl a soli €48 anziché €60.',
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
