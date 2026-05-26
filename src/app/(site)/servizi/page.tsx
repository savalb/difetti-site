import type { Metadata } from 'next';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Servizi — Consulenza Menù e Regali Aziendali | Difetti',
  description: 'Consulenza strategica per ristoranti HoReCa: analisi del menù, selezione prodotti artigianali campani. Cofanetti regalo aziendali personalizzati con eccellenze irpine.',
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

export default function ServiziPage() {
  return (
    <main className={styles.main}>
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

      {/* Servizi */}
      {SERVIZI.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`grain ${styles.servizio} ${i % 2 !== 0 ? styles.dark : ''}`}
        >
          <div className="container">
            <div className={styles.servizioHeader}>
              <span className="section-tag">{s.tag}</span>
              <h2 className={styles.servizioTitle}>{s.titolo}</h2>
              <p className={styles.servizioClaim}><em>{s.sottotitolo}</em></p>
            </div>

            <div className={styles.servizioCols}>
              <div className={styles.servizioText}>
                {s.paragrafi.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>

              <div className={styles.servizioSteps}>
                {s.steps.map((step) => (
                  <div key={step.n} className={styles.step}>
                    <span className={styles.stepN}>{step.n}</span>
                    <div>
                      <h4 className={styles.stepT}>{step.t}</h4>
                      <p className={styles.stepD}>{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.servizioCta}>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i % 2 !== 0 ? 'btn-whatsapp' : 'btn-primary'}`}
                id={s.ctaId}
              >
                {s.cta}
              </a>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
