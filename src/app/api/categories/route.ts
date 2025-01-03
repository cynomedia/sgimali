// app/src/api/categories/route.js
import { NextResponse } from 'next/server';

const CATEGORIES_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/categories`;

// Types pour les données des catégories
type Category = {
  id: number;
  name: string;
};

export async function GET() {
  try {
    // Récupérer les catégories depuis l'API externe
    const categoriesRes = await fetch(CATEGORIES_API_URL);
    if (!categoriesRes.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories: Category[] = await categoriesRes.json();

    // Retourner les données au format JSON
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
