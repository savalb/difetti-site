'use client';

import { useEffect, useRef } from 'react';
import styles from './ManifestoSection.module.css';

const MANIFESTO_LINES = [
  'La perfezione',
  'è un\'illusione',
  'industriale.',
];

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`grain ${styles.manifesto}`} id="manifesto">
      <div className={`container ${styles.inner}`}>
        {/* Left: Big quote */}
        <div className={styles.quoteCol}>
          <div className={`reveal ${styles.accentBar}`} aria-hidden="true" />
          {MANIFESTO_LINES.map((line, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} ${styles.quoteLine}`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Right: Body text */}
        <div className={styles.textCol}>
          <span className={`reveal section-tag`} style={{ color: 'var(--amaranto-light)' }}>
            Il Manifesto
          </span>
          <p className={`reveal reveal-delay-1 ${styles.body}`}>
            Antonio De Matteis non è un distributore. È un <strong>Ricercatore del Gusto</strong>.
          </p>
          <p className={`reveal reveal-delay-2 ${styles.body}`}>
            Seleziona solo ciò che la distribuzione di massa scarta perché "esteticamente non conforme". 
            <em>Non ti ruba tempo</em> con cataloghi infiniti di prodotti fotocopia: ti porta in cucina solo le vere eccellenze irpine.
          </p>
          <p className={`reveal reveal-delay-3 ${styles.body}`}>
            Perché non hai bisogno di un nuovo fornitore.<br />
            <strong>Hai bisogno di smettere di tradire i tuoi clienti.</strong>
          </p>

          {/* I 5 valori - compact */}
          <ul className={`reveal reveal-delay-4 ${styles.valori}`}>
            {['Unicità', 'Eccellenza', 'Consulenza', 'KM Vero', 'Lealtà'].map((v) => (
              <li key={v}>
                <span className={styles.dot} aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
