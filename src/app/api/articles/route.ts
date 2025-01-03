import { NextRequest, NextResponse } from 'next/server';

// L'URL de l'API WordPress
const POSTS_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/posts`;

export async function GET(request: NextRequest) {
  try {
    // Récupérer les paramètres de la requête
    const url = new URL(request.url);

    const page = url.searchParams.get('page') || '1'; // Par défaut page = 1
    const categoryParam = url.searchParams.get('categories') || ''; // Paramètre de catégorie (facultatif)
    const perPage = url.searchParams.get('per_page') || '6'; // Par défaut 6 articles par page
    const orderBy = url.searchParams.get('orderby') || 'date'; // Par défaut trié par date
    const embed = url.searchParams.get('_embed') || 'true'; // Assurez-vous que _embed est défini, ou laissez le par défaut 'true'

    // Construire l'URL de l'API WordPress avec les paramètres nécessaires
    let apiUrl = `${POSTS_API_URL}?orderby=${orderBy}&per_page=${perPage}&page=${page}&_embed=${embed}`;
    
    if (categoryParam) {
      apiUrl += `&categories=${categoryParam}`;
    }

    // Faire la requête vers l'API WordPress
    const response = await fetch(apiUrl);

    // Vérifier si la réponse est OK
    if (!response.ok) {
      throw new Error("Failed to fetch posts from API");
    }

    // Récupérer les articles au format JSON
    const posts = await response.json();

    // Récupérer les en-têtes `X-WP-Total` et `X-WP-TotalPages` de la réponse de l'API
    const totalPosts = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    // Créer un objet de réponse incluant les données des posts et les en-têtes
    const responseData = {
      posts,
      totalPosts,
      totalPages,
    };

    // Retourner les données sous forme de réponse JSON à l'utilisateur
    return NextResponse.json(responseData);
} catch (error: unknown) {
    // Forcer TypeScript à traiter 'error' comme une instance de Error
    const e = error as Error;
    console.error("Error fetching posts:", e);
    return NextResponse.json(
      { message: "Failed to fetch posts", error: e.message },
      { status: 500 }
    );
  }
  
}
