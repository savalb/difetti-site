import type { Metadata } from 'next';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Eventi — Degustazioni e Fiere | Difetti Eccellenze Campane',
  description: 'Calendario eventi Difetti: degustazioni B2B, fiere gastronomiche, incontri con produttori. Scopri i prossimi appuntamenti con Antonio De Matteis in Irpinia e Campania.',
};

const EVENTI_PASSATI = [
  {
    data: 'Maggio 2026',
    titolo: 'Degustazione B2B — Ristoranti Avellino',
    luogo: 'Avellino',
    desc: 'Incontro con 12 ristoratori irpini. Presentazione linea pasta e conserve Difetti.',
  },
  {
    data: 'Aprile 2026',
    titolo: 'Fiera del Gusto Campano',
    luogo: 'Napoli',
    desc: 'Stand Difetti alla fiera. Oltre 200 contatti e 15 nuove partnership avviate.',
  },
  {
    data: 'Marzo 2026',
    titolo: 'Serata Nocciolo — Tasting Nocciole Irpine',
    luogo: 'Giffoni Valle Piana',
    desc: 'Degustazione collaborativa con Noccioro. Presentazione crema di nocciole artigianale.',
  },
];

export default function EventiPage() {
  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>Eventi</span>
          <h1 className={styles.heroTitle}>Assaggiare<br />per credere.</h1>
          <p className={styles.heroSub}>
            Non mandiamo campioni per posta. Li portiamo di persona.
            Le degustazioni B2B di Difetti sono esperienze sensoriali dove il prodotto parla.
          </p>
        </div>
      </section>

      {/* Prossimi eventi */}
      <section className={`${styles.upcoming} section-pad`}>
        <div className="container">
          <span className="section-tag">Prossimi appuntamenti</span>
          <h2 className={styles.sectionTitle}>Calendario 2026</h2>
          <div className={styles.upcomingCard}>
            <div className={styles.upcomingBadge}>PROSSIMO</div>
            <h3 className={styles.upcomingTitle}>
              Degustazione B2B — Ristoranti Alta Irpinia
            </h3>
            <p className={styles.upcomingMeta}>
              <strong>Giugno 2026</strong> · Alta Irpinia · Su invito
            </p>
            <p className={styles.upcomingDesc}>
              Sessione di degustazione riservata ai ristoratori dell&apos;Alta Irpinia.
              Presentazione della nuova linea conserve estive e partnership con Poma Moris.
            </p>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              id="eventi-wa-prossimo"
            >
              Richiedi invito
            </a>
          </div>
        </div>
      </section>

      {/* Gallery / eventi passati */}
      <section className={`grain ${styles.passati} section-pad`}>
        <div className="container">
          <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>Archivio</span>
          <h2 className={styles.sectionTitle} style={{ color: 'var(--cream)' }}>
            Eventi passati
          </h2>

          {/* Photo gallery */}
          <div className={styles.gallery}>
            <div className={styles.galleryItem}>
              <Image
                src="/images/eventi/evento-degustazione.jpg"
                alt="Degustazione Difetti — evento con ristoratori"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className={styles.galleryImg}
              />
            </div>
            <div className={styles.galleryItem}>
              <Image
                src="/images/brand/brand-book.jpg"
                alt="Brand Book Difetti presentato durante evento"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className={styles.galleryImg}
              />
            </div>
          </div>

          {/* Lista eventi */}
          <div className={styles.eventList}>
            {EVENTI_PASSATI.map((e, i) => (
              <div key={i} className={styles.eventItem}>
                <span className={styles.eventData}>{e.data}</span>
                <div className={styles.eventContent}>
                  <h3 className={styles.eventTitolo}>{e.titolo}</h3>
                  <span className={styles.eventLuogo}>{e.luogo}</span>
                  <p className={styles.eventDesc}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${styles.ctaSection} section-pad`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className={styles.ctaTitle}>Vuoi partecipare al prossimo evento?</h2>
          <p className={styles.ctaSub}>
            Le degustazioni B2B sono su invito. Scrivici e ti riserviamo un posto.
          </p>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            id="eventi-wa-bottom"
          >
            Scrivici su WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
