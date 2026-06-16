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
