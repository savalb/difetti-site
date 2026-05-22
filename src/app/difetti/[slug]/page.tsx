import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/lib/constants';
import styles from './page.module.css';

interface ConfrontoRiga {
  campo: string;
  bugia: string;
  verita: string;
}

interface Specifica {
  etichetta: string;
  valore: string;
}

interface ProdottoDettaglio {
  slug: string;
  nome: string;
  claim: string;
  introduzione: string;
  immagine: string;
  badge: string;
  storiaParagrafi: string[];
  confronto: ConfrontoRiga[];
  specifiche: Specifica[];
  formati: string[];
}

const DIFETTI_PRODUCTS: ProdottoDettaglio[] = [
  {
    slug: 'pasta',
    nome: 'Pasta Artigianale Difetti',
    claim: 'Trafilata al bronzo reale. Bianca, ruvida, digeribile.',
    introduzione: 'La nostra pasta è pensata per i ristoratori che rifiutano la standardizzazione industriale. Essiccata lentamente per preservare la struttura del grano, offre una superficie straordinariamente rugosa.',
    immagine: '/images/prodotti/pasta-close.jpg',
    badge: 'KM VERO',
    storiaParagrafi: [
      'Vendere pasta con l’immagine bucolica del campo di grano, per poi produrla con grani esteri stoccati per anni nei silos e trafilata a velocità folli con teflon. Questa è la bugia del “Km Zero” di facciata che molti produttori industriali propongono ai ristoratori.',
      'La verità è che la velocità di estrusione industriale scalda il glutine e “brucia” le proteine della pasta, rendendola estremamente difficile da digerire. Inoltre, le trafile in teflon rendono la superficie liscia e lucida: il sugo scivolerà via inesorabilmente nel piatto del cliente.',
      'La Pasta Difetti è l’esatto opposto. Utilizziamo solo grano selezionato ed essiccato lentamente a bassa temperatura per 48 ore. Questo processo preserva le qualità organolettiche e la digeribilità. La nostra pasta viene estrusa solo con trafile in bronzo reale, lasciandola bianca, opaca e ruvida. Una consistenza che lega il sugo in modo impeccabile, trattenendolo al 100%.'
    ],
    confronto: [
      {
        campo: 'Trafilatura',
        bugia: 'Teflon industriale. Crea una superficie liscia e scivolosa su cui il sugo scivola via nel piatto.',
        verita: 'Bronzo Reale. Rilascia amido naturale e crea una superficie porosa che lega il sugo alla perfezione.'
      },
      {
        campo: 'Essiccazione',
        bugia: 'Rapida ad alta temperatura in poche ore. Cuoce e denatura le proteine del grano, rendendolo indigeribile.',
        verita: 'Lenta a bassa temperatura per 48 ore. Mantiene intatte le qualità organolettiche e la massima digeribilità.'
      },
      {
        campo: 'Colore e Aspetto',
        bugia: 'Giallo lucido, uniforme e vetroso. Standardizzata per sembrare impeccabile e non cambiare mai.',
        verita: 'Bianco opaco, pallido e naturale. La rugosità è visibile a occhio nudo, ogni formato ha la sua anima.'
      }
    ],
    specifiche: [
      { etichetta: 'Grano', valore: '100% Grano duro campano selezionato' },
      { etichetta: 'Tempo Essiccazione', valore: '48 ore a 40°C' },
      { etichetta: 'Lavorazione', valore: 'Artigianale con trafila in bronzo' },
      { etichetta: 'Uso consigliato', valore: 'Ristorazione HoReCa d’eccellenza' }
    ],
    formati: ['Candele spezzate', 'Paccheri', 'Spaghetti', 'Fusilli lunghi', 'Mezzi Paccheri']
  },
  {
    slug: 'conserve',
    nome: 'Conserve Difetti',
    claim: 'Il rosso vero del pomodoro di collina. Nessun addensante.',
    introduzione: 'Realizzate solo con pomodori di collina, raccolti al perfetto grado di maturazione. Nessun addensante chimico: la densità è frutto del tempo e del sole.',
    immagine: '/images/prodotti/passata-pomodoro.jpg',
    badge: 'ARTIGIANALE',
    storiaParagrafi: [
      'Il pomodoro vero non è di un rosso fluorescente chimico. Nel marketing industriale, le conserve vengono addensate artificialmente con amidi e fecole per dare consistenza a pomodori acerbi e acquosi, mascherandoli con correttori di acidità e coloranti.',
      'La nostra conserva è prodotta esclusivamente con pomodori di collina raccolti a mano al perfetto grado di maturazione. Nelle conserve Difetti non troverai alcun addensante chimico: la sua densità densa e corposa è il frutto naturale del tempo e della riduzione a bassa temperatura.',
      'Inoltre, la foglia di basilico fresco che inseriamo in ogni barattolo di vetro non è uno specchietto per le allodole: ossida naturalmente a contatto con l’ossigeno residuo. Se in una conserva industriale vedi un basilico sempre verde brillante, c’è il trucco della chimica. L’ossidazione naturale della nostra foglia è la garanzia che non usiamo stabilizzanti artificiali.'
    ],
    confronto: [
      {
        campo: 'Densità e Consistenza',
        bugia: 'Spessore artificiale ottenuto con fecola, amidi modificati o concentrati ricostituiti con acqua.',
        verita: 'Consistenza corposa naturale ottenuta per riduzione termica lenta dei soli pomodori freschi.'
      },
      {
        campo: 'Basilico e Conservanti',
        bugia: 'Aromi di sintesi chimica o foglie trattate industrialmente per non cambiare colore.',
        verita: 'Foglia fresca intera che ossida naturalmente nel vaso di vetro, a garanzia dell’assenza di chimica.'
      },
      {
        campo: 'Colore e Sapore',
        bugia: 'Rosso fluo ultra-saturo. Gusto acido camuffato da zuccheri aggiunti e correttori di pH.',
        verita: 'Rosso profondo, naturale e disomogeneo. Dolcezza terrosa tipica del pomodoro maturato sulla pianta.'
      }
    ],
    specifiche: [
      { etichetta: 'Materia prima', valore: 'Pomodoro di collina campano selezionato a mano' },
      { etichetta: 'Additivi', valore: 'Zero (Niente amidi, fecole o correttori)' },
      { etichetta: 'Confezionamento', valore: 'Vaso di vetro con foglia di basilico fresco' },
      { etichetta: 'Stagionalità', valore: 'Lavorato esclusivamente ad agosto' }
    ],
    formati: ['Passata Arancione', 'Passata Gialla', 'Pomodorini Interi al naturale', 'Polpa Rustica', 'Datterini in succo']
  },
  {
    slug: 'crostate',
    nome: 'Crostate Difetti',
    claim: 'Intrecciate a mano. Frolla viva, non un algoritmo.',
    introduzione: 'Frolla fatta a mano e marmellate a cottura lenta con alta percentuale di frutta. Le imperfezioni visive testimoniano il lavoro artigianale di chi le intreccia una ad una.',
    immagine: '/images/prodotti/crostate.jpg',
    badge: 'FATTO A MANO',
    storiaParagrafi: [
      'Il mercato dolciario per i bar è dominato da crostate esteticamente impeccabili, con griglie perfette, bordi millimetrici e colori ultra-saturi. Spesso surgelate e piene di umettanti e grassi vegetali idrogenati per durare settimane in vetrina senza seccarsi mai.',
      'Questa perfezione artificiale è la sicurezza dell’industria, ma per il palato del cliente è solo “assenza di anima”. Se una crostata può stare in vetrina per giorni senza cambiare aspetto, non è merito della ricetta tradizionale, ma della chimica.',
      'La Crostata Difetti fa una promessa diversa: dopo 4 giorni inizia a indurirsi. Perché? Perché è fatta di frolla vera con burro fresco e uova intere, senza conservanti. È cibo vivo. Il reticolo è intrecciato a mano da un fornaio campano che si sveglia alle 4 del mattino, i bordi sono irregolari e la marmellata ha un’alta percentuale di frutta cotta lentamente. Il profumo del nostro dolce è la “sincerità olfattiva” del burro e del forno, non della vanillina di sintesi.'
    ],
    confronto: [
      {
        campo: 'Griglia ed Estetica',
        bugia: 'Taglio laser millimetrico, perfetta e geometrica. Priva di qualsiasi intervento manuale.',
        verita: 'Intrecciata a mano da un fornaio. Bordi irregolari e marmellata leggermente fuoriuscita.'
      },
      {
        campo: 'Freschezza',
        bugia: 'Durata di settimane grazie a grassi idrogenati, umettanti e stabilizzanti industriali.',
        verita: 'Indurisce naturalmente dopo 4 giorni perché è frolla vera senza conservanti o chimica.'
      },
      {
        campo: 'Profilo Olfattivo',
        bugia: 'Vanillina di sintesi e aromi artificiali che coprono ingredienti poveri.',
        verita: 'Sincerità Olfattiva: profumo autentico di burro, farina macinata a pietra e forno.'
      }
    ],
    specifiche: [
      { etichetta: 'Impasto', valore: 'Frolla burrosa con farina di grano tenero tipo 1 macinata a pietra' },
      { etichetta: 'Farcitura', valore: 'Confettura artigianale a cottura lenta (65% frutta)' },
      { etichetta: 'Lavorazione', valore: 'Interamente stesa e intrecciata a mano' },
      { etichetta: 'Conservabilità', valore: 'Consigliata entro 4-5 giorni dall’arrivo' }
    ],
    formati: ['Albicocca', 'Mirtilli', 'Frutti di Bosco', 'Limone candito', 'Visciole selvatiche']
  }
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
    description: p.introduzione,
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
      {/* Hero Section */}
      <section className={`grain ${styles.hero}`}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <span className="section-tag">{prodotto.badge}</span>
            <h1 className={styles.title} style={{ textWrap: 'balance' }}>{prodotto.nome}</h1>
            <p className={styles.claim}><em>&ldquo;{prodotto.claim}&rdquo;</em></p>
            <p className={styles.content}>{prodotto.introduzione}</p>

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

      {/* Storytelling Section */}
      <section className={`grain ${styles.storiaSection}`}>
        <div className="container">
          <div className={styles.storiaGrid}>
            <div className={styles.storiaContent}>
              <span className="section-tag">IL DIFETTO CERTIFICATO</span>
              <h2 className={styles.storiaTitle} style={{ textWrap: 'balance' }}>Perché l’imperfezione è l’unica garanzia</h2>
              {prodotto.storiaParagrafi.map((paragrafo, index) => (
                <p key={index} className={styles.storiaPara}>{paragrafo}</p>
              ))}
            </div>

            <div className={styles.specificheCard}>
              <h3 className={styles.specificheTitle}>SCHEDA DEL PRODOTTO</h3>
              <dl className={styles.specificheList}>
                {prodotto.specifiche.map((spec, index) => (
                  <div key={index} className={styles.specificheItem}>
                    <dt>{spec.etichetta}</dt>
                    <dd>{spec.valore}</dd>
                  </div>
                ))}
              </dl>
              
              <div className={styles.formatiBox}>
                <h4 className={styles.formatiTitle}>Formati Disponibili</h4>
                <ul className={styles.formatiList}>
                  {prodotto.formati.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={`grain ${styles.confrontoSection}`}>
        <div className="container">
          <div className={styles.confrontoHeader}>
            <span className="section-tag">IL TEST DELLA VERITÀ</span>
            <h2 className={styles.confrontoTitle} style={{ textWrap: 'balance' }}>Mettiamo a nudo l’industria</h2>
            <p className={styles.confrontoSub}>
              Fai fare questa analisi ai tuoi chef. I numeri e l’estetica impeccabile sono la bugia dell’industria; il sapore e la consistenza sono la nostra verità.
            </p>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.confrontoTable}>
              <thead>
                <tr>
                  <th scope="col">Caratteristica</th>
                  <th scope="col">La Bugia Industriale (Plastica)</th>
                  <th scope="col">La Verità di Difetti (Artigianale)</th>
                </tr>
              </thead>
              <tbody>
                {prodotto.confronto.map((row, index) => (
                  <tr key={index}>
                    <th scope="row" data-label="Caratteristica">{row.campo}</th>
                    <td data-label="La Bugia Industriale">{row.bugia}</td>
                    <td data-label="La Verità di Difetti">{row.verita}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom Lead CTA */}
      <section className={`grain ${styles.bottomCta}`}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-tag">SERVI LA VERITÀ</span>
          <h2 className={styles.bottomCtaTitle} style={{ textWrap: 'balance' }}>Vuoi testare Difetti nel tuo ristorante?</h2>
          <p className={styles.bottomCtaText}>
            Richiedi un campione gratuito della nostra linea {prodotto.nome}. Antonio ti contatterà personalmente per pianificare una degustazione direttamente nella tua cucina, senza farti perdere tempo.
          </p>
          <a
            href={`${BRAND.whatsapp}?text=Ciao%20Antonio,%20vorrei%20richiedere%20un%20campione%20di%20${encodeURIComponent(prodotto.nome)}%20per%20il%20mio%20locale.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ fontSize: '1.1rem', padding: '16px 32px' }}
          >
            Richiedi Campione su WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
