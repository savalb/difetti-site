import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/adminAuth';
import { supabase } from '@/lib/supabaseClient';

// GET: Lista tutti i partner
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('partner_sito')
    .select('*')
    .order('nome', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partners: data });
}

// POST: Crea un nuovo partner
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const body = await request.json();
  
  const { data, error } = await supabase
    .from('partner_sito')
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partner: data }, { status: 201 });
}

// PUT: Aggiorna un partner esistente
export async function PUT(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const body = await request.json();
  const { slug, ...updateData } = body;

  if (!slug) {
    return NextResponse.json({ error: 'Slug obbligatorio.' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('partner_sito')
    .update(updateData)
    .eq('slug', slug)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ partner: data });
}

// DELETE: Elimina un partner
export async function DELETE(request: NextRequest) {
  if (!verifyAdminToken(request)) return unauthorizedResponse();
  
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug obbligatorio.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('partner_sito')
    .delete()
    .eq('slug', slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
