import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

const DIFETTI_PRODUCTS = [
  {
    slug: 'pasta',
    nome: 'Pasta Difetti',
    claim: 'Trafilata al bronzo. Rugosa per vocazione.',
    descrizione: 'La nostra pasta è pensata per ristoratori che non vogliono compromessi. Essiccata lentamente e con una ruvidità che lega il sugo in modo impeccabile. Non è perfetta, è viva.',
    immagine: '/images/prodotti/pasta-close.jpg',
    formati: ['Candele', 'Paccheri', 'Spaghetti', 'Fusilli', 'Mezzi Paccheri'],
    badge: 'KM VERO',
  },
  {
    slug: 'conserve',
    nome: 'Conserve Difetti',
    claim: 'Il rosso del pomodoro. Quello vero.',
    descrizione: 'Realizzate solo con pomodori di collina, raccolti al giusto grado di maturazione. Nessun addensante chimico: la densità è frutto del tempo e del sole.',
    immagine: '/images/prodotti/passata-pomodoro.jpg',
    formati: ['Passata Arancione', 'Passata Gialla', 'Pomodorini Interi', 'Polpa Rustica', 'Datterini'],
    badge: 'ARTIGIANALE',
  },
  {
    slug: 'crostate',
    nome: 'Crostate Difetti',
    claim: 'Non perfettamente rotonde. Perfettamente buone.',
    descrizione: 'Frolla fatta a mano e marmellate a cottura lenta con alta percentuale di frutta. Le imperfezioni visive testimoniano il lavoro artigianale di chi le intreccia una ad una.',
    immagine: '/images/prodotti/crostate.jpg',
    formati: ['Albicocca', 'Mirtilli', 'Frutti di Bosco', 'Limone', 'Visciole'],
    badge: 'FATTO A MANO',
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const p = DIFETTI_PRODUCTS.find((x) => x.slug === resolvedParams.slug);
  if (!p) return { title: 'Prodotto non trovato' };
  return {
    title: `${p.nome} — Linea Prodotti | Difetti`,
    description: p.descrizione,
  };
}

export async function generateStaticParams() {
  return DIFETTI_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function DifettiDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const prodotto = DIFETTI_PRODUCTS.find((x) => x.slug === resolvedParams.slug);

  if (!prodotto) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className="section-tag">{prodotto.badge}</span>
            <h1 className={styles.title}>{prodotto.nome}</h1>
            <p className={styles.claim}><em>&ldquo;{prodotto.claim}&rdquo;</em></p>
            <p className={styles.content}>{prodotto.descrizione}</p>
            
            <div className={styles.formatiBox}>
              <h3 className={styles.formatiTitle}>Formati Disponibili per HoReCa</h3>
              <ul className={styles.formatiList}>
                {prodotto.formati.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            <div className={styles.ctas}>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Richiedi listino
              </a>
              <Link href="/difetti" className="btn btn-outline-light">
                Vedi altre linee
              </Link>
            </div>
          </div>
          
          <div className={styles.heroImgWrapper}>
            <Image 
              src={prodotto.immagine} 
              alt={prodotto.nome} 
              fill 
              sizes="(max-width: 900px) 100vw, 50vw" 
              className={styles.heroImg} 
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
