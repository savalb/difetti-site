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
  description: 'Selezionatori di eccellenze gastronomiche artigianali dall\'Irpinia e dalla Campania. Consulenza strategica per ristoranti e HoReCa. Prodotti KM Vero.',
  keywords: ['prodotti artigianali Irpinia', 'eccellenze campane', 'fornitore HoReCa Avellino', 'consulenza menù ristorante', 'km vero Campania', 'difetti eccellenze'],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: BRAND.name,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: 'Quando difetti non è mancanza, ma unicità. Eccellenze gastronomiche campane per l\'HoReCa.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

// Schema.org LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Difetti — Eccellenze Campane',
  description: 'Selezionatori e distributori di prodotti gastronomici artigianali campani. Consulenza strategica HoReCa.',
  url: 'https://difetti.it',
  telephone: '+393509684544',
  email: BRAND.email,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Campania',
    addressCountry: 'IT',
  },
  areaServed: ['Irpinia', 'Campania', 'Italia'],
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
