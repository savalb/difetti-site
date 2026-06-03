import { PUNTI_VENDITA, PuntoVendita } from '@/lib/puntiVendita';
import { supabase } from '@/lib/supabaseClient';

export async function getAllPuntiVendita(): Promise<PuntoVendita[]> {
  if (!supabase) {
    return PUNTI_VENDITA;
  }

  try {
    const { data, error } = await supabase
      .from('punti_vendita_sito')
      .select('*')
      .order('ordine', { ascending: true });

    if (error) {
      console.warn('Supabase punti_vendita_sito error, falling back to static list:', error.message);
      return PUNTI_VENDITA;
    }

    if (data && data.length > 0) {
      return data as PuntoVendita[];
    }
  } catch (e) {
    console.warn('Failed to fetch from Supabase, falling back to static list:', e);
  }

  return PUNTI_VENDITA;
}
