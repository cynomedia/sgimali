// src/app/api/slides/route.ts
import { NextResponse } from 'next/server';

export async function GET() {

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/pages?per_page=30`;

  try {
    // Faire une requête GET vers l'API WordPress
    const response = await fetch(apiUrl);

    // Si la requête échoue
    if (!response.ok) {
      return NextResponse.json({ error: 'Erreur lors de la récupération des données' }, { status: 500 });
    }

    // Récupérer les données de l'API WordPress
    const data = await response.json();

    // Retourner les données sous forme de réponse
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur du proxy:', error);
    return NextResponse.json({ error: 'Erreur du serveur' }, { status: 500 });
  }
}
