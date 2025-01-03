// src/app/api/authenticate/route.ts
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { password } = await req.json();

  // Vérification du mot de passe
  if (password === 'Local@12345') {
    const response = NextResponse.json({ message: 'Accès autorisé' });
    response.cookies.set('maintenance-access', 'true', { path: '/', httpOnly: true });
    return response;
  } else {
    return NextResponse.json({ message: 'Accès refusé' }, { status: 403 });
  }
}
