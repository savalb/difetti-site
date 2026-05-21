import type { Metadata } from 'next';
import { BRAND, PRINCIPI } from '@/lib/constants';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Chi Siamo — Antonio De Matteis, Ricercatore del Gusto | Difetti',
  description: 'La storia di Antonio De Matteis e di Difetti. Eccellenze Campane: chi siamo, cosa crediamo, perché il difetto è una virtù. I 5 principi che guidano ogni scelta.',
};

export default function ChiSiamoPage() {
  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>Chi siamo</span>
            <h1 className={styles.heroTitle}>Il Ricercatore<br />del Gusto</h1>
            <p className={styles.heroClaim}>
              <em>«Non cerco prodotti perfetti. Cerco prodotti veri.»</em>
            </p>
            <p className={styles.heroBody}>
              Antonio De Matteis ha iniziato visitando produttori locali con una domanda semplice:
              perché i sapori che ricordava da bambino non si trovano più nelle cucine dei ristoranti?
              La risposta l&apos;ha trasformata in un lavoro — e poi in una missione.
            </p>
          </div>
          <div className={styles.heroImgWrapper}>
            <Image
              src="/images/brand/antonio-hero.jpg"
              alt="Antonio De Matteis — fondatore Difetti"
              fill
              sizes="(max-width:900px) 100vw, 50vw"
              className={styles.heroImg}
              priority
            />
          </div>
        </div>
      </section>

      {/* La storia */}
      <section className={`${styles.storia} section-pad`}>
        <div className="container">
          <div className={styles.storiaCols}>
            <div className={styles.storiaLeft}>
              <span className="section-tag">La storia</span>
              <h2 className={styles.storiaTitle}>Da dove viene Difetti</h2>
            </div>
            <div className={styles.storiaRight}>
              <p>
                Tutto nasce dall&apos;Irpinia. Una terra aspra, difficile, che non ha mai ceduto alla
                standardizzazione perché non ne aveva bisogno. I grani antichi crescono qui da secoli.
                Le nocciole di Giffoni profumano diversamente da tutte le altre. Il pomodoro matura
                tardi e male — ma saporito come pochi.
              </p>
              <p>
                Antonio ha capito che questi &ldquo;difetti&rdquo; — le asimmetrie, i colori anomali,
                le forme irregolari — erano in realtà i marcatori del prodotto autentico. Il difetto
                non è la mancanza di qualità. <strong>È la prova di essa.</strong>
              </p>
              <p>
                Difetti nasce con lo scopo di fare da ponte tra chi produce con fatica e chi cucina
                con passione. Senza intermediari inutili. Senza compromessi sulla materia prima.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* I 5 Principi */}
      <section className={`grain ${styles.principiSection} section-pad`}>
        <div className="container">
          <div className={styles.principiHeader}>
            <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>Il manifesto</span>
            <h2 className={styles.principiTitle}>5 principi.<br />Nessun compromesso.</h2>
          </div>
          <div className={styles.principiGrid}>
            {PRINCIPI.map((p) => (
              <div key={p.numero} className={styles.principio}>
                <span className={styles.principioNum}>{p.numero}</span>
                <h3 className={styles.principioTitle}>{p.titolo}</h3>
                <p className={styles.principioTesto}>{p.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evento/degustazione */}
      <section className={`${styles.evento} section-pad`}>
        <div className="container">
          <div className={styles.eventoInner}>
            <div className={styles.eventoImgWrapper}>
              <Image
                src="/images/eventi/evento-degustazione.jpg"
                alt="Degustazione Difetti con Antonio De Matteis"
                fill
                sizes="(max-width:900px) 100vw, 50vw"
                className={styles.eventoImg}
              />
            </div>
            <div className={styles.eventoText}>
              <span className="section-tag">Come lavoriamo</span>
              <h2 className={styles.eventoTitle}>
                Le degustazioni come strumento di vendita
              </h2>
              <p>
                Antonio non invia email con listini. Porta i prodotti, prepara un tavolo,
                invita il ristoratore a mangiare. La decisione di acquistare nasce sempre dal sapore —
                mai da una brochure.
              </p>
              <p>
                Le degustazioni B2B sono lo strumento principale di Difetti: esperienze sensoriali
                personalizzate per ogni cliente, con la storia del prodotto raccontata da chi lo ha
                selezionato.
              </p>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="chisiamo-wa-degustazione"
              >
                Organizza una degustazione
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
