import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
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
    title: `${p.nome} — Partner Difetti | ${p.zona}`,
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

  return (
    <main className={styles.main}>
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <span className="section-tag">{partner.zona}</span>
          <h1 className={styles.title}>{partner.nome}</h1>
          <p className={styles.claim}><em>&ldquo;{partner.claim}&rdquo;</em></p>
          <div className={styles.content}>
            <p>{partner.descrizione}</p>
          </div>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Specialità</span>
              <span className={styles.infoVal}>{partner.prodotto}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Zona di produzione</span>
              <span className={styles.infoVal}>{partner.zona}</span>
            </div>
          </div>

          <div className={styles.ctas}>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Richiedi campioni
            </a>
            <Link href="/partner" className="btn btn-outline-light">
              Torna ai partner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
