import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: 'Credenziali admin non configurate nel server.' },
      { status: 500 }
    );
  }

  if (email === adminEmail && password === adminPassword) {
    // Genera un token semplice basato su timestamp + secret
    const token = Buffer.from(
      JSON.stringify({
        email,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24h
        sig: process.env.ADMIN_PASSWORD, // usato come secret
      })
    ).toString('base64');

    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json(
    { error: 'Email o password non validi.' },
    { status: 401 }
  );
}
