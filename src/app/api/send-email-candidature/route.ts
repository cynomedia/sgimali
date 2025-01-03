// app/src/api/send-email-candidature/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/apply-job/`; // L'URL de votre API WordPress
  //const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/send-subscription-notification/`; // L'URL de l'API d'envoi d'email

  // Récupérer les données envoyées dans le corps de la requête (formulaire)
  const formData = await req.json(); // Récupérer les données du formulaire envoyé par le frontend

  try {
    // Effectuer la requête POST vers l'API WordPress avec les données du formulaire
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Envoyer les données du formulaire
    });

    // Si l'API WordPress retourne une réponse d'erreur
    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(errorResponse, { status: response.status });
    }

    // Récupérer la réponse de l'API WordPress
    const result = await response.json();

    // Retourner la réponse de l'API WordPress au frontend
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Erreur du proxy:', error);
    return NextResponse.json({ error: 'Erreur du serveur' }, { status: 500 });
  }
}
