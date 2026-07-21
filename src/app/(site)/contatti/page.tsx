import type { Metadata } from 'next';
import { ContattiClient } from './ContattiClient';

export const metadata: Metadata = {
  title: 'Contatti — Richiedi Consulenza HoReCa e Info Prodotti | Difetti',
  description: 'Contatta Antonio De Matteis di Difetti. Richiedi l\'analisi del menù del tuo ristorante o informazioni sulla nostra pasta e conserve artigianali in Irpinia e Campania.',
  keywords: ['contatti Difetti', 'contatta Antonio De Matteis', 'consulenza HoReCa Avellino', 'fornitura alimentari contatti'],
};

export default function ContattiPage() {
  return <ContattiClient />;
}
