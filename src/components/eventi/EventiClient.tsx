'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import styles from './EventiClient.module.css';

interface Evento {
  id: string;
  data: string;
  titolo: string;
  luogo: string;
  desc: string;
  immagini?: string[];
}

const EVENTI_FUTURI: Evento[] = [
  {
    id: 'b2b-alta-irpinia',
    data: 'Giugno 2026',
    titolo: 'Degustazione B2B — Ristoranti Alta Irpinia',
    luogo: 'Alta Irpinia · Su invito',
    desc: 'Sessione di degustazione riservata ai ristoratori dell\'Alta Irpinia. Presentazione della nuova linea conserve estive e partnership con Poma Moris.',
  },
  {
    id: 'masterclass-pasta',
    data: 'Luglio 2026',
    titolo: 'Masterclass Pasta Artigianale: La Verità del Bronzo',
    luogo: 'Avellino · Su prenotazione',
    desc: 'Un incontro formativo dedicato a chef e pastai per riscoprire il comportamento in cottura della vera trafilatura in bronzo a bassa temperatura.',
  },
  {
    id: 'degustazione-conserve',
    data: 'Settembre 2026',
    titolo: 'Degustazione Olio Nuovissimo e Conserve Autunnali',
    luogo: 'Ariano Irpino · B2B',
    desc: 'Anteprima dei pomodori cotti a sole e delle nuove conserve artigianali in vista della stagione invernale.',
  }
];

const EVENTI_PASSATI: Evento[] = [
  {
    id: 'b2b-avellino-maggio',
    data: 'Maggio 2026',
    titolo: 'Degustazione B2B — Ristoranti Avellino',
    luogo: 'Avellino',
    desc: 'Incontro con 12 ristoratori irpini. Presentazione linea pasta e conserve Difetti con assaggi comparativi tra pasta industriale e pasta Difetti.',
    immagini: [
      '/images/eventi/evento-degustazione.jpg',
      '/images/prodotti/prodotti-group.jpg',
      '/images/prodotti/prodotti-display.jpg'
    ]
  },
  {
    id: 'fiera-gusto-napoli',
    data: 'Aprile 2026',
    titolo: 'Fiera del Gusto Campano',
    luogo: 'Napoli',
    desc: 'Stand Difetti alla fiera regionale delle eccellenze. Oltre 200 contatti qualificati e avvio di 15 nuove importanti partnership con la ristorazione napoletana.',
    immagini: [
      '/images/prodotti/pasta-candele.jpg',
      '/images/prodotti/passata-pomodoro.jpg',
      '/images/prodotti/prodotti-hero.jpg'
    ]
  },
  {
    id: 'tasting-noccioro-giffoni',
    data: 'Marzo 2026',
    titolo: 'Serata Nocciolo — Tasting Nocciole Irpine',
    luogo: 'Giffoni Valle Piana',
    desc: 'Degustazione collaborativa con il partner Noccioro. Presentazione dei dessert realizzati con la crema di nocciole spalmabile pura artigianale.',
    immagini: [
      '/images/prodotti/crostate.jpg',
      '/images/prodotti/prodotti-display.jpg'
    ]
  }
];

