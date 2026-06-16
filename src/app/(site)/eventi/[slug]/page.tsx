import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { BRAND } from '@/lib/constants';
import { FALLBACK_EVENTI } from '../page';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Genera metadati dinamici per SEO/GEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let evento = null;

  try {
    if (supabase) {
      const { data } = await supabase
        .from('eventi_sito')
        .select('*')
        .eq('slug', slug)
        .single();
      if (data) evento = data;
    }
  } catch (e) {
    console.warn('Errore lettura db per metadata, provo fallback:', e);
  }

  if (!evento) {
    evento = FALLBACK_EVENTI.find((e) => e.slug === slug);
  }

  if (!evento) {
    return {
      title: 'Evento Non Trovato | Difetti',
    };
  }

  return {
    title: `${evento.titolo} — Eventi | Difetti Eccellenze Campane`,
    description: evento.descrizione || `Dettagli dell'evento ${evento.titolo} organizzato da Difetti Eccellenze Campane.`,
  };
}

// Forza il rendering dinamico o revalidation per riflettere le modifiche dell'admin
export const revalidate = 10;

export default async function EventoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let evento = null;

  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('eventi_sito')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error && data) {
        evento = data;
      }
    }
  } catch (e) {
    console.warn('Errore caricamento db per evento, uso fallback:', e);
  }

  // Se non trovato in Supabase, cerca nei fallback statici
  if (!evento) {
    evento = FALLBACK_EVENTI.find((e) => e.slug === slug);
  }

  if (!evento) {
    notFound();
  }

  // Prepara i paragrafi della descrizione
  const paragrafi = (evento.descrizione_estesa || evento.descrizione)
    .split('\n')
    .filter((p: string) => p.trim().length > 0);

  // Costruisce la galleria immagini unendo immagine copertina ed eventuali immagini aggiuntive
  const galleria: string[] = [];
  if (evento.immagine_copertina) {
    galleria.push(evento.immagine_copertina);
  }
  if (evento.galleria_immagini && Array.isArray(evento.galleria_immagini)) {
    evento.galleria_immagini.forEach((img: string) => {
      if (img && !galleria.includes(img)) {
        galleria.push(img);
      }
    });
  }

  // Testo per WhatsApp
  const waText = evento.whatsapp_custom_text || `Ciao Antonio, vorrei maggiori informazioni sull'evento "${evento.titolo}" svolto a ${evento.luogo}.`;
  const waLink = `${BRAND.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <main className={styles.main}>
      {/* Hero Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <Link href="/eventi">Eventi</Link> &gt; <span>{evento.titolo}</span>
          </div>

          <div className={styles.heroContent}>
            {evento.sotto_occhiello && (
              <span className={styles.heroTag}>{evento.sotto_occhiello}</span>
            )}
            <h1 className={styles.heroTitle}>{evento.titolo}</h1>
            
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span>🗓️</span> <strong>{evento.data}</strong> {evento.ora && `alle ore ${evento.ora}`}
              </div>
              <div className={styles.metaItem}>
                <span>📍</span> <strong>{evento.luogo}</strong> {evento.indirizzo && `(${evento.indirizzo})`}
              </div>
              <div className={styles.metaItem}>
                <span>🏷️</span> <span style={{ textTransform: 'uppercase', fontSize: '0.8rem', background: 'var(--amaranto)', color: 'var(--cream)', padding: '2px 8px', fontWeight: 700 }}>{evento.stato}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.layoutGrid}>
            
            {/* Left Column: Description, Video, Gallery */}
            <div className={styles.mainContent}>
              <div className={styles.descriptionSection}>
                {paragrafi.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Optimized Video Container */}
              {evento.video_url && (
                <div className={styles.videoSection}>
                  <h3 className={styles.galleryTitle}>Riprese Video dell&apos;Esperienza</h3>
                  <div className={styles.videoWrapper}>
                    <video
                      src={evento.video_url}
                      className={styles.videoElement}
                      controls
                      preload="none"
                      playsInline
                      muted
                      poster={evento.immagine_copertina || undefined}
                    />
                  </div>
                </div>
              )}

              {/* Photo Gallery Grid */}
              {galleria.length > 0 && (
                <div className={styles.gallerySection}>
                  <h3 className={styles.galleryTitle}>Galleria Foto ({galleria.length} immagini)</h3>
                  <div className={styles.galleryGrid}>
                    {galleria.map((img: string, idx: number) => (
                      <div key={idx} className={styles.galleryItem}>
                        <Image
                          src={img}
                          alt={`Foto ${idx + 1} per l'evento ${evento!.titolo}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={styles.galleryImg}
                          priority={idx === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Sidebar / Promotions & CTAs */}
            <div className={styles.sidebar}>
              <div className={styles.stickyBox}>
                
                {/* Promo Card if promotion details exist */}
                {evento.promozione_titolo && (
                  <div className={styles.promoCard}>
                    <span className={styles.promoTag}>Offerta Riservata HoReCa</span>
                    <h4 className={styles.promoTitle}>{evento.promozione_titolo}</h4>
                    <p className={styles.promoDesc}>{evento.promozione_desc}</p>
                    
                    <a
                      href={evento.promozione_link || waLink}
                      target={evento.promozione_link ? undefined : '_blank'}
                      rel={evento.promozione_link ? undefined : 'noopener noreferrer'}
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center', display: 'block', border: '2px solid var(--cream)', boxShadow: '3px 3px 0 var(--cream)', background: 'var(--cream)', color: 'var(--earth)' }}
                    >
                      {evento.promozione_link ? 'Vedi Offerta' : 'Richiedi Promo su WhatsApp'}
                    </a>
                  </div>
                )}

                {/* Direct Action Card */}
                <div className="upcomingCard" style={{ background: 'var(--cream-dark)', border: '2px solid var(--earth)', padding: 'var(--space-md)', boxShadow: '4px 4px 0 var(--earth)' }}>
                  <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', marginBottom: '8px', color: 'var(--earth)' }}>Ospita questo Format</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--earth-muted)', marginBottom: '16px' }}>
                    Ti piace questo tipo di degustazione? Possiamo organizzarne una a quattro mani nel tuo locale per stupire i tuoi clienti.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ display: 'block', textAlign: 'center' }}
                  >
                    💬 Scrivici su WhatsApp
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
