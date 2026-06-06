import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabaseClient';

// GET: Lista tutte le campagne di marketing
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  try {
    const { data, error } = await supabase
      .from('campagne_marketing')
      .select('*')
      .order('attiva', { ascending: false })
      .order('updated_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaigns: data });
  } catch (err) {
    console.error('Errore GET /api/admin/campagne:', err);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}

// PUT: Modifica o attiva una campagna marketing
export async function PUT(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID campagna mancante.' }, { status: 400 });
    }

    // Se stiamo attivando questa campagna (attiva = true),
    // dobbiamo disattivare tutte le altre campagne con lo stesso slug.
    if (updateData.attiva === true) {
      // Otteniamo lo slug di questa campagna per sicurezza
      const { data: currentCamp } = await supabase
        .from('campagne_marketing')
        .select('slug')
        .eq('id', id)
        .single();

      const slug = currentCamp?.slug || 'vip';

      // Disattiviamo tutte le altre campagne con questo slug
      const { error: deactivateError } = await supabase
        .from('campagne_marketing')
        .update({ attiva: false })
        .eq('slug', slug)
        .neq('id', id);

      if (deactivateError) {
        console.error('Errore disattivazione vecchie campagne:', deactivateError.message);
        return NextResponse.json({ error: 'Errore durante l\'attivazione dell\'offerta.' }, { status: 500 });
      }
    }

    // Aggiorniamo la campagna corrente
    const { data, error } = await supabase
      .from('campagne_marketing')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data });
  } catch (err) {
    console.error('Errore PUT /api/admin/campagne:', err);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}
