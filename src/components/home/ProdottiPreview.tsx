'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProdottiPreview.module.css';

const PRODOTTI = [
  {
    id: 'pasta',
    titolo: 'Pasta Difetti',
    claim: 'Trafilata al bronzo. Rugosa per vocazione.',
    desc: 'Grano duro irpino, essiccazione lenta, superficie ruvida che cattura il condimento. La candela che non assomiglia a nessun\'altra.',
    href: '/difetti/pasta',
    img: '/images/prodotti/pasta-candele.jpg',
    badge: 'KM VERO',
  },
  {
    id: 'conserve',
    titolo: 'Conserve Difetti',
    claim: 'Il rosso del pomodoro. Quello vero.',
    desc: 'Passate di pomodoro arancione, giallo, verde. Niente addensanti. Solo frutto, succo di limone e tempo.',
    href: '/difetti/conserve',
    img: '/images/prodotti/passata-pomodoro.jpg',
    badge: 'ARTIGIANALE',
  },
  {
    id: 'crostate',
    titolo: 'Crostate Difetti',
    claim: 'Non perfettamente rotonde. Perfettamente buone.',
    desc: 'Frolla corta, marmellata artigianale a bassa cottura, reticolo fatto a mano. Il difetto è nella forma, non nel sapore.',
    href: '/difetti/crostate',
    img: '/images/prodotti/crostate.jpg',
    badge: 'FATTO A MANO',
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
