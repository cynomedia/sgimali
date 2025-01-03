import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/send-subscription-notification/`; // L'URL de l'API d'envoi d'email
  
  try {
    // Récupérer les données envoyées dans la requête
    const data = await request.json();

    // Faire une requête POST vers l'API WordPress pour envoyer l'email
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Si la requête échoue
    if (!response.ok) {
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 });
    }

    // Récupérer la réponse de l'API
    const result = await response.json();

    // Retourner la réponse de l'API sous forme de réponse JSON
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erreur du proxy:', error);
    return NextResponse.json({ error: 'Erreur du serveur' }, { status: 500 });
  }
}
