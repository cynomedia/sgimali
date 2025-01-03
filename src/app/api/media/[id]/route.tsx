import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  // Attente explicite des paramètres `params` car ils sont désormais asynchrones
  const { id } = await params;

  // Validation que l'ID est présent
  if (!id || id.trim() === '') {
    return NextResponse.json({ error: 'Media ID is invalid or missing' }, { status: 400 });
  }

  // Logique pour appeler l'API WordPress et récupérer les informations du média

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/media/${id}`;

  try {
    const response = await fetch(apiUrl);

    // Vérification si la réponse de l'API est correcte
    if (!response.ok) {
      console.error(`API call failed: ${apiUrl}, Status: ${response.status}`);
      const errorData = await response.text();
      return NextResponse.json(
        {
          error: `Failed to fetch media. Status: ${response.status}. Error: ${errorData}`,
        },
        { status: response.status }
      );
    }

    // Si la réponse est correcte, récupérer les données du média
    const mediaData = await response.json();

    // Retourner l'URL du fichier
    return NextResponse.json({ fileUrl: mediaData.source_url });

  } catch (error: unknown) {
    console.error('Error in proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
