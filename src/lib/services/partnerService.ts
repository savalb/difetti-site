import { PARTNER, Partner } from '@/lib/data/partner';

export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  // Usa direttamente il database statico per garantire l'allineamento con le modifiche del codice
  return PARTNER.find(p => p.slug === slug) || null;
}

export async function getAllPartners(): Promise<Partner[]> {
  // Usa direttamente il database statico per garantire l'allineamento con le modifiche del codice
  return PARTNER;
}
