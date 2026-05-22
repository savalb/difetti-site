export interface PuntoVendita {
  id: string;
  nome: string;
  tipologia: 'ristorante' | 'enoteca' | 'pizzeria' | 'bistrot';
  provincia: 'Avellino' | 'Napoli' | 'Salerno' | 'Benevento';
  indirizzo: string;
  lat: number;
  lng: number;
  prodotti: string[];
  dettaglio: string;
  whatsapp?: string;
}

export const PUNTI_VENDITA: PuntoVendita[] = [
  {
    id: 'osteria-valleverde',
    nome: 'Osteria Valleverde',
    tipologia: 'ristorante',
    provincia: 'Avellino',
    indirizzo: 'Via Appia 32, Atripalda (AV)',
    lat: 40.9161,
    lng: 14.8258,
    prodotti: ['Pasta Artigianale (Candele e Fusilli Avellinesi)', 'Conserve di Pomodoro Antico'],
    dettaglio: 'Una storica osteria irpina dove la pasta ruvida trafilata al bronzo Difetti incontra le ricette tradizionali a fuoco lento.',
    whatsapp: 'https://wa.me/393330000000', // Sostituibile
  },
  {
    id: 'decanto-bistrot',
    nome: 'Decanto Bistrot',
    tipologia: 'enoteca',
    provincia: 'Avellino',
    indirizzo: 'Corso Vittorio Emanuele II 112, Avellino (AV)',
    lat: 40.9140,
    lng: 14.7938,
    prodotti: ['Selezione Completa Conserve', 'Crostate Artigianali Imperfette'],
    dettaglio: 'Enoteca di riferimento in città che offre taglieri d\'eccellenza e propone le crostate artigianali Difetti in abbinamento a passiti locali.',
    whatsapp: 'https://wa.me/393330000001',
  },
  {
    id: 'pizzeria-da-salvo',
    nome: 'Pizzeria Da Salvo',
    tipologia: 'pizzeria',
    provincia: 'Napoli',
    indirizzo: 'Largo Arso 10, San Giorgio a Cremano (NA)',
    lat: 40.8322,
    lng: 14.3378,
    prodotti: ['Conserve di Pomodoro (Passata e Pelati per pizza)'],
    dettaglio: 'Pizzeria d\'autore che ha scelto esclusivamente il pomodoro a ridotta acidità Difetti per le sue margherite storiche e le marinare.',
    whatsapp: 'https://wa.me/393330000002',
  },
  {
    id: 'ristorante-il-faro',
    nome: 'Ristorante Il Faro',
    tipologia: 'ristorante',
    provincia: 'Salerno',
    indirizzo: 'Via Porto Alegre 5, Salerno (SA)',
    lat: 40.6782,
    lng: 14.7592,
    prodotti: ['Pasta Artigianale (Formati Lunghi)', 'Passata di Pomodoro'],
    dettaglio: 'Una terrazza sul mare che serve piatti marinari d\'élite usando la pasta Difetti per trattenere al massimo i sughi di pesce fresco.',
    whatsapp: 'https://wa.me/393330000003',
  },
  {
    id: 'antica-trattoria-nando',
    nome: 'Antica Trattoria da Nando',
    tipologia: 'ristorante',
    provincia: 'Avellino',
    indirizzo: 'Via S. Nicola 4, Forino (AV)',
    lat: 40.8631,
    lng: 14.7352,
    prodotti: ['Pasta Artigianale', 'Crostate con Confettura di Ciliegie selvatiche'],
    dettaglio: 'Tradizione irpina genuina. Nando prepara primi robusti con la pasta Difetti e serve a fine pasto le nostre crostate intrecciate a mano.',
    whatsapp: 'https://wa.me/393330000004',
  },
  {
    id: 'enoteca-vinicola-irpina',
    nome: 'Enoteca Vinicola Irpina',
    tipologia: 'enoteca',
    provincia: 'Avellino',
    indirizzo: 'Via Carducci 12, Ariano Irpino (AV)',
    lat: 41.1512,
    lng: 15.0881,
    prodotti: ['Crostate Artigianali', 'Conserve di Pomodoro e Salse da abbinamento'],
    dettaglio: 'Spazio enoculturale dove trovare il meglio della produzione irpina. Propone le conserve di pomodoro Difetti in kit degustazione.',
    whatsapp: 'https://wa.me/393330000005',
  },
  {
    id: 'cantiere-bistrot',
    nome: 'Bistrot Il Cantiere',
    tipologia: 'bistrot',
    provincia: 'Benevento',
    indirizzo: 'Piazza Vari 8, Benevento (BN)',
    lat: 41.1310,
    lng: 14.7794,
    prodotti: ['Pasta Artigianale', 'Conserve di Pomodoro Antico'],
    dettaglio: 'Un locale moderno e giovanile nel cuore della movida sannita che serve deliziosi primi piatti veloci ma di altissima qualità artigianale.',
    whatsapp: 'https://wa.me/393330000006',
  }
];
