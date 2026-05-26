import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { TheEnemySection } from '@/components/home/TheEnemySection';
import { ManifestoSection } from '@/components/home/ManifestoSection';
import { ProdottiPreview } from '@/components/home/ProdottiPreview';
import { MetodoOperativoSection } from '@/components/home/MetodoOperativoSection';
import { PartnerStrip } from '@/components/home/PartnerStrip';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { CTASection } from '@/components/home/CTASection';
import { getAllPartners } from '@/lib/services/partnerService';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Difetti — Eccellenze Campane | Prodotti Artigianali Irpinia per HoReCa',
  description: 'Selezione di eccellenze gastronomiche artigianali dall\'Irpinia e dalla Campania. Pasta, conserve, crostate e prodotti KM Vero per ristoranti e HoReCa. Consulenza strategica personalizzata.',
  keywords: ['prodotti artigianali Irpinia', 'fornitore HoReCa Avellino', 'pasta bronze die Campania', 'conserve artigianali', 'km zero Irpinia'],
};

export default async function HomePage() {
  const partners = await getAllPartners();
  
  return (
    <>
      <HeroSection />
      <TheEnemySection />
      <ManifestoSection />
      <ProdottiPreview />
      <MetodoOperativoSection />
      <PartnerStrip partners={partners} />
      <SocialProofSection />
      <CTASection />
    </>
  );
}
