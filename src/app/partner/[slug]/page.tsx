import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PARTNER } from '@/lib/data/partner';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const p = PARTNER.find((x) => x.slug === resolvedParams.slug);
  if (!p) return { title: 'Partner non trovato' };
  return {
    title: `${p.nome} — I Partner di Difetti | ${p.zona}`,
    description: p.descrizione,
  };
}

export async function generateStaticParams() {
  return PARTNER.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PartnerDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const partner = PARTNER.find((x) => x.slug === resolvedParams.slug);

  if (!partner) {
    notFound();
  }

  // Estraiamo il difetto certificato per posizionarlo in evidenza
  const difettoCertificato = partner.dettagli.find(
    (d) => d.etichetta.toLowerCase().includes('difetto')
  )?.valore;

  const altriDettagli = partner.dettagli.filter(
    (d) => !d.etichetta.toLowerCase().includes('difetto')
  );

  // Verifichiamo se abbiamo un'immagine dedicata per il partner
  const haImmagine = !!partner.immagineUrl;
  const immagineUrl = partner.immagineUrl || null;

  const whatsappMessage = `Ciao Antonio, ho letto la storia di ${partner.nome} sul sito di Difetti. Vorrei avere più informazioni sui loro prodotti (specialità: ${partner.prodotto}) per il mio ristorante.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: partner.nome,
    description: partner.descrizione,
    image: partner.immagineUrl ? `https://difetti-site3.vercel.app${partner.immagineUrl}` : undefined,
    slogan: partner.claim,
    knowsAbout: partner.prodotto,
    brand: {
      '@type': 'Brand',
      name: 'Difetti',
    },
    award: difettoCertificato || undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: partner.zona,
      addressRegion: 'Campania',
      addressCountry: 'IT',
    },
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>I PRODUTTORI DI DIFETTI</span>
            <h1 className={styles.title} style={{ textWrap: 'balance' }}>{partner.nome}</h1>
            <p className={styles.claim}><em>&ldquo;{partner.claim}&rdquo;</em></p>
            <p className={styles.content}>{partner.descrizione}</p>

            <div className={styles.ctas}>
              <a
                href={`${BRAND.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Parla con Antonio
              </a>
              <Link href="/partner" className="btn btn-outline-light">
                Vedi tutti i partner
              </Link>
            </div>
          </div>
          
          <div className={styles.heroVisualWrapper}>
            {haImmagine && immagineUrl ? (
              <div className={styles.heroImgWrapper}>
                <Image 
                  src={immagineUrl} 
                  alt={partner.nome} 
                  fill 
                  sizes="(max-width: 900px) 100vw, 40vw" 
                  className={styles.heroImg} 
                  priority
                />
              </div>
            ) : (
              <div className={styles.certificatoBox}>
                <div className={styles.certificatoHeader}>
                  <span className={styles.certificatoStamp}>CERTIFICATO DI IMPERFEZIONE</span>
                </div>
                <div className={styles.certificatoBody}>
                  <span className={styles.certificatoLabel}>IL DIFETTO CERTIFICATO:</span>
                  <p className={styles.certificatoValore}>
                    &ldquo;{difettoCertificato}&rdquo;
                  </p>
                </div>
                <div className={styles.certificatoFooter}>
                  <p>La prova sensoriale e visiva che questo prodotto è vivo, lavorato a mano e libero da standardizzazioni industriali chimiche.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Storytelling & Dettagli Section */}
      <section className={`grain ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyContent}>
              <span className="section-tag">LO STORYTELLING VERO</span>
              <h2 className={styles.storyTitle}>La storia dietro il sapore</h2>
              {partner.storiaParagrafi.map((paragrafo, index) => (
                <p key={index} className={styles.storyPara}>{paragrafo}</p>
              ))}
            </div>

            <div className={styles.sidebar}>
              <div className={styles.specificheCard}>
                <h3 className={styles.sidebarTitle}>SCHEDA TECNICA</h3>
                <dl className={styles.specificheList}>
                  <div className={styles.specificheItem}>
                    <dt>Produttore</dt>
                    <dd>{partner.nome}</dd>
                  </div>
                  <div className={styles.specificheItem}>
                    <dt>Zona di Produzione</dt>
                    <dd>{partner.zona}</dd>
                  </div>
                  <div className={styles.specificheItem}>
                    <dt>Specialità</dt>
                    <dd>{partner.prodotto}</dd>
                  </div>
                  {altriDettagli.map((d, index) => (
                    <div key={index} className={styles.specificheItem}>
                      <dt>{d.etichetta}</dt>
                      <dd>{d.valore}</dd>
                    </div>
                  ))}
                </dl>

                {difettoCertificato && haImmagine && (
                  <div className={styles.sidebarDifetto}>
                    <span className={styles.sidebarDifettoLabel}>Il Difetto Certificato</span>
                    <p className={styles.sidebarDifettoVal}>&ldquo;{difettoCertificato}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead CTA */}
      <section className={`grain ${styles.leadSection}`}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>COLLABORA CON NOI</span>
          <h2 className={styles.leadTitle}>Vuoi servire i prodotti di {partner.nome}?</h2>
          <p className={styles.leadText}>
            Tutti i prodotti di {partner.nome} fanno parte della selezione esclusiva Difetti. Contatta Antonio per ricevere il campionario o concordare una visita del produttore nella tua cucina.
          </p>
          <a
            href={`${BRAND.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ fontSize: '1.05rem', padding: '16px 36px' }}
          >
            Contatta Antonio su WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
