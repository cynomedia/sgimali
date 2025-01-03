import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/subscription-api/v1/add-subscriber`;

  try {
    // Vérification de la méthode POST
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Méthode non autorisée' }, { status: 405 });
    }

    // Récupérer les données envoyées dans la requête
    const data = await request.json();

    // Faire la requête POST vers l'API WordPress
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Vérifier si la requête échoue
    if (!response.ok) {
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 });
    }

    const result = await response.json();

    // Retourner la réponse de l'API sous forme de réponse JSON
    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur du proxy:', error);
    return NextResponse.json({ error: 'Erreur du serveur' }, { status: 500 });
  }
}
