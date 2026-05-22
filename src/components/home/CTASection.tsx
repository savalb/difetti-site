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
          Richiedi l'Analisi<br />
          del Menù <i>Anti-Industriale</i>.
        </h2>
        <p className={`reveal reveal-delay-2 ${styles.sub}`}>
          Compila il modulo qui sotto. Antonio analizzerà la tua offerta attuale e ti mostrerà dove i prodotti industriali ti stanno facendo perdere autenticità e margini.
        </p>

        <form 
          action="https://formspree.io/f/xyyqzzzz" 
          method="POST" 
          className={`reveal reveal-delay-3 ${styles.form}`}
        >
          <div className={styles.inputGroup}>
            <input type="text" name="locale" placeholder="Nome del Locale" required className={styles.input} />
            <input type="text" name="ruolo" placeholder="Il tuo Ruolo (es. Titolare, Chef)" required className={styles.input} />
          </div>
          <textarea 
            name="problema" 
            placeholder="Qual è il problema principale con i tuoi attuali fornitori di materie prime?" 
            required 
            className={styles.textarea}
            rows={4}
          ></textarea>
          <button type="submit" className="btn btn-whatsapp" style={{ width: '100%' }}>
            Invia Richiesta
          </button>
        </form>
      </div>
    </section>
  );
}
