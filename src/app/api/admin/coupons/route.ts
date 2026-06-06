import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabaseClient';

// GET: Recupera i coupon richiesti (con ricerca e filtri)
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    let dbQuery = supabase
      .from('coupon_richiesti')
      .select(`
        *,
        campagne_marketing (
          titolo,
          prodotto_nome
        )
      `)
      .order('creato_il', { ascending: false });

    // Se c'è una query di ricerca, applichiamo un filtro OR
    if (query && query.trim() !== '') {
      const cleanQuery = query.trim();
      dbQuery = dbQuery.or(`nome.ilike.%${cleanQuery}%,telefono.ilike.%${cleanQuery}%,codice_coupon.ilike.%${cleanQuery}%`);
    }

    const { data, error } = await dbQuery;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ coupons: data });
  } catch (err) {
    console.error('Errore GET /api/admin/coupons:', err);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}

// PUT: Aggiorna lo stato di un coupon (es. segna come Riscattato)
export async function PUT(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { id, stato } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID coupon mancante.' }, { status: 400 });
    }

    if (!stato || !['Valido', 'Riscattato'].includes(stato)) {
      return NextResponse.json({ error: 'Stato non valido.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('coupon_richiesti')
      .update({ stato })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ coupon: data });
  } catch (err) {
    console.error('Errore PUT /api/admin/coupons:', err);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}