export function EventiClient() {
  const [activeTab, setActiveTab] = useState<'futuri' | 'passati'>('futuri');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Trova l'evento selezionato per la galleria
  const selectedEvent = EVENTI_PASSATI.find(e => e.id === selectedEventId);

  // Navigazione all'interno del Lightbox
  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedEvent?.immagini) return;
    setActiveImageIdx((prev) => (prev + 1) % selectedEvent.immagini!.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedEvent?.immagini) return;
    setActiveImageIdx((prev) => (prev - 1 + selectedEvent.immagini!.length) % selectedEvent.immagini!.length);
  };

  const handleCloseLightbox = () => {
    setSelectedEventId(null);
    setActiveImageIdx(0);
  };

  // Keyboard navigation per il Lightbox
  useEffect(() => {
    if (!selectedEventId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'Escape') handleCloseLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventId]);

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>Eventi</span>
          <h1 className={styles.heroTitle}>Assaggiare<br />per credere.</h1>
          <p className={styles.heroSub}>
            Non mandiamo cataloghi per posta. Portiamo i prodotti di persona.
            Le degustazioni B2B di Difetti sono esperienze sensoriali dove il sapore si confronta con la verità.
          </p>
        </div>
      </section>

      {/* Selettore Tab Brutalista */}
      <section className={styles.tabSection}>
        <div className="container">
          <div className={styles.tabContainer}>
            <button
              onClick={() => setActiveTab('futuri')}
              className={`${styles.tabBtn} ${activeTab === 'futuri' ? styles.tabBtnActive : ''}`}
            >
              Prossimi Appuntamenti
            </button>
            <button
              onClick={() => setActiveTab('passati')}
              className={`${styles.tabBtn} ${activeTab === 'passati' ? styles.tabBtnActive : ''}`}
            >
              Archivio & Gallerie Foto
            </button>
          </div>
        </div>
      </section>

      {/* Contenuto Tab */}
      <section className={`${styles.eventsListSection} section-pad`}>
        <div className="container">
          {activeTab === 'futuri' ? (
            <div className={styles.tabContent}>
              <span className="section-tag">Calendario 2026</span>
              <h2 className={styles.sectionTitle}>I Prossimi Eventi</h2>
              
              <div className={styles.gridFuturi}>
                {EVENTI_FUTURI.map((e) => (
                  <div key={e.id} className={styles.upcomingCard}>
                    <div className={styles.upcomingBadge}>PROSSIMO</div>
                    <span className={styles.upcomingData}>🗓️ {e.data}</span>
                    <h3 className={styles.upcomingTitle}>{e.titolo}</h3>
                    <p className={styles.upcomingMeta}>📍 {e.luogo}</p>
                    <p className={styles.upcomingDesc}>{e.desc}</p>
                    <a
                      href={BRAND.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      id={`eventi-wa-${e.id}`}
                    >
                      Richiedi Invito / Info
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.tabContent}>
              <span className="section-tag">Memorie di Sapore</span>
              <h2 className={styles.sectionTitle}>Archivio Eventi Passati</h2>
              <p className={styles.archiveIntro}>
                Clicca su uno degli eventi per aprire la galleria fotografica e rivivere l&apos;esperienza.
              </p>

              <div className={styles.gridPassati}>
                {EVENTI_PASSATI.map((e) => (
                  <div 
                    key={e.id} 
                    className={styles.passatoCard}
                    onClick={() => {
                      if (e.immagini && e.immagini.length > 0) {
                        setSelectedEventId(e.id);
                        setActiveImageIdx(0);
                      }
                    }}
                  >
                    {e.immagini && e.immagini.length > 0 && (
                      <div className={styles.passatoThumbWrapper}>
                        <Image
                          src={e.immagini[0]}
                          alt={e.titolo}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={styles.passatoThumb}
                        />
                        <div className={styles.galleryBadge}>
                          📷 Vedi Galleria ({e.immagini.length} foto)
                        </div>
                      </div>
                    )}
                    <div className={styles.passatoBody}>
                      <span className={styles.passatoData}>{e.data}</span>
                      <h3 className={styles.passatoTitle}>{e.titolo}</h3>
                      <span className={styles.passatoLuogo}>📍 {e.luogo}</span>
                      <p className={styles.passatoDesc}>{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedEvent && selectedEvent.immagini && (
        <div className={styles.lightbox} onClick={handleCloseLightbox}>
          <button className={styles.closeBtn} onClick={handleCloseLightbox} aria-label="Chiudi galleria">
            ✕
          </button>
          
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button className={styles.navBtn} onClick={handlePrevImage} aria-label="Foto precedente">
              ←
            </button>

            <div className={styles.imageContainer}>
              <Image
                src={selectedEvent.immagini[activeImageIdx]}
                alt={`Foto evento ${selectedEvent.titolo} - ${activeImageIdx + 1}`}
                fill
                sizes="(max-width: 1200px) 100vw, 80vw"
                className={styles.lightboxImg}
                priority
              />
              <div className={styles.imageCaption}>
                <h4>{selectedEvent.titolo}</h4>
                <p>Foto {activeImageIdx + 1} di {selectedEvent.immagini.length}</p>
              </div>
            </div>

            <button className={styles.navBtn} onClick={handleNextImage} aria-label="Foto successiva">
              →
            </button>
          </div>
        </div>
      )}

      {/* CTA Bottom */}
      <section className={`${styles.ctaSection} section-pad`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className={styles.ctaTitle}>Vuoi ospitare una degustazione nel tuo locale?</h2>
          <p className={styles.ctaSub}>
            Organizziamo sessioni mirate per chef, sommelier e titolari HoReCa in Campania. 
            Mettiamo sul tavolo i nostri prodotti e smontiamo le bugie della produzione industriale.
          </p>
          <a
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            id="eventi-wa-bottom"
          >
            Scrivici su WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
