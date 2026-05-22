'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './TheEnemySection.module.css';

const BUGIE = [
  {
    id: 'freschezza',
    titolo: 'Freschezza Infinita',
    mito: 'Prodotti perfetti per mesi.',
    verita: 'Chimica: umettanti e grassi saturi. Il cibo vivo ha scadenze brevi.',
  },
  {
    id: 'estetica',
    titolo: 'Perfezione Estetica',
    mito: 'Bordi e forme millimetriche.',
    verita: 'Taglio al laser e standardizzazione. Un algoritmo, non un artigiano.',
  },
  {
    id: 'sapore',
    titolo: 'Sapore Piatto',
    mito: 'Gusto costante e recognizable.',
    verita: 'Aromi di sintesi (es. vanillina) per coprire l\'assenza di materie prime nobili.',
  },
];

export function TheEnemySection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} section-pad`} id="il-nemico">
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-tag">La Bugia del Marketing</span>
          <h2 className={styles.title}>
            L'estetica industriale<br />
            è un falso d'autore.
          </h2>
          <p className={styles.subtitle}>
            Ti hanno convinto che la perfezione visiva sia sinonimo di qualità. Dietro un prodotto perfetto si nasconde la standardizzazione chimica. <Link href="/chi-siamo" className={styles.inlineLink}>Scopri la nostra filosofia</Link> o metti alla prova la verità dei nostri <Link href="/difetti" className={styles.inlineLink}>prodotti artigianali</Link>.
          </p>
        </div>

        <div className={styles.grid}>
          {BUGIE.map((bugia, i) => (
            <div key={bugia.id} className={`reveal reveal-delay-${i + 1} ${styles.card}`}>
              <h3 className={styles.cardTitle}>{bugia.titolo}</h3>
              <p className={styles.cardMito}><strong>Il Mito:</strong> {bugia.mito}</p>
              <div className={styles.divider} />
              <p className={styles.cardVerita}><strong>La Verità:</strong> {bugia.verita}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
