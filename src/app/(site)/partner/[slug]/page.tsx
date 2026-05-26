import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPartnerBySlug, getAllPartners } from '@/lib/services/partnerService';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const p = await getPartnerBySlug(resolvedParams.slug);
  if (!p) return { title: 'Partner non trovato' };
  return {
    title: `${p.nome} — I Partner di Difetti | ${p.zona}`,
    description: p.descrizione,
  };
}

export async function generateStaticParams() {
  const allPartners = await getAllPartners();
  return allPartners.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PartnerDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const partner = await getPartnerBySlug(resolvedParams.slug);

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

  const haRichCopy = !!partner.sottoOcchiello;

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
            <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>
              {haRichCopy ? partner.sottoOcchiello : 'I PRODUTTORI DI DIFETTI'}
            </span>
            <h1 className={styles.title} style={{ textWrap: 'balance' }}>
              {haRichCopy ? partner.mainHeadline : partner.nome}
            </h1>
            <p className={styles.claim}><em>&ldquo;{partner.claim}&rdquo;</em></p>
            <p className={styles.content}>
              {haRichCopy ? partner.subHeadline : partner.descrizione}
            </p>

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

      {/* Sezione Introduzione Shock (Il Nemico Industriale) */}
      {haRichCopy && partner.introduzioneShock && (
        <section className={`grain ${styles.shockSection}`}>
          <div className="container">
            <div className={styles.shockBox}>
              <span className="section-tag" style={{ color: 'var(--amaranto-light)' }}>IL NEMICO INDUSTRIALE</span>
              <h2 className={styles.shockTitle}>{partner.introduzioneShock.titolo}</h2>
              <div className={styles.shockPointsGrid}>
                {partner.introduzioneShock.punti.map((punto, index) => {
                  const parts = punto.split(':');
                  const t = parts[0];
                  const d = parts.slice(1).join(':');
                  return (
                    <div key={index} className={styles.shockCard}>
                      <div className={styles.shockCardHeader}>
                        <span className={styles.shockCardNumber}>0{index + 1}</span>
                        {d ? <h3 className={styles.shockCardTitle}>{t}</h3> : null}
                      </div>
                      <p className={styles.shockCardText}>{d ? d.trim() : punto}</p>
                    </div>
                  );
                })}
              </div>
              <p className={styles.shockConclusion}>
                <strong>La Verità:</strong> {partner.introduzioneShock.conclusione}
              </p>
            </div>
          </div>
        </section>
      )}

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

      {/* Sezione Meccanismo Unico (Il Protocollo) */}
      {haRichCopy && partner.meccanismoUnico && (
        <section className={`grain ${styles.mechanismSection}`}>
          <div className="container">
            <span className="section-tag">IL NOSTRO PROTOCOLLO</span>
            <h2 className={styles.mechanismTitle}>{partner.meccanismoUnico.titolo}</h2>
            <p className={styles.mechanismSub}>{partner.meccanismoUnico.descrizione}</p>
            <div className={styles.mechanismGrid}>
              {partner.meccanismoUnico.pilastri.map((pilastro, index) => (
                <div key={index} className={styles.mechanismCard}>
                  <div className={styles.mechanismCardHeader}>
                    <span className={styles.mechanismNumber}>0{index + 1}</span>
                    <h3 className={styles.mechanismCardTitle}>{pilastro.titolo}</h3>
                  </div>
                  <p className={styles.mechanismCardText}>{pilastro.testo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sezione Vetrina Prodotti */}
      {haRichCopy && partner.prodottiShowcase && (
        <section className={`grain ${styles.showcaseSection}`}>
          <div className="container">
            <span className="section-tag">LA SELEZIONE ESCLUSIVA</span>
            <h2 className={styles.showcaseTitle}>Cosa portiamo sulla tua tavola</h2>
            <div className={styles.showcaseGrid}>
              {partner.prodottiShowcase.map((prod, index) => (
                <div key={index} className={styles.showcaseCard}>
                  <h3 className={styles.showcaseCardTitle}>{prod.nome}</h3>
                  <p className={styles.showcaseCardDesc}>{prod.descrizione}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sezione Domande Scomode (Obiezioni/FAQ) */}
      {haRichCopy && partner.obiezioni && partner.obiezioni.length > 0 && (
        <section className={`grain ${styles.faqSection}`}>
          <div className="container">
            <span className="section-tag">DOMANDE SCOMODE</span>
            <h2 className={styles.faqTitle}>Parliamoci chiaro: risposte oneste</h2>
            <div className={styles.faqList}>
              {partner.obiezioni.map((obi, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>&ldquo;{obi.domanda}&rdquo;</h3>
                  <p className={styles.faqAnswer}>{obi.risposta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead CTA */}
      <section className={`grain ${styles.leadSection}`}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>COLLABORA CON NOI</span>
          <h2 className={styles.leadTitle}>
            {haRichCopy ? partner.ctaFinale : `Vuoi servire i prodotti di ${partner.nome}?`}
          </h2>
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

