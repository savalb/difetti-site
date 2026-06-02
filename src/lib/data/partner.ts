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
  
  // Nuovi campi per copywriting ricco (Direct Response Marketing)
  sottoOcchiello?: string;
  mainHeadline?: string;
  subHeadline?: string;
  introduzioneShock?: {
    titolo: string;
    punti: string[];
    conclusione: string;
  };
  meccanismoUnico?: {
    titolo: string;
    descrizione: string;
    pilastri: { titolo: string; testo: string }[];
  };
  obiezioni?: { domanda: string; risposta: string }[];
  prodottiShowcase?: { nome: string; descrizione: string }[];
  ctaFinale?: string;
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
      'Quelli di Giuseppe sono trecce irregolari, cotte a legna. Alcuni sono più bruniti perché il calore del forno a legna non è un algoritmo costante, ma un elemento vivo che Giuseppe sa domare con l’istinto. Quando spezzi uno di questi taralli, il rumore deve essere un “crack” secco. Se fa “puff” o si sbriciola come polistirolo, non è un tarallo di Giuseppe. La resistenza che oppone al morso è la prova della bollitura, del riposo, della qualità della farina che ho selezionato personalmente insieme a lui.',
    ],
    dettagli: [
      { etichetta: 'Lavorazione', valore: 'Bollitura tradizionale e intreccio a mano' },
      { etichetta: 'Cottura', valore: 'Forno a legna (calore disomogeneo)' },
      { etichetta: 'Ingredienti chiave', valore: 'Farina selezionata, vino bianco irpino, olio extravergine' },
      { etichetta: 'Il Difetto Certificato', valore: 'Trecce asimmetriche con sfumature cromatiche di bruciatura' },
    ],
    immagineUrl: '/images/partner/nonno-giuseppe.png',
    sottoOcchiello: 'LA VERITÀ SUL FORNO A LEGNA E I TARALLI INDUSTRIALI',
    mainHeadline: 'NONNO GIUSEPPE: Il Tarallo Irpino che ha Dichiarato Guerra ai Forni Elettrici a Nastro e al Finto Gusto di Burro',
    subHeadline: 'Perché il 95% dei taralli industriali che trovi al supermercato è fatto con olio di palma raffinato e lieviti chimici (e come Giuseppe continua a bollire e intrecciare a mano ogni singolo tarallo nel suo antico forno irpino).',
    introduzioneShock: {
      titolo: 'Il segreto "secco" dei taralli industriali da aperitivo',
      punti: [
        "L'uso di grassi e lieviti chimici: l'industria impiega olio di palma raffinato, strutto di scarsa qualità o oli di sansa per accelerare la friabilità, a scapito della digeribilità e del gusto.",
        'La cottura a nastro senza bollitura: per ridurre i costi di produzione, i taralli industriali non vengono bolliti prima di essere infornati e vengono cotti in forni elettrici a nastro, risultando asciutti e spugnosi.',
        'La standardizzazione ad estrusione: macchinari automatizzati estrudono e tagliano taralli millimetricamente identici, privi di alveolatura, rendendoli duri come sassi o fragili come gesso.',
      ],
      conclusione: 'Se dopo aver mangiato qualche tarallo avverti una sete insaziabile e pesantezza allo stomaco, ora conosci il vero colpevole: non è il tarallo in sé, ma il processo industriale che lo ha snaturato.'
    },
    meccanismoUnico: {
      titolo: 'Il Disciplinare di Nonno Giuseppe: I 3 Passi Inviolabili della Tradizione',
      descrizione: "Mentre gli altri acquistano farine raffinate all'estero e grassi industriali, Nonno Giuseppe applica un disciplinare rigido basato su tre pilastri inviolabili:",
      pilastri: [
        { titolo: "L'Intreccio Manuale Singolo", testo: "Non usiamo macchine estrusori. Le mani di Giuseppe arrotolano e chiudono ogni tarallo singolarmente, una ad una, creando bolle d'aria interne nell'impasto che lo rendono naturalmente friabile al morso." },
        { titolo: 'La Doppia Cottura (Bollitura Tradizionale)', testo: "I taralli vengono prima bolliti in acqua bollente per pochi secondi. Questo passaggio blocca l'impasto, crea la tipica lucidità e croccantezza esterna, e lo rende altamente digeribile. Un processo faticoso che l'industria ha cancellato per risparmiare tempo e gas." },
        { titolo: 'Il Forno a Legna Vivo', testo: "La cottura avviene su mattoni refrattari all'interno di un forno alimentato con legna di faggio e quercia locale. Il calore disomogeneo e vivo dona sfumature cromatiche e aromi tostati inimitabili." },
      ]
    },
    obiezioni: [
      { domanda: 'Perché alcuni taralli nel sacchetto sono più cotti di altri?', risposta: 'Perché il calore del forno a legna non è costante come quello di un algoritmo. Le sfumature brunite sono la firma del legno e della pietra, la prova che ogni tarallo ha ricevuto una cottura artigianale.' },
      { domanda: 'Cosa rende i taralli così friabili se non usate lieviti chimici?', risposta: "La friabilità deriva dalla bollitura preliminare e dall'uso generoso di olio extravergine d'oliva irpino e vino bianco locale nell'impasto. Il riposo lento fa il resto." },
    ],
    prodottiShowcase: [
      { nome: "Taralli Artigianali all'Olio Extravergine (300g)", descrizione: 'Il classico intramontabile, friabile e profumato, ideale da solo o con salumi.' },
      { nome: 'Taralli al Vino Nero Irpino (300g)', descrizione: 'Un accostamento unico con il vino Aglianico della zona, dal colore violaceo e sapore intenso.' },
      { nome: 'Taralli al Finocchietto Selvatico (300g)', descrizione: "Arricchiti con semi di finocchietto selvatico raccolti a mano sui monti dell'Irpinia." },
    ],
    ctaFinale: 'Richiedi la Campionatura di Taralli Nonno Giuseppe'
  },
  {
    slug: 'noccioro',
    nome: 'Noccioro',
    zona: 'Irpinia',
    prodotto: 'Nocciole e creme',
    descrizione: 'Dove la nocciola irpina diventa crema. Tostatura artigianale a bassa temperatura, senza additivi. Il profumo è già una garanzia.',
    claim: 'La nocciola più buona d’Italia, lavorata a mano.',
    storiaParagrafi: [
      'Noccioro nasce nel cuore dei noccioleti dell’Irpinia, a Avella, dove la varietà di nocciola “Mortarella” trova il suo habitat perfetto. Molti produttori industriali usano nocciole di importazione di scarsa qualità, stoccate per anni, per poi mascherarle con oli vegetali di palma, emulsionanti e quantità spropositate di zucchero.',
      'La verità di Noccioro risiede nella tostatura lenta e delicata a bassa temperatura, un processo che preserva e sprigiona gli oli essenziali naturali della nocciola irpina senza bruciarla. Le loro creme spalmabili contengono fino al 45% di nocciole intere, senza l’aggiunta di grassi idrogenati, oli estranei o aromi chimici.',
      'La lavorazione artigianale fa sì che la crema possa presentare una naturale e sottile separazione dell’olio di nocciola in superficie col passare del tempo. Questo non è un difetto di conservazione, ma la prova scientifica che all’interno c’è solo nocciola pura al 100%, senza emulsionanti artificiali che tengono forzatamente unito l’impasto.',
    ],
    dettagli: [
      { etichetta: 'Varietà', valore: 'Nocciola Mortarella Irpina d’altura' },
      { etichetta: 'Tostatura', valore: 'Lenta a bassa temperatura' },
      { etichetta: 'Percentuale nelle creme', valore: 'Fino al 45% di nocciole' },
      { etichetta: 'Il Difetto Certificato', valore: 'Naturale affioramento d’olio in superficie (assenza di emulsionanti)' },
    ],
    immagineUrl: '/images/partner/noccioro.png',
    sottoOcchiello: 'IL SEGRETO SPORCO DELLE CREME SPALMABILI INDUSTRIALI',
    mainHeadline: 'Perché quello che spalmi sul pane ogni mattina è un inganno per il tuo palato (e come una dinastia di agricoltori di Avella ha deciso di farti scoprire il vero sapore della nocciola).',
    subHeadline: "Scopri Noccioro 45, l'unica crema prodotta in filiera chiusa con il 45% di nocciola d'Avella puro e zero oli aggiunti.",
    introduzioneShock: {
      titolo: 'Cosa trovi al primo posto negli ingredienti industriali? Zucchero.',
      punti: [
        'Zucchero al primo posto: seguito da oli vegetali (di palma o di girasole di bassa qualità). Le nocciole sono spesso confinate a un ridicolo 13%.',
        "Mix ultra-raffinato: l'87% del vasetto che offri ai tuoi figli è olio zuccherato corretto con vanillina chimica e aromi industriali.",
        "Sacrificio della materia prima: sull'altare del massimo profitto e della conservazione eterna sugli scaffali dei supermercati.",
      ],
      conclusione: "Ma per fortuna, nel cuore dell'Irpinia, c'è chi ha deciso di dichiarare guerra a questo compromesso al ribasso, rimettendo la nocciola al centro dell'universo."
    },
    meccanismoUnico: {
      titolo: 'La Rivoluzione di Noccioro: Una Filiera Chiusa nel Tempio della Nocciola',
      descrizione: 'A Avella, culla storica del nocciolo (chiamato scientificamente Corylus Avellana), la famiglia Maietta gestisce una filiera chiusa basata su pilastri inviolabili:',
      pilastri: [
        { titolo: '100 Ettari di Proprietà', testo: "Ogni singola nocciola nasce, cresce e matura nei terreni dell'azienda agricola a Avella, controllata direttamente." },
        { titolo: 'Selezione Maniacale', testo: 'Le nocciole vengono raccolte e selezionate una ad una a mano. Solo quelle perfette superano il taglio rigido per la tostatura.' },
        { titolo: 'Laboratorio Interno di Trasformazione', testo: "Nessun passaggio esterno. Dalla raccolta alla tostatura lenta a bassa temperatura, fino alla macinatura e all'invasamento, tutto avviene in sede." },
      ]
    },
    obiezioni: [
      { domanda: 'Perché la crema spalmabile presenta a volte olio in superficie?', risposta: "La consistenza liscia e vellutata di Noccioro 45 è ottenuta unicamente grazie agli oli naturali rilasciati dalle nocciole durante la lenta macinatura. L'affioramento è la prova dell'assenza di emulsionanti artificiali." },
      { domanda: 'Perché usate solo 4 ingredienti?', risposta: 'Perché non abbiamo nulla da nascondere. Nocciole (45%), zucchero, latte intero in polvere e cacao magro. Senza additivi, grassi estranei o vanillina chimica.' },
    ],
    prodottiShowcase: [
      { nome: 'Noccioro 45 Classic', descrizione: 'Il perfetto equilibrio tra nocciola (45%) e cacao, per chi cerca il gusto tradizionale elevato alla massima potenza artigianale.' },
      { nome: 'Noccioro 45 Dark', descrizione: 'Crema intensa, senza lattosio, dove il cacao amaro sposa la dolcezza naturale della nocciola di Avella.' },
      { nome: 'Noccioro 45 White', descrizione: 'La Nocciolata Bianca. Senza cacao, per chi vuole godersi al 100% la delicatezza e il sapore puro della nocciola in purezza.' },
      { nome: 'Noccioro Havana', descrizione: "L'audacia dell'innovazione. Crema spalmabile leggermente alcolica (3,9% Vol.) arricchita con Rhum pregiato." },
    ],
    ctaFinale: 'Richiedi la Campionatura di Noccioro per la tua Attività'
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
      'La densità corposa della loro conserva è dovuta unicamente alla naturale concentrazione del frutto. Ogni vasetto presenta una sfumatura cromatica e una densità leggermente diverse, specchio esatto della terra e del sole ricevuti su quel filare.',
    ],
    dettagli: [
      { etichetta: 'Metodo di raccolta', valore: 'Esclusivamente manuale a maturazione perfetta' },
      { etichetta: 'Acidità', valore: 'Naturale del frutto (senza acido citrico aggiunto)' },
      { etichetta: 'Varietà principali', valore: 'San Marzano DOP, Pomodorino del Piennolo' },
      { etichetta: 'Il Difetto Certificato', valore: 'Lievi variazioni di densità e colore tra lotti di produzione' },
    ],
    immagineUrl: '/images/partner/poma-moris.png',
    sottoOcchiello: 'LA VERITÀ SCOMODA SULLE PASSATE DI POMODORO',
    mainHeadline: "POMAMORIS: Il Pomodoro Campano che ha Dichiarato Guerra all'Acido e all'Industrializzazione del Gusto",
    subHeadline: 'Perché il 99% delle passate che trovi al supermercato è "corretto" con lo zucchero (e come i fratelli Sellitto hanno salvato il vero oro rosso di Mercato San Severino senza scendere a compromessi con la grande distribuzione)',
    introduzioneShock: {
      titolo: 'I 3 "Difetti" Nascosti del Pomodoro Industriale (Che nessuno ti rivelerà mai)',
      punti: [
        'La Raccolta Meccanica Violenta: Le macchine industriali strappano i pomodori dalle piante senza distinguere quelli maturi da quelli acerbi o marci. Tutto finisce nello stesso calderone.',
        'Lo Stress Termico e di Pressione: Per pelare e passare tonnellate di pomodori in pochi minuti, la polpa viene sottoposta a shock termici e lavaggi ad alta pressione che spappolano la struttura cellulare del frutto.',
        'La "Correzione" Chimica: Per mascherare l\'acidità e la mancanza di sapore dei pomodori acerbi, i produttori industriali utilizzano correttori di acidità artificiali o zucchero aggiunto.',
      ],
      conclusione: 'Se hai spesso bruciore di stomaco dopo aver mangiato un piatto di spaghetti al pomodoro, ora conosci il vero colpevole: non è il pomodoro in sé, ma il processo industriale che lo ha violentato.'
    },
    meccanismoUnico: {
      titolo: "Il Protocollo Pomamoris: Come eliminiamo i difetti dell'industria per darti un'esperienza sensoriale indimenticabile",
      descrizione: 'A Mercato San Severino, in provincia di Salerno, i fratelli Eustachio e Vito Sellitto hanno fondato Pomamoris basandosi su tre pilastri inviolabili:',
      pilastri: [
        { titolo: 'Il Controllo Totale "Dal Seme al Vasetto"', testo: "Collaboriamo direttamente con agronomi ed esperti sementieri per monitorare la crescita. Selezioniamo solo varietà storiche e pregiate, come l'Antico Pomodoro (Varietà 20 Smec), un ecotipo del San Marzano." },
        { titolo: 'La Lavorazione Completamente Manuale', testo: "I pomodori vengono raccolti esclusivamente a mano. La lavorazione avviene a freddo, senza macchine distruttive. Vengono pelati o tagliati a filetti a mano, preservando l'integrità della polpa." },
        { titolo: "L'Estetica d'Autore", testo: 'Le nostre etichette sono nate dalla collaborazione con giovani e promettenti artisti italiani. Ogni vasetto Pomamoris è un elemento di design da esporre in cucina.' },
      ]
    },
    obiezioni: [
      { domanda: 'Perché le vostre passate non contengono acido citrico?', risposta: "Perché i nostri pomodori sono raccolti a mano solo a maturazione perfetta sotto il sole. La dolcezza e l'acidità sono quelle naturali del frutto integro, senza bisogno di correzioni chimiche." },
      { domanda: 'Perché ci sono lievi variazioni di densità tra i lotti?', risposta: "Perché non usiamo addensanti o fecole. Ogni lotto riflette l'andamento climatico reale, il sole e la terra ricevuti su quel filare specifico." },
    ],
    prodottiShowcase: [
      { nome: "L'Antico (Passata di Antico Pomodoro 20 Smec)", descrizione: 'Densissima, vellutata, dal sapore antico che non richiede alcuna correzione. Perfetta per la pizza o per il sugo della domenica.' },
      { nome: 'Pomodoro Pelato Kiros "Nonno Vito"', descrizione: 'Raccolto a mano e invasato intero. Quando apri il vasetto, senti il profumo del campo appena raccolto.' },
      { nome: "Pomodorino Datterino e Ciliegina all'Acqua", descrizione: 'Conservati integri nel loro liquido di governo naturale per mantenere intatta la freschezza e la consistenza.' },
    ],
    ctaFinale: 'Scopri il Kit Esperienza Pomamoris'
  },
  {
    slug: 'alici-nettuno',
    nome: 'Alici Nettuno',
    zona: 'Golfo di Salerno',
    prodotto: 'Alici e prodotti ittici',
    descrizione: 'Dalla pesca al barattolo con il rispetto del mare. Alici sotto sale con il metodo tradizionale, maturazione lenta.',
    claim: 'Il mare del Golfo di Salerno in ogni filetto.',
    storiaParagrafi: [
      'Alici Nettuno rappresenta l’eccellenza della pesca tradizionale a Cetara, nel cuore della Costiera Amalfitana. Le alici industriali vengono pulite con macchinari chimici, sbiancate e confezionate in oli di semi raffinati dopo pochi giorni di stoccaggio.',
      'La lavorazione di Nettuno segue il metodo storico della menaica o del cianciolo: le alici vengono pescate nel Golfo di Salerno, decapitate ed eviscerate una ad una, a mano, e messe sotto sale in terzigni di legno di rovere per una maturazione lenta che dura fino a 24 mesi.',
      'La carne delle alici mantiene un colore rosa scuro naturale, una consistenza compatta e una sapidità marina equilibrata. L’assenza di sbiancanti chimici e la lavorazione interamente manuale rendono ogni filetto unico nel suo aspetto e ricco di omega-3 naturali.',
    ],
    dettagli: [
      { etichetta: 'Metodo di pesca', valore: 'Menaica e cianciolo tradizionale del Golfo' },
      { etichetta: 'Maturazione', valore: 'Fino a 24 mesi in terzigni di legno sotto sale' },
      { etichetta: 'Liquido di governo', valore: 'Olio extravergine di oliva locale' },
      { etichetta: 'Il Difetto Certificato', valore: 'Filetti dal colore rosa scuro naturale non decolorati' },
    ],
    immagineUrl: '/images/partner/alici-nettuno.jpg',
    sottoOcchiello: 'LA VERITÀ SCOMODA SULLE ALICI SOTTO SALE E LA COLATURA DI ALICI',
    mainHeadline: 'Il 90% delle alici che compri al supermercato è "fango salato" importato dall\'estero.',
    subHeadline: "Ecco come due fratelli a Cetara difendono l'antica ricetta del 1950 (e l'oro liquido della Costiera Amalfitana)",
    introduzioneShock: {
      titolo: "Il segreto che l'industria delle conserve ittiche ti nasconde dietro etichette ingannevoli",
      punti: [
        'Pesce spugnoso e senza consistenza: che si sfalda non appena provi a prenderlo con una forchetta.',
        'Sapore monodimensionale di sale puro: utilizzato per coprire la mancanza di freschezza della materia prima.',
        'Provenienza misteriosa: alici pescate negli oceani caldi del Sud America, congelate su navi fattoria, trasportate per migliaia di chilometri.',
      ],
      conclusione: 'Questa non è tradizione marinara. Questo è un processo industriale progettato per massimizzare i profitti dei giganti del cibo, abbattendo i tempi di maturazione attraverso acceleratori chimici.'
    },
    meccanismoUnico: {
      titolo: 'Il Metodo Nettuno 1950: Perché le alici e la colatura Nettuno sono strutturalmente diverse?',
      descrizione: "Il segreto dell'autorità di Nettuno risiede in un protocollo di lavorazione rigido, immutato da oltre settant'anni, che si basa su 4 pilastri inscindibili:",
      pilastri: [
        { titolo: 'Solo Pescato Locale del Golfo di Salerno', testo: 'Le alici di Nettuno non viaggiano su navi congelatrici per mesi. Vengono pescate nel Golfo di Salerno con i metodi tradizionali del cianciolo e della lampara.' },
        { titolo: 'La "Scapatura" Rigorosamente a Mano', testo: 'Nessuna macchina tocca il pesce. Le alici vengono decapitate ed eviscerate una ad una, a mano, da artigiani esperti che sanno esattamente quanta pressione esercitare.' },
        { titolo: 'Il "Tompagno" e la Pressatura Tradizionale', testo: 'Il pesce viene disposto a strati alterni con sale marino. Sopra viene posizionato un disco di legno (il tompagno) sul quale vengono collocati dei pesi in pietra per una maturazione uniforme di 6 mesi.' },
        { titolo: 'La Colatura DOP: 24 Mesi di Attesa nei "Terzigni"', testo: 'Nettuno fa maturare la sua Colatura per almeno 2 anni nei legni storici. Il risultato è un liquido limpido, ambrato scuro e dal sapore marino persistente.' },
      ]
    },
    obiezioni: [
      { domanda: 'Perché i prodotti Nettuno costano più di quelli del supermercato?', risposta: 'Perché la produzione è strettamente limitata e legata al pescato del giorno del Golfo di Salerno, senza pesce congelato estero di scarto, con ore di lavoro manuale e anni di attesa.' },
      { domanda: 'La colatura è troppo forte come sapore?', risposta: 'La vera Colatura di Alici DOP maturata in legno per 24 mesi ha una sapidità nobile, profonda e rotonda, non ha il sapore pescioso fastidioso dei prodotti industriali. Va usata a crudo, goccia a goccia.' },
    ],
    prodottiShowcase: [
      { nome: 'Colatura di Alici di Cetara DOP - Maturata 24 Mesi (100ml)', descrizione: "L'essenza del Garum romano, spillata goccia a goccia dai terzigni di legno." },
      { nome: "Filetti di Alici di Cetara Sott'olio (200g / 500g)", descrizione: 'Lavorate a mano freschissime, polpa soda e intatta, conservate in puro olio.' },
      { nome: 'Alici Sotto Sale di Cetara (Barattolo Tradizionale)', descrizione: 'Per i veri puristi che vogliono dissalare e sfilettare a casa il pesce, riscoprendo la consistenza originale.' },
    ],
    ctaFinale: 'Voglio Assaporare la Vera Cetara'
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
      'Questo approccio artigianale può dare origine a un leggero deposito salino o di colore sul fondo della bottiglia. Questo sedimento non è un’impurità, ma il segno tangibile di un vino non castrato dalla chimica, che mantiene viva la sua complessità organolettica.',
    ],
    dettagli: [
      { etichetta: 'Vitigni principali', valore: 'Aglianico, Fiano di Avellino, Greco di Tufo' },
      { etichetta: 'Fermentazione', valore: 'Spontanea con lieviti autoctoni' },
      { etichetta: 'Stabilizzazione', valore: 'Fisica naturale in cantina (non filtrato)' },
      { etichetta: 'Il Difetto Certificato', valore: 'Presenza di sedimenti naturali sul fondo della bottiglia' },
    ],
    immagineUrl: '/images/partner/tralci-hirpini.png',
    sottoOcchiello: 'LA VERITÀ SCIENTIFICA SUL VINO INDUSTRIALE CHIMICO',
    mainHeadline: 'TRALCI HIRPINI: Il Vigneto Irpino che ha Dichiarato Guerra ai Lieviti Industriali e ai Vini Corretti in Cantina',
    subHeadline: 'Perché la maggior parte dei vini da supermercato contiene fino a 40 additivi chimici consentiti dalla legge (e come i nostri viticoltori difendono la fermentazione spontanea e i solfiti ridotti per darti un vino vivo).',
    introduzioneShock: {
      titolo: 'La bugia del "vino del contadino" venduto in cartone',
      punti: [
        'Lieviti selezionati in laboratorio: per dare aromi artificiali standardizzati (es. banana, pesca artificiale) e nascondere la scarsa qualità delle uve.',
        "La chiarifica spinta e la filtrazione sterile: l'uso di bentonite, albumina e gelatine chimiche che castrano il vino privandolo del suo corpo e del suo potenziale di invecchiamento.",
        'Solfiti massicci: usati per bloccare qualsiasi attività batterica e rendere il vino stabile per anni in scaffali caldi, causando il classico mal di testa del giorno dopo.',
      ],
      conclusione: "Il mal di testa non è causato dall'alcol in sé, ma dalla chimica correttiva e dai solfiti eccessivi utilizzati per standardizzare il gusto."
    },
    meccanismoUnico: {
      titolo: 'Il Protocollo Tralci Hirpini: Il Rispetto Totale della Terra e della Vite',
      descrizione: "Nei nostri vigneti ad Avellino, la natura fa il suo corso senza forzature, basando l'eccellenza su tre pilastri:",
      pilastri: [
        { titolo: 'Fermentazione Spontanea e Lieviti Autoctoni', testo: "Non aggiungiamo lieviti chimici. La fermentazione parte grazie ai lieviti indigeni naturalmente presenti sulle bucce dell'uva." },
        { titolo: 'Stabilizzazione Fisica e Freddo Naturale', testo: 'Sfruttiamo le rigide temperature invernali delle nostre cantine irpine per stabilizzare il vino naturalmente, evitando chiarificanti chimici o micro-filtrazioni.' },
        { titolo: 'Minimo Utilizzo di Solfiti', testo: 'Il livello di solfiti nei nostri vini è inferiore del 70% rispetto al limite legale europeo per i vini biologici.' },
      ]
    },
    obiezioni: [
      { domanda: 'Perché sul fondo della bottiglia si può trovare un leggero deposito?', risposta: 'Questo deposito (tartrati o pigmenti) è la prova che il vino non è stato sottoposto a filtrazioni aggressive o trattamenti termici estremi. È il segno di un vino vivo ed integro.' },
      { domanda: "Il vino senza lieviti selezionati può cambiare da un anno all'altro?", risposta: "Assolutamente sì. Il nostro vino racconta la pioggia, il sole e il vento di quell'anno specifico. Se vuoi un sapore identico all'infinito, devi rivolgerti all'industria chimica." },
    ],
    prodottiShowcase: [
      { nome: "Fiano di Avellino DOCG - Riserva d'Altura (750ml)", descrizione: 'Elegante, minerale, con note di nocciola tostata e miele di castagno.' },
      { nome: "Taurasi DOCG - L'Orgoglio Irpino (750ml)", descrizione: 'Rosso maestoso, affinato in botti di rovere, ricco di tannini nobili e profumi di frutti rossi.' },
      { nome: 'Gin Sintony - Distillato Campano Erboristico (700ml)', descrizione: 'Gin botanico artigianale prodotto con erbe spontanee della macchia cilentana.' },
    ],
    ctaFinale: 'Richiedi il Listino Vini Tralci Hirpini per il tuo Locale'
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
      'La consistenza e il tenore zuccherino della confettura variano di anno in anno in base all’andamento climatico reale della stagione. La presenza visibile di pezzi di fico e semini all’interno garantisce che il frutto non è stato omogeneizzato da frullatori industriali.',
    ],
    dettagli: [
      { etichetta: 'Agricoltura', valore: 'Biologica certificata nel Parco Nazionale del Cilento' },
      { etichetta: 'Contenuto di frutta', valore: 'Minimo 75% di fichi freschi' },
      { etichetta: 'Dolcificanti', valore: 'Solo zucchero di canna biologico in minima quantità' },
      { etichetta: 'Il Difetto Certificato', valore: 'Consistenza disomogenea con polpa a pezzi e semi interi' },
    ],
    immagineUrl: '/images/partner/fattorie-cilentane.png',
    sottoOcchiello: 'LA VERITÀ SULLE CONFETTURE INDUSTRIALI E IL FINTO BIO',
    mainHeadline: 'FATTORIE CILENTANE: Il Frutteto del Cilento che ha Dichiarato Guerra alle Gelatine di Frutta e alle Confetture di Zucchero',
    subHeadline: 'Perché il 90% delle confetture commerciali è composto da gelatina industriale, acido citrico e frutta di scarto bollita ad altissima pressione (e come i nostri contadini cuociono a cielo aperto solo frutta biologica al 75%).',
    introduzioneShock: {
      titolo: 'La truffa dello zucchero spacciato per frutta',
      punti: [
        'Scarsa percentuale di frutta reale: la legge consente di chiamare "confettura" prodotti con appena il 35% di frutta, compensando il resto con sciroppo di glucosio e zucchero.',
        'Pectina e gelificanti chimici: estratti industriali usati per addensare passate acquose in pochi minuti, dando una consistenza gelatinosa e gommosa.',
        'Bollitura industriale sottovuoto: i frutti vengono cotti a temperature estreme in enormi autoclavi che distruggono il sapore originale e i nutrienti.',
      ],
      conclusione: 'Una confettura che si spalma come una gelatina lucida e trasparente non è frutta: è gelatina industriale colorata e zuccherata.'
    },
    meccanismoUnico: {
      titolo: 'Il Protocollo Fattorie Cilentane: Il Ritorno alla Cottura Lenta',
      descrizione: 'Coltiviamo la nostra frutta nel Parco Nazionale del Cilento senza pesticidi chimici, trasformandola secondo la tradizione:',
      pilastri: [
        { titolo: 'Minimo 75% di Frutta Fresca', testo: 'Usiamo solo frutta intera giunta a perfetta maturazione sulla pianta. Ogni vasetto contiene quasi esclusivamente frutta biologica.' },
        { titolo: 'Cottura Lenta a Cielo Aperto', testo: "Cuociamo in piccoli calderoni aperti, permettendo all'acqua di evaporare naturalmente senza l'ausilio di addensanti. Questo preserva i pezzi di frutta interi." },
        { titolo: 'Solo Zucchero di Canna Biologico', testo: 'Usiamo quantità minime di zucchero biologico, solo quanto basta per la corretta conservazione naturale, senza sciroppi industriali.' },
      ]
    },
    obiezioni: [
      { domanda: 'Perché la confettura è meno densa e presenta pezzi interi?', risposta: "La consistenza non gelatinosa è dovuta alla totale assenza di pectina aggiunta. I pezzi di frutta all'interno dimostrano che il frutto è stato tagliato a mano e cotto intero." },
      { domanda: 'Perché il colore della confettura non è arancione fluo?', risposta: 'La frutta vera, cotta lentamente, si scurisce naturalmente caramellando lo zucchero naturale. I colori fluo industriali derivano da coloranti chimici o acidi.' },
    ],
    prodottiShowcase: [
      { nome: 'Confettura Extra di Fico Bianco del Cilento DOP (320g)', descrizione: 'Dolcezza naturale unica, ricca di polpa e semini interi, perfetta con i formaggi.' },
      { nome: 'Confettura di Albicocche Pellecchiella del Vesuvio (320g)', descrizione: 'Albicocche storiche campane, dal sapore intenso e profumatissimo.' },
      { nome: "Confettura di Castagne dell'Irpinia (320g)", descrizione: 'Crema densa di castagne locali, una specialità autunnale ricca e golosa.' },
    ],
    ctaFinale: 'Richiedi la Campionatura Confetture Fattorie Cilentane'
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
      'La fioritura di muffa nobile grigio-biancastra sulla superficie esterna è naturale e indica la corretta maturazione spontanea del salume. La forma asimmetrica e la legatura con spago testimoniano la fattura interamente manuale di ogni pezzo.',
    ],
    dettagli: [
      { etichetta: 'Carni impiegate', valore: 'Tagli nobili di suini locali selezionati' },
      { etichetta: 'Legatura', valore: 'Manuale con spago alimentare naturale' },
      { etichetta: 'Additivi e allergeni', valore: 'Senza lattosio, glutine o zuccheri aggiunti' },
      { etichetta: 'Il Difetto Certificato', valore: 'Muffa nobile superficiale e asimmetria della legatura a mano' },
    ],
    immagineUrl: '/images/partner/salumi-irpini.png',
    sottoOcchiello: 'LA VERITÀ TOSSICA SULLA SALUMERIA INDUSTRIALE RAPIDA',
    mainHeadline: 'SALUMI IRPINI: La Norcineria di Montagna che ha Dichiarato Guerra a Lattosio, Glutammato e Nitriti Massicci',
    subHeadline: "Perché il 99% dei salumi industriali contiene lattosio e acqua per gonfiare il peso e nitriti artificiali per forzare una stagionatura di pochi giorni (e come noi stagioniamo all'aria dei monti irpini solo carne nobile legata a mano).",
    introduzioneShock: {
      titolo: 'Il segreto "chimico" del salame sempre rosso e umido',
      punti: [
        "Lattosio, destrosio e additivi: utilizzati come leganti chimici e nutrienti per batteri industriali, per far trattenere l'acqua alla carne e gonfiare artificialmente il peso.",
        'Stagionatura lampo in cella: i salumi vengono asciugati in pochi giorni in camere climatizzate forzate, bloccando lo sviluppo dei profumi.',
        'Nitriti e nitrati massicci: conservanti chimici usati per evitare lo sviluppo di batteri dovuti a scarsa igiene e mantenere un colore rosso vivo artificiale.',
      ],
      conclusione: 'Se un salume affettato ha un colore rosso fluo uniforme e una consistenza gommosa, stai mangiando chimica da laboratorio, non carne stagionata.'
    },
    meccanismoUnico: {
      titolo: 'Il Protocollo Norcino Irpino: I 3 Pilastri del Salume Puro',
      descrizione: 'Nel nostro laboratorio di montagna, la norcineria segue un rituale secolare che esclude qualsiasi scorciatoia chimica:',
      pilastri: [
        { titolo: 'Solo Carni Nobili Locali', testo: 'Selezioniamo solo suini pesanti cresciuti in Campania, lavorando esclusivamente tagli pregiati come spalla, prosciutto e lardo nobile.' },
        { titolo: 'Legatura Manuale con Spago', testo: 'Ogni insaccato è legato a mano con spago naturale in budello vero. Non usiamo budelli sintetici di plastica o collagene.' },
        { titolo: "Stagionatura Naturale all'Aria di Montagna", testo: 'I nostri salumi stagionano sfruttando il microclima fresco dei boschi irpini, sviluppando lentamente la caratteristica fioritura di muffa nobile grigia.' },
      ]
    },
    obiezioni: [
      { domanda: 'La muffa bianca e grigia sulla pelle del salame è pericolosa?', risposta: 'Al contrario! Quella muffa è "nobile" ed è la prova scientifica di una stagionatura lenta e naturale. Protegge il salume dai batteri nocivi e ne esalta il sapore.' },
      { domanda: 'Perché il salame tagliato a mano si scurisce rapidamente?', risposta: 'Perché non usiamo nitriti artificiali o antiossidanti chimici che mantengono il colore artificialmente. È la naturale ossidazione della carne vera.' },
    ],
    prodottiShowcase: [
      { nome: 'Soppressata Irpina Tradizionale (400g)', descrizione: 'Tagliata a punta di coltello con grasso nobile a dadini, aromatizzata con pepe nero.' },
      { nome: 'Salame Irpino a Grana Media (400g)', descrizione: "Il salame della tradizione, compatto, saporito, stagionato all'aria per 60 giorni." },
      { nome: 'Capocollo Irpino Stagionato in Grotta (500g)', descrizione: 'Coppa di maiale massaggiata con spezie locali e stagionata lentamente in grotte di tufo.' },
    ],
    ctaFinale: 'Richiedi la Campionatura Salumi Irpini per il tuo Ristorante'
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
      'Le verdure mantengono la loro consistenza croccante e le loro sfumature cromatiche naturali non uniformi, proprio come quelle preparate tradizionalmente in casa. L’irregolarità delle dimensioni nei vasetti garantisce che non vi è alcun taglio meccanizzato.',
    ],
    dettagli: [
      { etichetta: 'Materie prime', valore: 'Ortaggi campani freschi di stagione' },
      { etichetta: 'Liquido di governo', valore: 'Olio extravergine o girasole spremuto a freddo' },
      { etichetta: 'Trattamento termico', valore: 'Scottatura veloce in aceto (croccantezza viva)' },
      { etichetta: 'Il Difetto Certificato', valore: 'Dimensione e taglio asimmetrico delle verdure fatte a mano' },
    ],
    immagineUrl: '/images/partner/verdure-e-dintorni.png',
    sottoOcchiello: "LA VERITÀ SULLE VERDURE SBIANCATE E I SOTT'OLI CON ACIDO",
    mainHeadline: "VERDURE E DINTORNI: L'Orto Campano Sott'olio che ha Dichiarato Guerra all'Acido Citrico e al Taglio Industriale",
    subHeadline: "Perché il 95% delle verdure sott'olio al supermercato è sbiancato con cloro chimico e conservato in oli di semi raffinati ad alta temperatura (e come noi laviamo e tagliamo a mano verdure fresche campane in olio spremuto a freddo).",
    introduzioneShock: {
      titolo: 'Il segreto "lucido" del sott\'olio industriale',
      punti: [
        'Sbiancatura chimica delle verdure: per rendere le verdure uniformemente bianche o lucide (decolorate con biossido di zolfo o acido ascorbico di sintesi).',
        "L'uso di aceto scadente e acido citrico: per acidificare rapidamente la verdura a freddo e mascherare la scarsa qualità della materia prima.",
        'Olio di semi raffinato chimicamente: oli estratti con solventi chimici (esano) che ungono la bocca senza apportare alcun sapore o nutrimento.',
      ],
      conclusione: "Una verdura sott'olio industriale che risulta spugnosa, acida da bruciare la gola e immersa in un olio trasparente e inodore è un prodotto morto chimicamente."
    },
    meccanismoUnico: {
      titolo: 'Il Protocollo Verdure e Dintorni: Il Gusto Croccante della Verità',
      descrizione: 'Nel nostro laboratorio in Campania, trasformiamo gli ortaggi di stagione freschissimi secondo la ricetta delle nostre nonne:',
      pilastri: [
        { titolo: 'Lavaggio e Taglio Rigorosamente Manuale', testo: 'Le verdure vengono mondate e tagliate a mano in pezzi irregolari. Questo preserva la fibra vegetale e garantisce la croccantezza al morso.' },
        { titolo: 'Scottatura Rapida in Aceto di Vino Locale', testo: 'Gli ortaggi vengono scottati per pochissimi minuti in una miscela di acqua e aceto di vino campano. Nessun uso di acido citrico o ascorbico artificiale.' },
        { titolo: 'Olio di governo Selezione', testo: 'Conserviamo le nostre verdure solo in olio extravergine di oliva o in olio di girasole altoleico spremuto a freddo di produzione locale.' },
      ]
    },
    obiezioni: [
      { domanda: 'Perché le verdure presentano forme e colori diversi nel vasetto?', risposta: 'Perché sono tagliate a mano una per una e non decolorate chimicamente. La variazione cromatica è la garanzia che la verdura ha mantenuto i suoi pigmenti naturali.' },
      { domanda: "L'olio di girasole spremuto a freddo è di qualità?", risposta: "Sì, se spremuto a freddo. Lo usiamo per verdure delicate per non coprire il loro sapore naturale con il gusto forte dell'olio extravergine." },
    ],
    prodottiShowcase: [
      { nome: 'Giardiniera Campana Artigianale in Agrodolce (580g)', descrizione: 'Carote, sedano, cavolfiori e peperoni freschi tagliati a mano, croccantissimi.' },
      { nome: "Melanzane Irpine a Filetti Sott'olio (580g)", descrizione: 'Melanzane locali lavorate a crudo sotto sale, strizzate a mano e condite.' },
      { nome: 'Carciofini Interi Spaccati in Olio Extravergine (580g)', descrizione: 'Carciofini campani privati delle foglie dure a mano, cotti in aceto e conservati.' },
    ],
    ctaFinale: 'Richiedi il Listino Verdure e Dintorni per la tua Attività'
  }
];
