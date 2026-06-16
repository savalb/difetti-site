'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import styles from './EventiClient.module.css';

interface Evento {
  id: string;
  slug: string;
  titolo: string;
  sotto_occhiello?: string;
  data: string;
  luogo: string;
  descrizione: string;
  immagine_copertina?: string;
  galleria_immagini?: string[];
  stato: 'futuro' | 'passato';
}

interface EventiClientProps {
  initialEventi: Evento[];
}

export function EventiClient({ initialEventi }: EventiClientProps) {
  const [activeTab, setActiveTab] = useState<'futuri' | 'passati'>('futuri');
  const router = useRouter();

  // Dividiamo gli eventi in base allo stato
  const eventiFuturi = initialEventi.filter(e => e.stato === 'futuro');
  const eventiPassati = initialEventi.filter(e => e.stato === 'passato');

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
              Prossimi Appuntamenti ({eventiFuturi.length})
            </button>
            <button
              onClick={() => setActiveTab('passati')}
              className={`${styles.tabBtn} ${activeTab === 'passati' ? styles.tabBtnActive : ''}`}
            >
              Archivio & Gallerie ({eventiPassati.length})
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
                {eventiFuturi.map((e) => (
                  <div key={e.id} className={styles.upcomingCard}>
                    <div className={styles.upcomingBadge}>PROSSIMO</div>
                    <span className={styles.upcomingData}>🗓️ {e.data}</span>
                    <h3 className={styles.upcomingTitle}>{e.titolo}</h3>
                    {e.sotto_occhiello && <span style={{ fontSize: '0.8rem', color: 'var(--earth-muted)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{e.sotto_occhiello}</span>}
                    <p className={styles.upcomingMeta}>📍 {e.luogo}</p>
                    <p className={styles.upcomingDesc}>{e.descrizione}</p>
                    
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '1rem' }}>
                      <button
                        onClick={() => router.push(`/eventi/${e.slug}`)}
                        className="btn btn-primary"
                        style={{ border: '2px solid var(--earth)', cursor: 'pointer' }}
                      >
                        Leggi Dettagli
                      </button>
                      <a
                        href={`${BRAND.whatsapp}?text=${encodeURIComponent(`Ciao Antonio, vorrei richiedere informazioni per l'evento "${e.titolo}" a ${e.luogo}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                        id={`eventi-wa-${e.id}`}
                      >
                        Richiedi Invito / Info (WhatsApp)
                      </a>
                    </div>
                  </div>
                ))}
                
                {eventiFuturi.length === 0 && (
                  <div style={{ padding: '3rem 1rem', textAlign: 'center', border: '2px dashed var(--earth-muted)', color: 'var(--earth-muted)' }}>
                    Nessun prossimo evento programmato al momento. Resta aggiornato su questa pagina!
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.tabContent}>
              <span className="section-tag">Memorie di Sapore</span>
              <h2 className={styles.sectionTitle}>Archivio Eventi Passati</h2>
              <p className={styles.archiveIntro}>
                Clicca su uno degli eventi per aprire la pagina dedicata, vedere le foto, i video e scoprire i dettagli dell&apos;esperienza.
              </p>

              <div className={styles.gridPassati}>
                {eventiPassati.map((e) => (
                  <div 
                    key={e.id} 
                    className={styles.passatoCard}
                    onClick={() => router.push(`/eventi/${e.slug}`)}
                  >
                    {(e.immagine_copertina || (e.galleria_immagini && e.galleria_immagini.length > 0)) && (
                      <div className={styles.passatoThumbWrapper}>
                        <Image
                          src={e.immagine_copertina || e.galleria_immagini![0]}
                          alt={e.titolo}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={styles.passatoThumb}
                        />
                        <div className={styles.galleryBadge}>
                          📖 Leggi Resoconto & Foto
                        </div>
                      </div>
                    )}
                    <div className={styles.passatoBody}>
                      <span className={styles.passatoData}>{e.data}</span>
                      <h3 className={styles.passatoTitle}>{e.titolo}</h3>
                      <span className={styles.passatoLuogo}>📍 {e.luogo}</span>
                      <p className={styles.passatoDesc}>{e.descrizione}</p>
                    </div>
                  </div>
                ))}
                
                {eventiPassati.length === 0 && (
                  <div style={{ padding: '3rem 1rem', textAlign: 'center', border: '2px dashed var(--earth-muted)', color: 'var(--earth-muted)', gridColumn: '1 / -1' }}>
                    Nessun evento passato in archivio al momento.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className={`${styles.ctaSection} section-pad`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className={styles.ctaTitle}>Vuoi ospitare una degustazione nel tuo locale?</h2>
          <p className={styles.ctaSub}>
            Organizziamo sessioni mirate per chef, sommelier e titolari HoReCa in Campania. 
            Mettiamo sul tavolo i nostri prodotti e smontiamo le bugie della produzione industriale.
          </p>
          <a
            href={`${BRAND.whatsapp}?text=${encodeURIComponent("Ciao Antonio, vorrei organizzare una degustazione dei prodotti Difetti nel mio locale.")}`}
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
