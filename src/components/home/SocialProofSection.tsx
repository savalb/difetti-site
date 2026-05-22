'use client';

import { useEffect, useRef } from 'react';
import styles from './SocialProofSection.module.css';

const TESTIMONIANZE = [
  {
    id: 1,
    quote: "Da quando ho inserito la pasta Difetti, i clienti mi chiedono di che marca è. Non usano più formaggio per coprire il sapore del grano. Costa di più, ma il food cost si ripagato con il passaparola.",
    autore: "Mario R.",
    ruolo: "Chef & Titolare, Avellino",
  },
  {
    id: 2,
    quote: "Antonio è l'unico fornitore che prima di vendermi le conserve mi ha fatto assaggiare il pomodoro crudo col cucchiaino in cucina. Nessuna chiacchiera, solo sapore vero.",
    autore: "Lucia S.",
    ruolo: "Bistrot Irpino",
  },
];

export function SocialProofSection() {
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
    <section ref={sectionRef} className={`${styles.section} section-pad`} id="testimonianze">
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-tag">La Riprova</span>
          <h2 className={styles.title}>Chi ha già scelto i Difetti</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIANZE.map((t, i) => (
            <div key={t.id} className={`reveal reveal-delay-${i + 1} ${styles.card}`}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quoteText}>{t.quote}</p>
              <div className={styles.autoreBox}>
                <div className={styles.autoreLine} />
                <div>
                  <p className={styles.autoreName}>{t.autore}</p>
                  <p className={styles.autoreRuolo}>{t.ruolo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
