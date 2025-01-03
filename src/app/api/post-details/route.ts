// app/src/api/post-details/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  // Vérification du paramètre slug
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    // Faire une requête vers l'API externe pour récupérer l'article par son slug
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`;
    const response = await fetch(apiUrl);

    // Vérifier si la réponse de l'API externe est valide
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch data from external API' }, { status: response.status });
    }

    const data = await response.json();

    // Si aucun article n'est trouvé
    if (data.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Renvoyer les données de l'article
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
