import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { PuntiVenditaGrid } from '@/components/home/PuntiVenditaGrid';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'I Prodotti Selezionati da Difetti — Pasta, Conserve, Pesce e Confetture',
  description: 'Linee prodotto a marchio Difetti ed eccellenze artigianali campane selezionate da partner d\'autore (Nettuno, Noccioro, ecc.). Forniture HoReCa in Irpinia e Campania.',
};

const LINEE = [
  {
    id: 'pasta',
    titolo: 'Pasta Difetti',
    sottotitolo: 'Trafilata al bronzo. Rugosa per vocazione.',
    corpo: `Il grano duro viene scelto campo per campo in Irpinia. La trafila al bronzo crea una superficie rugosa che non è un difetto — è il segno distintivo di un metodo di produzione lento, autentico e focalizzato sulla massima qualità organolettica.\n\nL'essiccazione lenta a basse temperature preserva le proteine e il sapore. Non troverai mai due formati identici nello stesso sacchetto. Questo è il segno che qualcuno ci ha messo le mani.`,
    img: '/images/prodotti/pasta-candele.jpg',
    formati: ['Calamarata', 'Fusillo', 'Paccheri', 'Rigatone', 'Candela', 'Spaghetto'],
    badge: 'KM VERO',
    href: '/difetti/pasta',
    bgDark: false,
  },
  {
    id: 'conserve',
    titolo: 'Conserve Difetti',
    sottotitolo: 'Il rosso del pomodoro. Quello vero.',
    corpo: `Pomodoro arancione, giallo, verde. Varietà che non trovi al supermercato perché non sono "fotogeniche". Sono però esplosive di sapore.\n\nNiente addensanti chimici, coloranti o acido citrico di sintesi. Come correttore naturale di acidità usiamo esclusivamente vero succo di limone biologico, che preserva la freschezza originaria lasciando inalterato il sapore dolce del sole campano. Il colore opaco e disomogeneo è la firma dell'autenticità.`,
    img: '/images/prodotti/passata-pomodoro.jpg',
    formati: ['Passata di pomodoro 20 Smec', 'Passata arancione', 'Passata gialla', 'Pomodorini interi al naturale'],
    badge: 'ARTIGIANALE',
    href: '/difetti/conserve',
    bgDark: true,
  },
  {
    id: 'crostate',
    titolo: 'Crostate Difetti',
    sottotitolo: 'Non perfettamente rotonde. Perfettamente buone.',
    corpo: `La frolla è corta, burrosa, con farina di grano tenero macinata a pietra. La marmellata è a bassa cottura, poco zucchero, tanto frutto.\n\nIl reticolo viene intrecciato a mano. Non troverai mai due crostate con lo stesso disegno. Le imperfezioni sono parte del prodotto — non sono da nascondere, sono da raccontare.`,
    img: '/images/prodotti/crostate.jpg',
    formati: ['Albicocca irpina', 'Mirtilli selvatici', 'Frutti di bosco biologici'],
    badge: 'FATTO A MANO',
    href: '/difetti/crostate',
    bgDark: false,
  },
];

export default function DifettiPage() {
  return (
    <main className={styles.main}>
      {/* Page Hero */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroContent}`}>
          <span className="section-tag">Prodotti a Marchio</span>
          <h1 className={styles.heroTitle}>
            Tre linee.<br />Un solo principio.
          </h1>
          <p className={styles.heroSub}>
            Ogni prodotto a marchio Difetti nasce da una ricerca ossessiva della materia prima.
            Antonio non distribuisce — seleziona, confeziona e racconta.
          </p>
        </div>
      </section>

      {/* Linee prodotto */}
      {LINEE.map((linea, i) => (
        <section
          key={linea.id}
          id={linea.id}
          className={`grain ${styles.lineaSection} ${linea.bgDark ? styles.dark : ''}`}
        >
          <div className={`container ${styles.lineaInner} ${i % 2 !== 0 ? styles.reversed : ''}`}>
            {/* Immagine */}
            <div className={styles.imgWrapper}>
              <Image
                src={linea.img}
                alt={linea.titolo}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.img}
              />
              <span className={linea.bgDark ? 'badge-artigianale' : 'badge-km'} style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
                {linea.badge}
              </span>
            </div>

            {/* Testo */}
            <div className={styles.lineaText}>
              <span className="section-tag">{linea.id.toUpperCase()}</span>
              <h2 className={styles.lineaTitle}>{linea.titolo}</h2>
              <p className={styles.lineaClaim}><em>{linea.sottotitolo}</em></p>
              {linea.corpo.split('\n\n').map((para, pi) => (
                <p key={pi} className={styles.lineaBody}>{para}</p>
              ))}

              {/* Formati */}
              <div className={styles.formati}>
                <span className={styles.formatiLabel}>Formati disponibili</span>
                <ul className={styles.formatiList}>
                  {linea.formati.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.lineaCtas}>
                <Link
                  href={linea.href}
                  className={`btn ${linea.bgDark ? 'btn-outline-light' : 'btn-primary'}`}
                  id={`difetti-link-${linea.id}`}
                >
                  Vedi il Difetto Certificato
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Punti Vendita Logo Grid */}
      <PuntiVenditaGrid />

      {/* Bottom CTA */}
      <section className={`grain ${styles.bottomCta}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--cream)', fontSize: 'clamp(2rem,5vw,4rem)', marginBottom: '1rem' }}>
            Vuoi portare Difetti nel tuo menù?
          </h2>
          <p style={{ color: 'rgba(242,239,234,0.75)', maxWidth: 500, margin: '0 auto 2rem', fontFamily: 'var(--font-body)', fontSize: '1.1rem' }}>
            Scrivici su WhatsApp. Antonio risponde personalmente entro 24 ore.
          </p>
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp" id="difetti-bottom-wa">
            Scrivici ora
          </a>
        </div>
      </section>
    </main>
  );
}
