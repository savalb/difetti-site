export interface PuntoVendita {
  id: string;
  nome: string;
  tipologia: 'ristorante' | 'enoteca' | 'pizzeria' | 'bistrot';
  provincia: 'Avellino' | 'Napoli' | 'Salerno' | 'Benevento';
  indirizzo: string;
  lat?: number;
  lng?: number;
  telefono?: string;
  whatsapp?: string;
  prodotti: string[];
  dettaglio: string;
  logo_url?: string;
  ordine?: number;
}

export const PUNTI_VENDITA: PuntoVendita[] = [
  {
    id: 'madi-alimentari',
    nome: 'MA.DI. Alimentari',
    tipologia: 'bistrot',
    provincia: 'Avellino',
    indirizzo: 'Piazza Municipio 2, Montefredane (AV)',
    telefono: '3382480967',
    whatsapp: 'https://wa.me/393382480967',
    prodotti: ['Conserve di Pomodoro', 'Crostate Artigianali'],
    dettaglio: 'Bottega e bistrot di specialità irpine che seleziona conserve e crostate artigianali per taglieri ed esperienze enogastronomiche.',
    ordine: 1
  },
  {
    id: 'il-testone',
    nome: 'Il Testone',
    tipologia: 'ristorante',
    provincia: 'Avellino',
    indirizzo: 'Corso Umberto I 127, Avellino (AV)',
    telefono: '3929688596',
    whatsapp: 'https://wa.me/393929688596',
    prodotti: ['Pasta Artigianale', 'Conserve di Pomodoro', 'Alici Nettuno'],
    dettaglio: 'Ristorante tradizionale nel cuore di Avellino. La pasta trafilata al bronzo e il pomodoro a ridotta acidità sono la base dei loro primi piatti storici.',
    ordine: 2
  },
  {
    id: 'in-tavola',
    nome: 'In Tavola (Diego Testa)',
    tipologia: 'bistrot',
    provincia: 'Avellino',
    indirizzo: 'Via Colombo 68, Avellino (AV)',
    telefono: '3332210226',
    whatsapp: 'https://wa.me/393332210226',
    prodotti: ['Pasta Artigianale', 'Conserve di Pomodoro'],
    dettaglio: 'Bistrot moderno famoso per la cura maniacale delle materie prime, propone primi piatti espressi realizzati con pasta e conserve selezionate da Difetti.',
    ordine: 3
  },
  {
    id: 'panificio-spagnuolo',
    nome: 'Panificio Spagnuolo',
    tipologia: 'bistrot',
    provincia: 'Avellino',
    indirizzo: 'Via Giordano Bruno 10, Aiello del Sabato (AV)',
    telefono: '0825667195',
    prodotti: ['Crostate Artigianali', 'Conserve di Pomodoro'],
    dettaglio: 'Forno storico che offre degustazioni ed eccellenze campane. Le crostate artigianali e i pomodori sono scelti per arricchire la loro offerta gourmet.',
    ordine: 4
  },
  {
    id: 'super-enne-market',
    nome: 'Super Enne Market',
    tipologia: 'enoteca',
    provincia: 'Avellino',
    indirizzo: 'Via Provinciale Aiello, Cesinali (AV)',
    telefono: '3384308035',
    prodotti: ['Pasta Artigianale', 'Conserve di Pomodoro', 'Confetture'],
    dettaglio: 'Market gastronomico specializzato in prodotti locali di altissima qualità, con uno scaffale interamente dedicato alle selezioni e conserve Difetti.',
    ordine: 5
  },
  {
    id: 'chico-srl',
    nome: 'Chico',
    tipologia: 'bistrot',
    provincia: 'Avellino',
    indirizzo: 'Via U. Nobile 35, Avellino (AV)',
    telefono: '3296063892',
    prodotti: ['Conserve di Pomodoro', 'Pasta Artigianale', 'Alici Nettuno'],
    dettaglio: 'Punto di ritrovo moderno che propone taglieri, aperitivi e piatti veloci valorizzando le alici e i pomodori selezionati da Difetti.',
    ordine: 6
  }
];
