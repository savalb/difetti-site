'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProdottiPreview.module.css';

const PRODOTTI = [
  {
    id: 'pasta-pomodoro',
    titolo: 'Pasta e Pomodoro',
    claim: 'Il Difetto del KM Vero',
    desc: 'Pasta trafilata al bronzo (davvero), bianca, ruvida, essiccata a bassa temperatura per 48 ore. Passata di pomodoro dai colori veri, non fluo. Non scivola via.',
    href: '/difetti#pasta',
    img: '/images/prodotti/pasta-candele.jpg',
    badge: 'VERITÀ',
  },
  {
    id: 'crostate',
    titolo: 'Crostate Artigianali',
    claim: 'Il Difetto dell\'Estetica',
    desc: 'Bordi irregolari, frolla stesa a mano, marmellata vera. Se vedi una griglia perfetta, stai mangiando un algoritmo. La nostra crostata ha "sincerità olfattiva".',
    href: '/difetti#crostate',
    img: '/images/prodotti/crostate.jpg',
    badge: 'ARTIGIANALE',
  },
  {
    id: 'taralli',
    titolo: 'I Taralli di Giuseppe',
    claim: 'Il Difetto dell\'Intreccio',
    desc: 'Trecce irregolari, coloriture diverse per via del forno a legna. Senti il "crack" secco al morso. Non li chiamo "Difetti", li chiamo col nome di chi li fa da 50 anni.',
    href: '/difetti#taralli', /* We can map this to a specific page or section later */
    img: '/images/prodotti/prodotto-1.jpg', /* We don't have a specific tarallo AI image yet, using placeholder */
    badge: 'NONNO GIUSEPPE',
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
            Ogni prodotto a marchio Difetti viene selezionato, confezionato e raccontato
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
                  Scopri →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={`reveal ${styles.cta}`}>
          <Link href="/difetti" className="btn btn-outline">
            Vedi tutti i prodotti
          </Link>
        </div>
      </div>
    </section>
  );
}
