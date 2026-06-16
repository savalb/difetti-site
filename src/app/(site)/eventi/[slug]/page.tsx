import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { BRAND } from '@/lib/constants';
import { FALLBACK_EVENTI } from '../page';
import { PolaroidGallery } from '@/components/eventi/PolaroidGallery';
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
    title: `${evento.titolo} — Eventi B2B | Difetti Eccellenze Campane`,
    description: evento.descrizione || `Dettagli dell'evento ${evento.titolo} organizzato da Difetti Eccellenze Campane.`,
  };
}

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

  // Costruisce la galleria immagini
  const galleria: string[] = [];
  if (evento.galleria_immagini && Array.isArray(evento.galleria_immagini)) {
    evento.galleria_immagini.forEach((img: string) => {
      if (img && !galleria.includes(img)) {
        galleria.push(img);
      }
    });
  }

  // Bottone e CTA WhatsApp per gli imprenditori (Messaggio opzione B + Testo pulsante opzione A)
  const waText = evento.whatsapp_custom_text || `Ciao Antonio, sono un ristoratore. Vorrei sapere come funziona l'organizzazione degli eventi Difetti e ricevere informazioni sul listino prodotti B2B.`;
  const waLink = `${BRAND.whatsapp}?text=${encodeURIComponent(waText)}`;

  // Immagine di copertina per l'header full-bleed
  const headerBg = evento.immagine_copertina || '/images/eventi/aperitivo-in-vigna/ai_mockup_vigna_irpinia.png';

  return (
    <main className={styles.main}>
      {/* Hero Header Full-Bleed con Sfondo Immagine */}
      <section 
        className={styles.hero}
        style={{ backgroundImage: `url(${headerBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.layoutGrid}>
            
            {/* Left Column: Description, Stats, and Polaroid Album */}
            <div className={styles.mainContent}>
              
              {/* Copy Storytelling B2B */}
              <div className={styles.descriptionSection}>
                {paragrafi.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Sezione Statistiche Consumo & Indotto (Mix Opzione A e B) */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1.75rem', color: 'var(--earth)', marginBottom: '8px' }}>
                  I Numeri e l&apos;Indotto dell&apos;Evento
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--earth-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                  Un evento a firma Difetti attira appassionati del vero gusto artigianale e genera un consumo tangibile fin da subito. Ecco l&apos;indotto generato sul posto in poche ore per il locale ospitante:
                </p>
                
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statVal}>30+</div>
                    <div className={styles.statLbl}>Partecipanti</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statVal}>30</div>
                    <div className={styles.statLbl}>Bottiglie Fiano</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statVal}>2 kg</div>
                    <div className={styles.statLbl}>Alici Cetara</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statVal}>4 kg</div>
                    <div className={styles.statLbl}>Pomodorini</div>
                  </div>
                </div>
              </div>

              {/* Polaroid Single Album Cover -> opens modal Lightbox */}
              {galleria.length > 0 && (
                <div className={styles.gallerySection}>
                  <h3 className={styles.galleryTitle}>Album Fotografico</h3>
                  <PolaroidGallery immagini={galleria} titolo={evento.titolo} />
                </div>
              )}
            </div>

            {/* Right Column: Sticky Sidebar / Promotions & CTAs */}
            <div className={styles.sidebar}>
              <div className={styles.stickyBox}>
                
                {/* Gin Sintony Promo Card */}
                {evento.promozione_titolo && (
                  <div className={styles.promoCard}>
                    <span className={styles.promoTag}>Campagna VIP Riservata</span>
                    <h4 className={styles.promoTitle}>{evento.promozione_titolo}</h4>
                    <p className={styles.promoDesc}>{evento.promozione_desc}</p>
                    
                    <Link
                      href={evento.promozione_link || '/vip'}
                      className="btn btn-primary"
                      style={{ 
                        width: '100%', 
                        textAlign: 'center', 
                        display: 'block', 
                        border: '2px solid var(--cream)', 
                        boxShadow: '3px 3px 0 var(--cream)', 
                        background: 'var(--cream)', 
                        color: 'var(--earth)',
                        fontWeight: 600,
                        textDecoration: 'none'
                      }}
                    >
                      🎁 Richiedi Buono Sconto Gin
                    </Link>
                  </div>
                )}

                {/* Direct Action B2B Card */}
                <div className="upcomingCard" style={{ background: 'var(--cream-dark)', border: '2px solid var(--earth)', padding: 'var(--space-md)', boxShadow: '4px 4px 0 var(--earth)' }}>
                  <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', marginBottom: '8px', color: 'var(--earth)' }}>Proponi una serata</h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--earth-muted)', marginBottom: '16px' }}>
                    Vuoi portare la trasparenza del vero km zero nel tuo locale, generare passaparola ed aumentare gli scontrini con una serata a tema?
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ display: 'block', textAlign: 'center', fontWeight: 600 }}
                  >
                    👉 Proponi un Evento nel tuo Locale
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
