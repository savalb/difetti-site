'use client';

import { useEffect, useRef } from 'react';
import styles from './MetodoOperativoSection.module.css';

const STEPS = [
  {
    num: '01',
    titolo: 'Ricerca',
    desc: 'Batto l\'Irpinia palmo a palmo per trovare chi produce senza scorciatoie industriali.',
  },
  {
    num: '02',
    titolo: 'Degustazione',
    desc: 'Porto i prodotti nel tuo ristorante. Li assaggi in cucina, dove conta davvero.',
  },
  {
    num: '03',
    titolo: 'Riordino Digitale',
    desc: 'Un gestionale senza carta per te. Due tap sul tablet e l\'ordine parte su WhatsApp.',
  },
  {
    num: '04',
    titolo: 'Consegna',
    desc: 'Veloce, puntuale, diretta. Senza passaggi in inutili magazzini di stoccaggio.',
  },
];

export function MetodoOperativoSection() {
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
    <section ref={sectionRef} className={`${styles.section} section-pad grain`} id="metodo">
      <div className="container">
        <div className={styles.inner}>
          <div className={`reveal ${styles.header}`}>
            <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>Efficienza</span>
            <h2 className={styles.title}>Come Lavoriamo</h2>
            <p className={styles.subtitle}>
              Il prodotto è artigianale, ma il servizio non può permettersi "difetti". Uniamo la lentezza della tradizione alla velocità del digitale.
            </p>
          </div>

          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.num} className={`reveal reveal-delay-${i + 1} ${styles.step}`}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.titolo}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
