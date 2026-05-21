import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
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
  url: 'https://difetti.vercel.app',
  telephone: '+39NUMERODIANTONIO',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
