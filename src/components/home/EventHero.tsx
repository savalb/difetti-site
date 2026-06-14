'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './EventHero.module.css';

export function EventHero() {
  return (
    <section className={`grain ${styles.section}`} id="event-hero">
      <div className={`container ${styles.grid}`}>
        {/* Text Column */}
        <div className={styles.textCol}>
          <div className={styles.badgeWrapper}>
            <span className={styles.liveBadge}>
              <span className={styles.pulseDot} />
              🔴 EVENTO IN CORSO
            </span>
          </div>

          <h1 className={styles.title}>
            Aperitivo <br className={styles.desktopBr} />in Vigna
          </h1>
          
          <h2 className={styles.subtitle}>
            Presso la Cantina <i>Macchia dei Briganti</i>
            <span className={styles.meta}>Montefalcione (AV) · Domenica 14 Giugno 2026</span>
          </h2>

          <p className={styles.copy}>
            Stiamo festeggiando le eccellenze gastronomiche dell&apos;Irpinia tra i filari della splendida Cantina Macchia dei Briganti. Solo per i partecipanti all&apos;evento di stasera, è attiva un&apos;offerta esclusiva sul nostro Gin Sintony e la possibilità di scaricare il catalogo completo dei prodotti Difetti.
          </p>

          <div className={styles.ctas}>
            <Link href="/vip" className="btn btn-primary" id="event-cta-gin">
              Sblocca Offerta Gin
            </Link>
            <a
              href="/Catalogo%20Visuale%20-%20Eccellenze%20Difetti.pdf"
              download="Catalogo Visuale - Eccellenze Difetti.pdf"
              className="btn btn-outline-light"
              id="event-cta-catalog"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Scarica Catalogo
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <Image
              src="/images/eventi/immagine promo.png"
              alt="Aperitivo in Vigna — Cantina Macchia dei Briganti e Gin Sintony"
              fill
              priority
              className={styles.promoImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
