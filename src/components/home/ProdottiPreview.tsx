'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProdottiPreview.module.css';

const PRODOTTI = [
  {
    id: 'pasta',
    titolo: 'Pasta Artigianale',
    claim: '6 Formati, un solo grano',
    desc: 'Trafilata al bronzo e essiccata a bassa temperatura per 48 ore. Una superficie bianca e ruvida che cattura il condimento e racconta il lavoro dell\'uomo.',
    href: '/difetti/pasta',
    img: '/images/prodotti/pasta-candele.jpg',
    badge: 'ECCELLENZA',
  },
  {
    id: 'conserve',
    titolo: 'Conserve di Pomodoro',
    claim: '3 Varietà di pomodoro vero',
    desc: 'Solo pomodoro campano e sale. Senza correttori di acidità, conservanti o addensanti. Colore naturale che varia con le stagioni.',
    href: '/difetti/conserve',
    img: '/images/prodotti/passata-pomodoro.jpg',
    badge: 'VERITÀ',
  },
  {
    id: 'crostate',
    titolo: 'Crostate Artigianali',
    claim: 'Fatte a mano, pezzo per pezzo',
    desc: 'Frolla stesa a mano con burro di alta qualità, farcita con marmellata vera. Il bordo irregolare è la nostra firma di sincerità olfattiva.',
    href: '/difetti/crostate',
    img: '/images/prodotti/crostate.jpg',
    badge: 'ARTIGIANALE',
  },
];

export function ProdottiPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} section-pad`} id="prodotti-preview">
      <div className="container">
        <div className={`reveal ${styles.header}`}>
          <span className="section-tag">I Prodotti Difetti</span>
          <h2 className={styles.title}>
            Tre linee.<br />Un solo principio.
          </h2>
          <p className={styles.subtitle}>
            Ogni prodotto a marchio Difetti viene selezionato, confezionato e garantito
            da Antonio De Matteis. Nessun intermediario. Nessun compromesso.
          </p>
        </div>

        <div className={styles.grid}>
          {PRODOTTI.map((p, i) => (
            <Link
              href={p.href}
              key={p.id}
              className={`reveal reveal-delay-${i + 1} ${styles.card}`}
              id={`prodotto-card-${p.id}`}
            >
              <div className={styles.imgWrapper}>
                <Image
                  src={p.img}
                  alt={p.titolo}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.img}
                />
                <span className={styles.badge}>{p.badge}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.titolo}</h3>
                <p className={styles.cardClaim}><em>{p.claim}</em></p>
                <p className={styles.cardDesc}>{p.desc}</p>
                <span className={styles.cardCta}>
                  Dettagli Prodotto →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={`reveal ${styles.partnerBlock}`}>
          <div className={styles.partnerText}>
            <h3>Oltre il Marchio: Le Nostre Alleanze</h3>
            <p>
              Non siamo soli in questa battaglia. Selezioniamo e distribuiamo le eccellenze dei migliori produttori campani. 
              Scopri la storia dei <Link href="/partner/nonno-giuseppe" className={styles.inlineLink}>taralli intrecciati a mano di Nonno Giuseppe</Link>, 
              oppure lasciati tentare dalla pura <Link href="/partner/noccioro" className={styles.inlineLink}>nocciola irpina spalmabile di Noccioro</Link>.
            </p>
          </div>
          <div className={styles.partnerCta}>
            <Link href="/partner" className="btn btn-outline">
              Incontra tutti i Partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
