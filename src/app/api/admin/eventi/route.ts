import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabaseClient';

// GET: Lista tutti gli eventi
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('eventi_sito')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ eventi: data });
}

// POST: Crea un nuovo evento
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const body = await request.json();
  
  // Assicuriamo che ci sia un ID
  if (!body.id) {
    body.id = Math.random().toString(36).substring(2, 10);
  }

  if (!body.slug) {
    return NextResponse.json({ error: 'Slug obbligatorio.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('eventi_sito')
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ evento: data }, { status: 201 });
}

// PUT: Aggiorna un evento esistente
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
    .from('eventi_sito')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ evento: data });
}

// DELETE: Elimina un evento
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
    .from('eventi_sito')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
