import type { Metadata } from 'next';
import './globals.css';
import { BRAND } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  metadataBase: new URL('https://difetti.it'),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: 'Selezionatori di eccellenze gastronomiche artigianali dall\'Irpinia e dalla Campania. Fornitore HoReCa a Avellino e provincia. Consulenza strategica menù per ristoranti.',
  keywords: ['prodotti artigianali Irpinia', 'eccellenze campane', 'fornitore HoReCa Avellino', 'consulenza menù ristorante', 'distribuzione alimentare Campania', 'km vero Avellino', 'difetti eccellenze B2B'],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: 'Quando difetti non è mancanza, ma unicità. Eccellenze gastronomiche campane per l\'HoReCa a Avellino e in tutta la Campania.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

// Schema.org LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Difetti — Eccellenze Campane',
  description: 'Selezionatori e distributori di prodotti gastronomici artigianali irpini e campani. Consulenza strategica per ristoranti e HoReCa.',
  url: 'https://difetti.it',
  telephone: '+393509684544',
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Avellino',
    addressRegion: 'Campania',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.914,
    longitude: 14.793
  },
  areaServed: [
    { '@type': 'AdministrativeArea', 'name': 'Irpinia' },
    { '@type': 'AdministrativeArea', 'name': 'Campania' }
  ],
  sameAs: [
    BRAND.instagram,
    BRAND.facebook
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
