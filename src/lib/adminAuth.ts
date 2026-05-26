import { NextRequest, NextResponse } from 'next/server';

export function verifyAdminToken(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    
    if (decoded.exp < Date.now()) {
      return false; // Token scaduto
    }
    
    if (decoded.sig !== process.env.ADMIN_PASSWORD) {
      return false; // Secret non valido
    }

    return true;
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Non autorizzato. Effettua il login.' },
    { status: 401 }
  );
}
