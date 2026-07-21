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
    id: 'serata-vigna-piscina',
    slug: 'serata-in-vigna-piscina',
    titolo: 'Mini-Sagra in Vigna & Piscina',
    sotto_occhiello: 'Resoconto Evento & Case Study Sold Out',
    data: '17 Luglio 2026',
    ora: '19:00',
    luogo: 'Montefalcione (AV)',
    indirizzo: 'Agriturismo Macchia dei Briganti, Contrada Fortuna 13',
    descrizione: 'Un successo da 65 ospiti (SOLD OUT). Una serata tra i vigneti e il bordo piscina di Macchia dei Briganti con eccellenze Difetti, musica dal vivo di Giuliano De Matteis e banchetto IncisioniLive.',
    descrizione_estesa: `Venerdì 17 Luglio 2026, l'Agriturismo Macchia dei Briganti a Montefalcione (AV) ha ospitato l'edizione serale della "Mini-Sagra in Vigna & Piscina" firmata Difetti Eccellenze Campane.

L'evento ha registrato un entusiastico SOLD OUT con 65 partecipanti a pochi giorni dal lancio della comunicazione broadcast.

Immersi nel suggestivo scenario tra i filari della vigna e l'atmosfera a bordo piscina illuminata al tramonto, gli ospiti hanno degustato un menù speciale ideato per esaltare le materie prime del territorio in abbinamento ai vini d'eccellenza.

La serata è stata animata dalla musica dal vivo del cantautore Giuliano De Matteis, con un repertorio festoso e conviviale, e arricchita dalla presenza dello stand di IncisioniLive (LC3D Lab), che ha realizzato sul momento incisioni al laser personalizzate su portachiavi e accessori per i partecipanti.

In sole quattro ore, la sinergia tra prodotti d'eccellenza, grande musica e accoglienza calorosa ha generato un consumo reale e tangibile:
- 63 Tegamini di pane con fagioli, cotechino e coteca
- 60+ Bruschette croccanti con Caciocavallo fuso
- 46 Pinse Romane con pomodorini freschi e bocconcini
- 43 Porzioni di trofie artigianali con zucchine e speck
- 4,3 kg di Pomodorini cotti al sole firmati Difetti
- 60 Bottiglie di vino locale servite in degustazione (Fiano & Aglianico)
- 7 Bottiglie di Limoncello artigianale (oltre 5 Litri serviti)

Un caso studio concreto di come il "KM Vero" e la riprova sociale possano creare valore per i locali partner, attrarre pubblico entusiasta e trasformare il cibo in un'esperienza collettiva indimenticabile.`,
    immagine_copertina: '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.13.22 (2).jpeg',
    galleria_immagini: [
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.13.22 (2).jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.13.05.jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.13.25 (1).jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.13.26 (3).jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.13.40 (2).jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.13.47 (1).jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 02.12.56 (1).jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-18 at 12.05.31.jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-17 at 18.35.16 (1).jpeg',
      '/images/eventi/serata-in-vigna-piscina/WhatsApp Image 2026-07-19 at 19.59.22 (1).jpeg'
    ],
    stats: [
      { val: '65', lbl: 'Ospiti (SOLD OUT)' },
      { val: '63', lbl: 'Tegamini di Pane' },
      { val: '60+', lbl: 'Bruschette Caciocavallo' },
      { val: '46', lbl: 'Pinse Romane' },
      { val: '43', lbl: 'Trofie Zucchine/Speck' },
      { val: '60', lbl: 'Bottiglie di Vino' },
      { val: '7 (5L)', lbl: 'Bottiglie Limoncello' },
      { val: '4,3 kg', lbl: 'Pomodorini Cotti a Sole' }
    ],
    video_url: '/videos/recap_mini_sagra_17_luglio.mp4',
    promozione_titolo: 'Vuoi ospitare questo format nel tuo locale?',
    promozione_desc: 'Porta le degustazioni esperienziali Difetti nella tua struttura. Organizziamo serate a tema complete di materie prime, branding e supporto marketing.',
    promozione_link: '',
    stato: 'passato',
    whatsapp_custom_text: 'Ciao Antonio, ho letto il resoconto della Mini-Sagra in Vigna del 17 Luglio. Vorrei organizzare un evento simile o una degustazione nel mio locale.'
  },
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
    descrizione_estesa: 'Domenica 14 Giugno 2026, l\'Agriturismo Macchia dei Briganti a Montefalcione (AV) ha aperto le sue porte per ospitare il nostro format "Aperitivo in Vigna". L\'evento è iniziato al mattino, alle ore 10:00, accogliendo non solo ristoratori e addetti ai lavori curiosi di vedere il format all\'opera, ma anche tante persone comuni, famiglie e appassionati che volevano semplicemente godersi una giornata speciale all\'aperto, immersi nella bellezza dei vigneti irpini.\n\nIl cuore dell\'evento è stato il connubio perfetto tra cibo e vino locale: abbiamo farcito focacce calde e fragranti sul momento utilizzando le nostre materie prime e conserve artigianali Difetti (come i pomodorini cotti a sole e le alici premium), mentre l\'Agriturismo Macchia dei Briganti – che è anche una cantina vitivinicola d\'eccellenza – ha servito in degustazione il proprio Fiano Irpino IGT fresco, raccontandone la storia e il legame profondo con questa terra.\n\nDurante la giornata, circa 30 partecipanti si sono ritrovati a condividere storie e sapori in un\'atmosfera incredibilmente conviviale, allegra e rilassata. Questa sinergia ha generato un consumo reale e un indotto tangibile sul posto per la struttura ospitante. In poche ore sono stati serviti e apprezzati:\n- 2 kg di alici di Cetara premium firmate Difetti\n- 4 kg di pomodorini e conserve artigianali Difetti\n- 30 bottiglie di Fiano Irpino IGT della cantina Macchia dei Briganti\n\nQuesta giornata ha dimostrato concretamente come l\'autenticità del KM Vero, la qualità delle materie prime e la calda ospitalità di una cantina di territorio possano trasformare una semplice degustazione domenicale in un momento di festa indimenticabile, capace di attrarre pubblico e generare valore.',
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
    promozione_titolo: 'Il lancio di Gin Sintony',
    promozione_desc: 'Per festeggiare questa giornata di incontro all\'Agriturismo Macchia dei Briganti, abbiamo proposto ai partecipanti una speciale opportunità di lancio per scoprire in anteprima il nostro Gin Sintony: una bottiglia da 70cl presentata con uno sconto del 20% sul prezzo di listino per portare a casa un pezzo di questa giornata.',
    promozione_link: '',
    stato: 'passato',
    whatsapp_custom_text: 'Ciao Antonio, sono un ristoratore. Vorrei sapere come funziona l\'organizzazione degli eventi Difetti e ricevere informazioni sul listino prodotti B2B.'
  }
];

export default async function EventiPage() {
  let eventi: any[] = [];
  
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('eventi_sito')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        const dbSlugs = new Set(data.map((e: any) => e.slug));
        const fallbacksMissingInDb = FALLBACK_EVENTI.filter(e => !dbSlugs.has(e.slug));
        eventi = [...data, ...fallbacksMissingInDb];
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
