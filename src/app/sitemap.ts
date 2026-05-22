import type { MetadataRoute } from 'next';
import { PARTNER } from '@/lib/data/partner';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://difetti-site3.vercel.app';

  // Rotte statiche di base
  const staticRoutes = ['', '/difetti', '/partner', '/servizi', '/eventi', '/chi-siamo', '/contatti'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Rotte dinamiche dei prodotti
  const productRoutes = ['pasta', 'conserve', 'crostate'].map((slug) => ({
    url: `${baseUrl}/difetti/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Rotte dinamiche dei partner
  const partnerRoutes = PARTNER.map((partner) => ({
    url: `${baseUrl}/partner/${partner.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...partnerRoutes];
}
