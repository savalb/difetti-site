import type { Metadata } from 'next';
import { BRAND } from '@/lib/constants';
import { ServiziClient } from './ServiziClient';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Servizi HoReCa — Fornitura e Consulenza Menù Avellino | Difetti',
  description: 'Consulenza strategica per ristoranti HoReCa ad Avellino e in Campania: analisi del menù, fornitura di eccellenze gastronomiche artigianali campane. Cofanetti regalo aziendali.',
  keywords: ['consulenza menu ristorante Avellino', 'fornitura ristoranti Campania', 'eccellenze gastronomiche HoReCa', 'regali aziendali gastronomici Irpinia'],
};

const SERVIZI = [
  {
    id: 'consulenza-menu',
    tag: 'PER RISTORATORI',
    titolo: 'Consulenza Menù',
    sottotitolo: 'Non vendiamo prodotti. Costruiamo menù.',
    paragrafi: [
      'Antonio analizza il tuo menù piatto per piatto. Identifica dove la materia prima può fare la differenza — dove un prodotto artigianale campano può trasformare un piatto buono in un piatto memorabile.',
      'Non si tratta di sostituire i fornitori. Si tratta di introdurre nel tuo ristorante quelle eccellenze territoriali che il tuo cliente non trova da nessun\'altra parte. Una nocciola Irpinia DOP in un dessert. Una passata arancione in una bruschetta. Un\'alicetta di Cetara nel sugo.',
      'L\'analisi è gratuita. Il valore lo vedi sui piatti.',
    ],
    steps: [
      { n: '01', t: 'Ascolto', d: 'Ci racconti la tua cucina, il tuo target, la tua identità.' },
      { n: '02', t: 'Analisi', d: 'Studiamo il menù e identifichiamo le opportunità.' },
      { n: '03', t: 'Degustazione', d: 'Portiamo i prodotti. Li assaggi tu in cucina.' },
      { n: '04', t: 'Partnership', d: 'Se funziona, parte la fornitura. Senza vincoli.' },
    ],
    cta: 'Richiedi l\'analisi del tuo menù',
    ctaId: 'servizi-wa-consulenza',
  },
  {
    id: 'regali-aziendali',
    tag: 'PER AZIENDE',
    titolo: 'Regali Aziendali Corporate',
    sottotitolo: 'Cofanetti che raccontano un territorio.',
    paragrafi: [
      'Dimentica i cesti natalizi anonimi. Ogni cofanetto Difetti è una selezione curata di eccellenze campane, confezionata a mano con materiali naturali e accompagnata dalla storia di ogni produttore.',
      'Personalizzazione completa: dal packaging al biglietto, dalla selezione di prodotti al budget. Antonio compone ogni cofanetto come un menù — con equilibrio, gusto e sorpresa.',
      'Per aziende, studi professionali, eventi privati e occasioni speciali.',
    ],
    steps: [
      { n: '01', t: 'Brief', d: 'Ci dici budget, quantità e occasione.' },
      { n: '02', t: 'Proposta', d: 'Creiamo la selezione e ti mandiamo il mockup.' },
      { n: '03', t: 'Produzione', d: 'Confezionamento artigianale, fatto a mano.' },
      { n: '04', t: 'Consegna', d: 'Consegna diretta o spedizione tracciata.' },
    ],
    cta: 'Richiedi un preventivo',
    ctaId: 'servizi-wa-corporate',
  },
];

// Dati Strutturati per i Servizi e FAQ (SEO/GEO)
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      'name': 'Consulenza Menù HoReCa',
      'description': 'Analisi gratuita del menù e selezione mirata di ingredienti artigianali campani per ristoranti ed HoReCa.',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Difetti — Eccellenze Campane'
      },
      'areaServed': 'Campania',
      'serviceType': 'B2B Consulting'
    },
    {
      '@type': 'Service',
      'name': 'Fornitura Alimentare Ristorazione',
      'description': 'Distribuzione e fornitura di pasta artigianale, conserve e prodotti gastronomici KM Vero per la ristorazione.',
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Difetti — Eccellenze Campane'
      },
      'areaServed': 'Campania'
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Quali sono i tempi di consegna per i ristoranti?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Le consegne vengono effettuate direttamente con i nostri mezzi refrigerati in tutta l\'Irpinia e la Campania entro 24/48 ore dalla conferma dell\'ordine.'
          }
        },
        {
          '@type': 'Question',
          'name': 'È previsto un minimo d\'ordine per la fornitura HoReCa?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Non imponiamo minimi d\'ordine rigidi per permettere ai ristoratori di testare i prodotti ed evitare sprechi. Ottimizziamo le consegne per area geografica.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Come funziona l\'analisi gratuita del menù?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Antonio De Matteis effettua un incontro conoscitivo per analizzare l\'attuale menù del ristorante, identificando i piatti dove una materia prima d\'eccellenza campana può elevare il gusto e il margine.'
          }
        }
      ]
    }
  ]
};

export default function ServiziPage() {
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      {/* Hero */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>I servizi</span>
          <h1 className={styles.heroTitle}>Non vendiamo.<br />Consultiamo.</h1>
          <p className={styles.heroSub}>
            Difetti non è un distributore. È un partner strategico per chi vuole differenziarsi
            con la materia prima giusta — quella che ha una storia, un luogo e un sapore inconfondibile.
          </p>
        </div>
      </section>

      {/* Servizi Rendered Client-Side for Event Tracking */}
      <ServiziClient servizi={SERVIZI} />
    </main>
  );
}
