'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Split-text stagger animation
    const el = headlineRef.current;
    if (!el) return;
    const words = el.innerText.split(' ');
    el.innerHTML = words
      .map((w, i) => `<span class="${styles.word}" style="animation-delay:${i * 0.08}s">${w}</span>`)
      .join(' ');
  }, []);

  return (
    <section className={`grain ${styles.hero}`} id="hero">
      {/* Background image */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src="/images/prodotti/pasta-close.jpg"
          alt="Pasta artigianale Difetti trafilata al bronzo reale"
          fill
          priority
          quality={85}
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.tagWrapper}>
          <span className="section-tag">Eccellenze Campane</span>
        </div>

        <h1 ref={headlineRef} className={styles.headline}>
          Smetti di servire perfezione industriale.<br />
          Inizia a servire la <i>Pasta Vera</i>.
        </h1>

        <p className={styles.subtext}>
          La pasta a marchio <strong>Difetti</strong> è trafilata in bronzo reale ed essiccata a bassa temperatura per trattenere il sugo. Nessun catalogo fotocopia: valorizziamo il tuo menù con la nostra consulenza gastronomica strategica.
        </p>

        <div className={styles.ctas}>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            id="hero-cta-whatsapp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.122 1.523 5.862L.057 23.486a.5.5 0 0 0 .613.614l5.598-1.473A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.967 0-3.82-.535-5.404-1.473l-.386-.232-3.995 1.05 1.068-3.898-.253-.4A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Richiedi l'Analisi del Menù
          </a>
          <Link href="/difetti" className="btn btn-outline-light" id="hero-cta-prodotti">
            Scopri il Difetto
          </Link>
        </div>

        {/* Stats strip */}
        <div className={styles.stats} role="list">
          {[
            { n: '8+', label: 'Produttori Partner' },
            { n: '100%', label: 'Prodotti Campani' },
            { n: 'KM', label: 'Vero Garantito' },
          ].map((s) => (
            <div key={s.label} className={styles.stat} role="listitem">
              <span className={styles.statNum}>{s.n}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
