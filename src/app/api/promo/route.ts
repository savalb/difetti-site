import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Generatore di codice coupon casuale univoco (es. VIP-SNT-A3F9)
function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VIP-SNT-${randomPart}`;
}

// GET: Recupera la promozione attiva o controlla lo stato di un coupon specifico
export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    // Se viene passato un codice coupon, restituisce le informazioni su quel coupon
    if (code) {
      const { data, error } = await supabase
        .from('coupon_richiesti')
        .select('*')
        .eq('codice_coupon', code)
        .maybeSingle();

      if (error) {
        console.error('Errore recupero coupon da codice:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ coupon: data || null });
    }

    // Altrimenti, recupera la campagna attiva
    const { data, error } = await supabase
      .from('campagne_marketing')
      .select('*')
      .eq('slug', 'vip')
      .eq('attiva', true)
      .maybeSingle();

    if (error) {
      console.error('Errore caricamento campagna attiva:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ campaign: data || null });
  } catch (err) {
    console.error('Errore interno GET /api/promo:', err);
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 });
  }
}

// POST: Registra un cliente e genera il coupon
export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase non configurato.' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, phone, campaignId } = body;

    // Validazione input
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Il nome è obbligatorio.' }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: 'Il numero di telefono è obbligatorio.' }, { status: 400 });
    }
    if (!campaignId) {
      return NextResponse.json({ error: 'ID campagna mancante.' }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    // Loop per gestire potenziali collisioni di codici coupon univoci (max 5 tentativi)
    let attempts = 0;
    let couponCode = '';
    let success = false;
    let finalCouponData = null;

    while (attempts < 5 && !success) {
      couponCode = generateRandomCode();
      attempts++;

      // Inseriamo il record (scrittura cieca per evitare violazioni RLS nel select returning)
      const { error } = await supabase
        .from('coupon_richiesti')
        .insert({
          campagna_id: campaignId,
          nome: cleanName,
          telefono: cleanPhone,
          codice_coupon: couponCode,
          stato: 'Valido'
        });

      if (!error) {
        success = true;
      } else {
        // Se l'errore è dovuto a violazione di unicità (codice duplicato), riproviamo
        // Altrimenti, interrompiamo ed eseguiamo il throw dell'errore
        if (error.code === '23505') {
          console.warn(`Collisione sul codice coupon ${couponCode}, tentativo ${attempts}/5...`);
        } else {
          throw new Error(error.message);
        }
      }
    }

    if (!success) {
      return NextResponse.json({ error: 'Impossibile generare un codice coupon unico. Riprova più tardi.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      coupon: {
        id: '',
        codice_coupon: couponCode,
        nome: cleanName,
        telefono: cleanPhone,
        stato: 'Valido',
        creato_il: new Date().toISOString()
      }
    }, { status: 201 });

  } catch (err: any) {
    console.error('Errore interno POST /api/promo:', err);
    return NextResponse.json({ error: err.message || 'Errore interno del server.' }, { status: 500 });
  }
}
