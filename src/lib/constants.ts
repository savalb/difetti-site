// ─── Brand Constants ──────────────────────────────────────────
export const BRAND = {
  name: 'Difetti',
  tagline: 'Eccellenze Campane',
  payoff: 'Quando difetti non è mancanza, ma unicità',
  subPayoff: 'Il sapore della verità',
  whatsapp: 'https://wa.me/393509684544',
  email: 'info@difetti.it',
  instagram: 'https://instagram.com/difetti_eccellenze',
  facebook: 'https://facebook.com/difetti',
} as const;

// ─── Navigazione ─────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Prodotti',  href: '/difetti' },
  { label: 'Partner',   href: '/partner' },
  { label: 'Servizi',   href: '/servizi' },
  { label: 'Eventi',    href: '/eventi' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Contatti',  href: '/contatti' },
] as const;

// ─── I 5 Principi (Brand Book) ────────────────────────────────
export const PRINCIPI = [
  {
    numero: '01',
    titolo: "L'Unicità batte la Perfezione",
    testo: "Non cerchiamo il pomodoro perfettamente rotondo o la crostata simmetrica. Cerchiamo il sapore esplosivo, il profumo della terra e la consistenza della lavorazione manuale.",
  },
  {
    numero: '02',
    titolo: 'Mai meno del tuo meglio',
    testo: "Che si tratti di preparare un pacco regalo Corporate o di consigliare un ristorante gourmet, diamo sempre il 100%.",
  },
  {
    numero: '03',
    titolo: 'Consulenza, non Vendita',
    testo: "Non 'piazziamo' prodotti. Ascoltiamo il cliente, calibriamo le sue esigenze e offriamo soluzioni strategiche per elevare il suo menù.",
  },
  {
    numero: '04',
    titolo: 'Trasparenza Territoriale — KM Vero',
    testo: "Vogliamo sapere dove nasce il grano, dove cresce il pomodoro e chi tosta le nocciole. Ogni prodotto racconta una geografia precisa.",
  },
  {
    numero: '05',
    titolo: 'Lealtà verso chi produce e chi consuma',
    testo: "Facciamo da ponte tra chi produce con fatica e chi trasforma con passione. Proteggiamo il lavoro degli artigiani.",
  },
] as const;
