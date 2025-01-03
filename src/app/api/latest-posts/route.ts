import { NextResponse } from 'next/server';

//const POSTS_API_URL = "https://sgi.cynomedia-africa.com/wp-json/wp/v2/posts?orderby=date&per_page=3&_embed";
const POSTS_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/posts?orderby=date&per_page=3&_embed`;

//const CATEGORIES_API_URL = "https://sgi.cynomedia-africa.com/wp-json/wp/v2/categories";
const CATEGORIES_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/categories`;

// Types pour les données
type Post = {
  id: number;
  date: string;
  title: { rendered: string };
  categories: number[];
  excerpt: { rendered: string };
  slug: string;
  content: { rendered: string };
  link: string;
  featured_media: number;
  featured_image_url: string | null;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

type Category = {
  id: number;
  name: string;
};

// Fonction pour gérer la requête GET
export async function GET() {
  try {
    // Récupérer les articles
    const postsRes = await fetch(POSTS_API_URL);
    if (!postsRes.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts: Post[] = await postsRes.json();

    // Récupérer les catégories
    const categoriesRes = await fetch(CATEGORIES_API_URL);
    if (!categoriesRes.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories: Category[] = await categoriesRes.json();

    // Créer un dictionnaire pour les noms des catégories
    const categoryDictionary = categories.reduce(
      (acc: { [key: number]: string }, category) => {
        acc[category.id] = category.name;
        return acc;
      },
      {}
    );

    // Mapper les articles pour inclure les noms des catégories et l'URL de l'image en vedette
    const transformedPosts = posts.map((post) => {
      const categoryNames = post.categories.map(
        (categoryId) => categoryDictionary[categoryId]
      );
      const featuredImage =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

      return {
        id: post.id,
        date: post.date,
        title: post.title.rendered,
        categories: categoryNames,
        excerpt: post.excerpt.rendered,
        slug: post.slug,
        content: post.content.rendered,
        link: post.link,
        featured_image_url: featuredImage,
      };
    });

    // Retourner la réponse avec les articles transformés
    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
