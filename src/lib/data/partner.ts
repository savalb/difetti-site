// ─── Dati Partner (dal preventivo strategico) ─────────────────
export type Partner = {
  slug: string;
  nome: string;
  zona: string;
  prodotto: string;
  descrizione: string;
  claim: string;
};

export const PARTNER: Partner[] = [
  {
    slug: 'noccioro',
    nome: 'Noccioro',
    zona: 'Irpinia',
    prodotto: 'Nocciole e creme',
    descrizione: 'Dove la nocciola irpina diventa crema. Tostatura artigianale a bassa temperatura, senza additivi. Il profumo è già una garanzia.',
    claim: 'La nocciola più buona d\'Italia, lavorata a mano.',
  },
  {
    slug: 'poma-moris',
    nome: 'Poma Moris',
    zona: 'Campania',
    prodotto: 'Conserve di pomodoro',
    descrizione: 'Pomodori selezionati uno per uno, conservati senza addensanti chimici. Il colore onesto e denso è la firma della verità.',
    claim: 'Il rosso del San Marzano. Nient\'altro.',
  },
  {
    slug: 'alici-nettuno',
    nome: 'Alici Nettuno',
    zona: 'Cilento',
    prodotto: 'Alici e prodotti ittici',
    descrizione: 'Dalla pesca al barattolo con il rispetto del mare. Alici sotto sale con il metodo tradizionale, maturazione lenta.',
    claim: 'Il mare del Cilento in ogni filetto.',
  },
  {
    slug: 'nonno-giuseppe',
    nome: 'Nonno Giuseppe',
    zona: 'Irpinia',
    prodotto: 'Taralli artigianali',
    descrizione: 'L\'intreccio manuale di Giuseppe. Non troverai mai due taralli identici nel sacchetto. Il forno a legna non è un algoritmo — è un elemento vivo.',
    claim: 'Ogni tarallo porta il segno delle sue mani.',
  },
  {
    slug: 'tralci-hirpini',
    nome: 'Tralci Hirpini',
    zona: 'Irpinia',
    prodotto: 'Vini e distillati',
    descrizione: 'Vigna per vigna, vendemmia per vendemmia. I vini d\'Irpinia raccontano un terroir unico — le eccellenze del Taurasi e dell\'Aglianico.',
    claim: 'La forza della terra irpina in bottiglia.',
  },
  {
    slug: 'fattorie-cilentane',
    nome: 'Fattorie Cilentane',
    zona: 'Cilento',
    prodotto: 'Prodotti agricoli bio',
    descrizione: 'Dal cuore del Parco Nazionale del Cilento. Agricoltura biologica certificata, rispetto dei tempi della natura.',
    claim: 'Il Cilento autentico, raccolto con cura.',
  },
  {
    slug: 'salumi-irpini',
    nome: 'Salumi Irpini',
    zona: 'Irpinia',
    prodotto: 'Salumi e insaccati',
    descrizione: 'La tradizione norcineria irpina, con carni selezionate e stagionatura naturale. Sapori che resistono al tempo.',
    claim: 'La norcineria irpina come una volta.',
  },
  {
    slug: 'verdure-e-dintorni',
    nome: 'Verdure e Dintorni',
    zona: 'Campania',
    prodotto: 'Ortaggi e conserve vegetali',
    descrizione: 'Sott\'oli, giardiniere e verdure conservate secondo le ricette della tradizione campana. Senza conservanti industriali.',
    claim: 'L\'orto campano in vasetto.',
  },
];
