import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ManifestoSection } from '@/components/home/ManifestoSection';
import { ProdottiPreview } from '@/components/home/ProdottiPreview';
import { PartnerStrip } from '@/components/home/PartnerStrip';
import { CTASection } from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Difetti — Eccellenze Campane | Prodotti Artigianali Irpinia per HoReCa',
  description: 'Selezione di eccellenze gastronomiche artigianali dall\'Irpinia e dalla Campania. Pasta, conserve, crostate e prodotti KM Vero per ristoranti e HoReCa. Consulenza strategica personalizzata.',
  keywords: ['prodotti artigianali Irpinia', 'fornitore HoReCa Avellino', 'pasta bronze die Campania', 'conserve artigianali', 'km zero Irpinia'],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <ProdottiPreview />
      <PartnerStrip />
      <CTASection />
    </>
  );
}
