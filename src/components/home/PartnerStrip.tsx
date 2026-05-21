'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PARTNER } from '@/lib/data/partner';
import { BRAND } from '@/lib/constants';
import styles from './PartnerStrip.module.css';

export function PartnerStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`grain ${styles.section} section-pad`} id="partner-strip">
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-tag">La rete Difetti</span>
          <h2 className={styles.title}>8 Produttori.<br />Una sola garanzia.</h2>
          <p className={styles.sub}>
            Ogni partner è stato visitato personalmente da Antonio. Ogni storia è stata ascoltata.
            Ogni prodotto è stato assaggiato prima di portarlo nel catalogo.
          </p>
        </div>

        <div className={styles.grid}>
          {PARTNER.map((p, i) => (
            <Link
              href={`/partner/${p.slug}`}
              key={p.slug}
              className={`reveal reveal-delay-${(i % 4) + 1} ${styles.card}`}
              id={`partner-card-${p.slug}`}
            >
              <div className={styles.zona}>{p.zona}</div>
              <h3 className={styles.nome}>{p.nome}</h3>
              <p className={styles.prodotto}>{p.prodotto}</p>
              <p className={styles.claim}><em>&ldquo;{p.claim}&rdquo;</em></p>
              <span className={styles.link}>Scopri →</span>
            </Link>
          ))}
        </div>

        <div className={`reveal ${styles.cta}`}>
          <Link href="/partner" className="btn btn-primary">
            Conosci tutti i partner
          </Link>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            id="partner-strip-whatsapp"
          >
            Richiedi il catalogo
          </a>
        </div>
      </div>
    </section>
  );
}
