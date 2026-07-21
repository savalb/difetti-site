'use client';

import { BRAND } from '@/lib/constants';
import { track } from '@vercel/analytics';
import styles from './page.module.css';

interface Step {
  n: string;
  t: string;
  d: string;
}

interface Servizio {
  id: string;
  tag: string;
  titolo: string;
  sottotitolo: string;
  paragrafi: string[];
  steps: Step[];
  cta: string;
  ctaId: string;
}

interface ServiziClientProps {
  servizi: Servizio[];
}

export function ServiziClient({ servizi }: ServiziClientProps) {
  return (
    <>
      {servizi.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`grain ${styles.servizio} ${i % 2 !== 0 ? styles.dark : ''}`}
        >
          <div className="container">
            <div className={styles.servizioHeader}>
              <span className="section-tag">{s.tag}</span>
              <h2 className={styles.servizioTitle}>{s.titolo}</h2>
              <p className={styles.servizioClaim}><em>{s.sottotitolo}</em></p>
            </div>

            <div className={styles.servizioCols}>
              <div className={styles.servizioText}>
                {s.paragrafi.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>

              <div className={styles.servizioSteps}>
                {s.steps.map((step) => (
                  <div key={step.n} className={styles.step}>
                    <span className={styles.stepN}>{step.n}</span>
                    <div>
                      <h4 className={styles.stepT}>{step.t}</h4>
                      <p className={styles.stepD}>{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.servizioCta}>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i % 2 !== 0 ? 'btn-whatsapp' : 'btn-primary'}`}
                id={s.ctaId}
                onClick={() => track('whatsapp_click', { location: 'servizi', service: s.id })}
              >
                {s.cta}
              </a>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
