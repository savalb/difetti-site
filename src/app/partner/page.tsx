import type { Metadata } from 'next';
import Link from 'next/link';
import { PARTNER } from '@/lib/data/partner';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'I Partner Difetti — Produttori Artigianali Irpinia e Campania',
  description: 'Gli 8 produttori artigianali partner di Difetti: Noccioro, Poma Moris, Alici Nettuno, Nonno Giuseppe e altri. Ogni partner è stato visitato personalmente da Antonio De Matteis.',
};

export default function PartnerPage() {
  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>La rete Difetti</span>
          <h1 className={styles.heroTitle}>
            Chi c&apos;è<br />dietro Difetti
          </h1>
          <p className={styles.heroSub}>
            Antonio non sceglie i prodotti dai listini. Li sceglie visitando le aziende,
            conoscendo le persone, assaggiando con le mani nella terra.
            <br />Ogni partner qui è una storia verificata di persona.
          </p>
        </div>
      </section>

      {/* Come selezioniamo */}
      <section className={`${styles.processo} section-pad-sm`}>
        <div className="container">
          <div className={styles.processoGrid}>
            {[
              { n: '01', t: 'Visita diretta', d: 'Antonio va da ogni produttore. Vede il campo, il laboratorio, il forno.' },
              { n: '02', t: 'Assaggio critico', d: 'Ogni lotto viene assaggiato prima di entrare in catalogo. Senza eccezioni.' },
              { n: '03', t: 'Tracciabilità', d: 'Sappiamo esattamente dove nasce ogni prodotto. Lo raccont­iamo al cliente.' },
              { n: '04', t: 'Lealtà reciproca', d: 'Il produttore guadagna in modo equo. Il cliente riceve il prodotto reale.' },
            ].map((step) => (
              <div key={step.n} className={styles.processoStep}>
                <span className={styles.stepNum}>{step.n}</span>
                <h3 className={styles.stepTitle}>{step.t}</h3>
                <p className={styles.stepDesc}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner grid */}
      <section className={`grain ${styles.partnerSection} section-pad`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>I nostri produttori</h2>
          <div className={styles.grid}>
            {PARTNER.map((p) => (
              <article key={p.slug} className={styles.card} id={`partner-${p.slug}`}>
                <div className={styles.cardTop}>
                  <span className={styles.zona}>{p.zona}</span>
                  <h3 className={styles.nome}>{p.nome}</h3>
                  <span className={styles.prodottoTag}>{p.prodotto}</span>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.desc}>{p.descrizione}</p>
                  <p className={styles.claim}><em>&ldquo;{p.claim}&rdquo;</em></p>
                </div>
                <div className={styles.cardFoot}>
                  <a
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardCta}
                    aria-label={`Richiedi prodotti ${p.nome}`}
                  >
                    Richiedi campioni →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Diventa partner */}
      <section className={`grain ${styles.diventa}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>Sei un produttore?</span>
          <h2 className={styles.diventaTitle}>
            Produci qualcosa di autentico?
          </h2>
          <p className={styles.diventaSub}>
            Se sei un artigiano campano con un prodotto che vale, Antonio vuole conoscerti.
            La selezione è rigorosa, ma la porta è aperta.
          </p>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            id="partner-proponi-wa"
          >
            Proponiti come partner
          </a>
        </div>
      </section>
    </main>
  );
}
