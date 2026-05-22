'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './MetodoOperativoSection.module.css';

const STEPS = [
  {
    num: '01',
    titolo: 'Ricerca',
    desc: 'Seleziono i migliori artigiani dell\'Irpinia che rifiutano la chimica industriale.',
  },
  {
    num: '02',
    titolo: 'Degustazione',
    desc: 'Porto i prodotti direttamente nella cucina del tuo ristorante per un assaggio reale.',
  },
  {
    num: '03',
    titolo: 'Ordine Diretto',
    desc: 'Nessun portale complicato. Ordini con un messaggio WhatsApp o una chiamata diretta ad Antonio.',
  },
  {
    num: '04',
    titolo: 'Consegna Rapida',
    desc: 'Distribuzione diretta in tempi record senza passaggi in magazzini di terzi.',
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
            <p className={styles.subtitle} style={{ marginBottom: 'var(--space-md)' }}>
              Il prodotto è artigianale, ma il servizio non può permettersi "difetti". Uniamo la lentezza della tradizione alla velocità della distribuzione locale.
            </p>
            <Link href="/servizi" className="btn btn-outline-light">
              Scopri i nostri Servizi →
            </Link>
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
