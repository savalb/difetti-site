import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabaseClient';
import { PUNTI_VENDITA } from '@/lib/puntiVendita';

// GET: Lista tutti i punti vendita
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ puntiVendita: PUNTI_VENDITA });
  }

  const { data, error } = await supabase
    .from('punti_vendita_sito')
    .select('*')
    .order('ordine', { ascending: true });

  if (error) {
    console.warn('Supabase fetch failed, returning static fallback:', error.message);
    return NextResponse.json({ puntiVendita: PUNTI_VENDITA, fallback: true });
  }

  // If Supabase is empty, initialize it with the static list if it's the first time
  if (!data || data.length === 0) {
    return NextResponse.json({ puntiVendita: PUNTI_VENDITA, fallback: true });
  }

  return NextResponse.json({ puntiVendita: data });
}

// POST: Crea un nuovo punto vendita
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const body = await request.json();
  
  // Ensure we have an ID
  if (!body.id) {
    body.id = Math.random().toString(36).substring(2, 10);
  }

  const { data, error } = await supabase
    .from('punti_vendita_sito')
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ puntoVendita: data }, { status: 201 });
}

// PUT: Aggiorna un punto vendita esistente
export async function PUT(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID obbligatorio.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('punti_vendita_sito')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ puntoVendita: data });
}

// DELETE: Elimina un punto vendita
export async function DELETE(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID obbligatorio.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('punti_vendita_sito')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
