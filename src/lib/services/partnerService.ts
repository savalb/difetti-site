import { supabase } from '@/lib/supabaseClient';
import { PARTNER, Partner } from '@/lib/data/partner';

export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('partner_sito')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (data && !error) {
        return {
          slug: data.slug,
          nome: data.nome,
          zona: data.zona,
          prodotto: data.prodotto,
          descrizione: data.descrizione,
          claim: data.claim,
          storiaParagrafi: data.storia_paragrafi || [],
          dettagli: data.dettagli || [],
          immagineUrl: data.immagine_url || undefined,
          sottoOcchiello: data.sotto_occhiello || undefined,
          mainHeadline: data.main_headline || undefined,
          subHeadline: data.sub_headline || undefined,
          introduzioneShock: data.introduzione_shock || undefined,
          meccanismoUnico: data.meccanismo_unico || undefined,
          obiezioni: data.obiezioni || undefined,
          prodottiShowcase: data.prodotti_showcase || undefined,
          ctaFinale: data.cta_finale || undefined
        };
      }
    } catch (err) {
      console.warn('Errore nel recupero del partner da Supabase, uso fallback statico:', err);
    }
  }

  // Fallback statico
  return PARTNER.find(p => p.slug === slug) || null;
}

export async function getAllPartners(): Promise<Partner[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('partner_sito')
        .select('*');
        
      if (data && data.length > 0 && !error) {
        return data.map((item: any) => ({
          slug: item.slug,
          nome: item.nome,
          zona: item.zona,
          prodotto: item.prodotto,
          descrizione: item.descrizione,
          claim: item.claim,
          storiaParagrafi: item.storia_paragrafi || [],
          dettagli: item.dettagli || [],
          immagineUrl: item.immagine_url || undefined,
          sottoOcchiello: item.sotto_occhiello || undefined,
          mainHeadline: item.main_headline || undefined,
          subHeadline: item.sub_headline || undefined,
          introduzioneShock: item.introduzione_shock || undefined,
          meccanismoUnico: item.meccanismo_unico || undefined,
          obiezioni: item.obiezioni || undefined,
          prodottiShowcase: item.prodotti_showcase || undefined,
          ctaFinale: item.cta_finale || undefined
        }));
      }
    } catch (err) {
      console.warn('Errore nel recupero dei partner da Supabase, uso fallback statico:', err);
    }
  }

  return PARTNER;
}
