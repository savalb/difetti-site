'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import styles from './CTASection.module.css';

export function CTASection() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`grain ${styles.section}`} id="cta-finale">
      {/* Background */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src="/images/prodotti/prodotti-group.jpg"
          alt=""
          fill
          quality={80}
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <span className={`reveal section-tag ${styles.tag}`}>Per ristoratori e HoReCa</span>
        <h2 className={`reveal reveal-delay-1 ${styles.title}`}>
          Vuoi differenziarti<br />davvero?
        </h2>
        <p className={`reveal reveal-delay-2 ${styles.sub}`}>
          Antonio analizza il tuo menù, identifica le opportunità e ti propone
          una selezione personalizzata di eccellenze campane.
          <br /><strong>Senza costi fissi. Solo partnership vera.</strong>
        </p>
        <div className={`reveal reveal-delay-3 ${styles.ctas}`}>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            id="cta-finale-whatsapp"
          >
            Richiedi l&apos;analisi del tuo menù
          </a>
          <Link href="/servizi" className="btn btn-outline-light" id="cta-finale-servizi">
            Scopri i servizi
          </Link>
        </div>
      </div>
    </section>
  );
}
