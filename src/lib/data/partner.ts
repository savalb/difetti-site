// ─── Dati Partner (dal preventivo strategico e storytelling reali) ────
export type Partner = {
  slug: string;
  nome: string;
  zona: string;
  prodotto: string;
  descrizione: string;
  claim: string;
  storiaParagrafi: string[];
  dettagli: { etichetta: string; valore: string }[];
  immagineUrl?: string;
};

export const PARTNER: Partner[] = [
  {
    slug: 'nonno-giuseppe',
    nome: 'Nonno Giuseppe',
    zona: 'Irpinia',
    prodotto: 'Taralli artigianali',
    descrizione: 'L’intreccio manuale di Giuseppe. Non troverai mai due taralli identici nel sacchetto. Il forno a legna non è un algoritmo — è un elemento vivo.',
    claim: 'Ogni tarallo porta il segno delle sue mani.',
    storiaParagrafi: [
      '“Queste non sono trecce di pasta. È la biografia di un uomo che ho deciso di proteggere.” Quando ho assaggiato per la prima volta i taralli di Giuseppe, ho capito che non potevo metterci sopra una mia etichetta standard. Sarei stato un ladro di storie. Quei taralli non sono un semplice “prodotto”. Sono Giuseppe. Sono le sue rughe, il suo sudore, la sua sapienza che non si può insegnare in un corso di cucina, ma che si impara solo passando cinquant’anni davanti a un forno.',
      'Mi ricordo ancora il primo giorno. Giuseppe stava intrecciando la pasta con una velocità che mi ha lasciato a bocca aperta. Le sue dita se muovevano come quelle di un pianista. Mi ha dato un tarallo ancora caldo e mi ha detto: “Assaggia, Antonio. Se trovi un aroma chimico, ti regalo tutto il forno”. Non c’erano aromi chimici. C’era solo il sapore vero del vino bianco irpino e dell’olio extravergine di oliva. C’era la croccantezza di chi bolle ancora i taralli prima di infornarli. Un passaggio che l’industria ha cancellato perché “costa troppo tempo e troppo gas”. Giuseppe no. Lui non risparmia sul tempo. Lui rispetta la tradizione.',
      'Quelli di Giuseppe sono trecce irregolari, cotte a legna. Alcuni sono più bruniti perché il calore del forno a legna non è un algoritmo costante, ma un elemento vivo che Giuseppe sa domare con l’istinto. Quando spezzi uno di questi taralli, il rumore deve essere un “crack” secco. Se fa “puff” o si sbriciola come polistirolo, non è un tarallo di Giuseppe. La resistenza che oppone al morso è la prova della bollitura, del riposo, della qualità della farina che ho selezionato personalmente insieme a lui.'
    ],
    dettagli: [
      { etichetta: 'Lavorazione', valore: 'Bollitura tradizional­e e intreccio a mano' },
      { etichetta: 'Cottura', valore: 'Forno a legna (calore disomogeneo)' },
      { etichetta: 'Ingredienti chiave', valore: 'Farina selezionata, vino bianco irpino, olio extravergine' },
      { etichetta: 'Il Difetto Certificato', valore: 'Trecce asimmetriche con sfumature cromatiche di bruciatura' }
    ],
    immagineUrl: '/images/partner/nonno-giuseppe.png'
  },
  {
    slug: 'noccioro',
    nome: 'Noccioro',
    zona: 'Irpinia',
    prodotto: 'Nocciole e creme',
    descrizione: 'Dove la nocciola irpina diventa crema. Tostatura artigianale a bassa temperatura, senza additivi. Il profumo è già una garanzia.',
    claim: 'La nocciola più buona d’Italia, lavorata a mano.',
    storiaParagrafi: [
      'Noccioro nasce nel cuore dei noccioleti dell’Irpinia, a Mercogliano, dove la varietà di nocciola “Mortarella” trova il suo habitat perfetto. Molti produttori industriali usano nocciole di importazione di scarsa qualità, stoccate per anni, per poi mascherarle con oli vegetali di palma, emulsionanti e quantità spropositate di zucchero.',
      'La verità di Noccioro risiede nella tostatura lenta e delicata a bassa temperatura, un processo che preserva e sprigiona gli oli essenziali naturali della nocciola irpina senza bruciarla. Le loro creme spalmabili contengono fino al 55% di nocciole intere, senza l’aggiunta di grassi idrogenati, oli estranei o aromi chimici.',
      'La lavorazione artigianale fa sì che la crema possa presentare una naturale e sottile separazione dell’olio di nocciola in superficie col passare del tempo. Questo non è un difetto di conservazione, ma la prova scientifica che all’interno c’è solo nocciola pura al 100%, senza emulsionanti artificiali che tengono forzatamente unito l’impasto.'
    ],
    dettagli: [
      { etichetta: 'Varietà', valore: 'Nocciola Mortarella Irpina d’altura' },
      { etichetta: 'Tostatura', valore: 'Lenta a bassa temperatura' },
      { etichetta: 'Percentuale nelle creme', valore: 'Fino al 55% di nocciole' },
      { etichetta: 'Il Difetto Certificato', valore: 'Naturale affioramento d’olio in superficie (assenza di emulsionanti)' }
    ],
    immagineUrl: '/images/partner/noccioro.png'
  },
  {
    slug: 'poma-moris',
    nome: 'Poma Moris',
    zona: 'Campania',
    prodotto: 'Conserve di pomodoro',
    descrizione: 'Pomodori selezionati uno per uno, conservati senza addensanti chimici. Il colore onesto e denso è la firma della verità.',
    claim: 'Il rosso del San Marzano. Nient’altro.',
    storiaParagrafi: [
      'Poma Moris coltiva e trasforma pomodori nelle terre campane, seguendo una filosofia di rispetto totale dei cicli naturali. Nel mercato di massa, l’industria raccoglie con le macchine pomodori a maturazione mista (verdi e rossi insieme), correggendo poi l’acidità in stabilimento con acido citrico e addensando passate acquose con fecola.',
      'I pomodori di Poma Moris vengono selezionati e raccolti rigorosamente a mano, scegliendo solo quelli che hanno raggiunto il perfetto grado di maturazione sulla pianta. Vengono invasati entro poche ore dal raccolto con l’aggiunta di sola foglia di basilico fresco.',
      'La densità corposa della loro conserva è dovuta unicamente alla naturale concentrazione del frutto. Ogni vasetto presenta una sfumatura cromatica e una densità leggermente diverse, specchio esatto della terra e del sole ricevuti su quel filare.'
    ],
    dettagli: [
      { etichetta: 'Metodo di raccolta', valore: 'Esclusivamente manuale a maturazione perfetta' },
      { etichetta: 'Acidità', valore: 'Naturale del frutto (senza acido citrico aggiunto)' },
      { etichetta: 'Varietà principali', valore: 'San Marzano DOP, Pomodorino del Piennolo' },
      { etichetta: 'Il Difetto Certificato', valore: 'Lievi variazioni di densità e colore tra lotti di produzione' }
    ],
    immagineUrl: '/images/partner/poma-moris.png'
  },
  {
    slug: 'alici-nettuno',
    nome: 'Alici Nettuno',
    zona: 'Cilento',
    prodotto: 'Alici e prodotti ittici',
    descrizione: 'Dalla pesca al barattolo con il rispetto del mare. Alici sotto sale con il metodo tradizionale, maturazione lenta.',
    claim: 'Il mare del Cilento in ogni filetto.',
    storiaParagrafi: [
      'Alici Nettuno rappresenta l’eccellenza della pesca tradizionale a Marina di Pisciotta, nel cuore del Cilento. Le alici industriali vengono pulite con macchinari chimici, sbiancate e confezionate in oli di semi raffinati dopo pochi giorni di stoccaggio.',
      'La lavorazione di Nettuno segue il metodo storico della menaica: le alici vengono pescate di notte con le antiche reti a maglia selezionata, dissanguate direttamente in mare dai pescatori e messe sotto sale in terzigni di legno di rovere per una maturazione lenta che dura da 6 a 9 mesi.',
      'La carne delle alici mantiene un colore rosa scuro naturale, una consistenza compatta e una sapidità marina equilibrata. L’assenza di sbiancanti chimici e la lavorazione interamente manuale rendono ogni filetto unico nel suo aspetto e ricco di omega-3 naturali.'
    ],
    dettagli: [
      { etichetta: 'Metodo di pesca', valore: 'Rete Menaica tradizionale cilentana' },
      { etichetta: 'Maturazione', valore: 'Da 6 a 9 mesi in terzigni di legno sotto sale' },
      { etichetta: 'Liquido di governo', valore: 'Olio extravergine di oliva locale' },
      { etichetta: 'Il Difetto Certificato', valore: 'Filetti dal colore rosa scuro naturale non decolorati' }
    ],
    immagineUrl: '/images/partner/alici-nettuno.jpg'
  },
  {
    slug: 'tralci-hirpini',
    nome: 'Tralci Hirpini',
    zona: 'Irpinia',
    prodotto: 'Vini e distillati',
    descrizione: 'Vigna per vigna, vendemmia per vendemmia. I vini d’Irpinia raccontano un terroir unico — le eccellenze del Taurasi e dell’Aglianico.',
    claim: 'La forza della terra irpina in bottiglia.',
    storiaParagrafi: [
      'Tralci Hirpini valorizza la spiccata mineralità e l’altitudine dell’Irpinia vinicola. L’enologia industriale fa largo uso di lieviti selezionati in laboratorio, chiarificanti chimici (come bentonite ed enzimi) e solfiti massicci per rendere i vini piatti e identici anno dopo anno.',
      'I vini di Tralci Hirpini nascono esclusivamente da fermentazioni spontanee operate dai lieviti indigeni presenti sulle bucce. Non subiscono chiarifiche spinte o filtrazioni sterili: la stabilizzazione avviene naturalmente sfruttando le basse temperature invernali della cantina.',
      'Questo approccio artigianale può dare origine a un leggero deposito salino o di colore sul fondo della bottiglia. Questo sedimento non è un’impurità, ma il segno tangibile di un vino non castrato dalla chimica, che mantiene viva la sua complessità organolettica.'
    ],
    dettagli: [
      { etichetta: 'Vitigni principali', valore: 'Aglianico, Fiano di Avellino, Greco di Tufo' },
      { etichetta: 'Fermentazione', valore: 'Spontanea con lieviti autoctoni' },
      { etichetta: 'Stabilizzazione', valore: 'Fisica naturale in cantina (non filtrato)' },
      { etichetta: 'Il Difetto Certificato', valore: 'Presenza di sedimenti naturali sul fondo della bottiglia' }
    ],
    immagineUrl: '/images/partner/tralci-hirpini.png'
  },
  {
    slug: 'fattorie-cilentane',
    nome: 'Fattorie Cilentane',
    zona: 'Cilento',
    prodotto: 'Prodotti agricoli bio',
    descrizione: 'Dal cuore del Parco Nazionale del Cilento. Agricoltura biologica certificata, rispetto dei tempi della natura.',
    claim: 'Il Cilento autentico, raccolto con cura.',
    storiaParagrafi: [
      'Le Fattorie Cilentane riuniscono una cooperativa di piccoli coltivatori custodi della biodiversità nel Parco Nazionale del Cilento. La grande distribuzione propone frutta e ortaggi biologici standardizzati, spesso raccolti acerbi e conservati per mesi in atmosfera modificata.',
      'Fattorie Cilentane trasforma la frutta matura entro pochissime ore dalla raccolta. La loro celebre confettura di fichi bianchi del Cilento è cotta a cielo aperto in piccoli calderoni con l’aggiunta di pochissimo zucchero di canna biologico.',
      'La consistenza e il tenore zuccherino della confettura variano di anno in anno in base all’andamento climatico reale della stagione. La presenza visibile di pezzi di fico e semini all’interno garantisce che il frutto non è stato omogeneizzato da frullatori industriali.'
    ],
    dettagli: [
      { etichetta: 'Agricoltura', valore: 'Biologica certificata nel Parco Nazionale del Cilento' },
      { etichetta: 'Contenuto di frutta', valore: 'Minimo 75% di fichi freschi' },
      { etichetta: 'Dolcificanti', valore: 'Solo zucchero di canna biologico in minima quantità' },
      { etichetta: 'Il Difetto Certificato', valore: 'Consistenza disomogenea con polpa a pezzi e semi interi' }
    ],
    immagineUrl: '/images/partner/fattorie-cilentane.png'
  },
  {
    slug: 'salumi-irpini',
    nome: 'Salumi Irpini',
    zona: 'Irpinia',
    prodotto: 'Salumi e insaccati',
    descrizione: 'La tradizione norcineria irpina, con carni selezionate e stagionatura naturale. Sapori che resistono al tempo.',
    claim: 'La norcineria irpina come una volta.',
    storiaParagrafi: [
      'Salumi Irpini conserva l’antica arte della norcineria di montagna tra i boschi dell’Irpinia. Molti insaccati industriali contengono lattosio, destrosio, acqua e nitriti massicci per gonfiare il peso del salume, accorciare la stagionatura a pochi giorni e mantenere un colore rosso vivo artificiale.',
      'Salumi Irpini utilizza esclusivamente tagli nobili di maiali locali alimentati in modo naturale. Le carni sono macinate a grana media, insaccate in budello naturale e legate a mano una ad una. La stagionatura avviene lentamente, sfruttando il microclima fresco dei monti irpini.',
      'La fioritura di muffa nobile grigio-biancastra sulla superficie esterna è naturale e indica la corretta maturazione spontanea del salume. La forma asimmetrica e la legatura con spago testimoniano la fattura interamente manuale di ogni pezzo.'
    ],
    dettagli: [
      { etichetta: 'Carni impiegate', valore: 'Tagli nobili di suini locali selezionati' },
      { etichetta: 'Legatura', valore: 'Manuale con spago alimentare naturale' },
      { etichetta: 'Additivi e allergeni', valore: 'Senza lattosio, glutine o zuccheri aggiunti' },
      { etichetta: 'Il Difetto Certificato', valore: 'Muffa nobile superficiale e asimmetria della legatura a mano' }
    ],
    immagineUrl: '/images/partner/salumi-irpini.png'
  },
  {
    slug: 'verdure-e-dintorni',
    nome: 'Verdure e Dintorni',
    zona: 'Campania',
    prodotto: 'Ortaggi e conserve vegetali',
    descrizione: 'Sott’oli, giardiniere e verdure conservate secondo le ricette della tradizione campana. Senza conservanti industriali.',
    claim: 'L’orto campano in vasetto.',
    storiaParagrafi: [
      'Verdure e Dintorni trasforma il meglio degli ortaggi campani coltivati a pieno campo. I sott’oli industriali utilizzano aceto di scarsa qualità e oli di semi altamente raffinati per sterilizzare e standardizzare verdure preventivamente sbiancate chimicamente.',
      'Qui gli ortaggi vengono lavati a mano, tagliati manualmente in pezzi irregolari e scottati rapidamente in aceto di vino locale. La conservazione avviene in olio extravergine di oliva o in olio di semi di girasole altoleico spremuto a freddo.',
      'Le verdure mantengono la loro consistenza croccante e le loro sfumature cromatiche naturali non uniformi, proprio come quelle preparate tradizionalmente in casa. L’irregolarità delle dimensioni nei vasetti garantisce che non vi è alcun taglio meccanizzato.'
    ],
    dettagli: [
      { etichetta: 'Materie prime', valore: 'Ortaggi campani freschi di stagione' },
      { etichetta: 'Liquido di governo', valore: 'Olio extravergine o girasole spremuto a freddo' },
      { etichetta: 'Trattamento termico', valore: 'Scottatura veloce in aceto (croccantezza viva)' },
      { etichetta: 'Il Difetto Certificato', valore: 'Dimensione e taglio asimmetrico delle verdure fatte a mano' }
    ],
    immagineUrl: '/images/partner/verdure-e-dintorni.png'
  }
];
