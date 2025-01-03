// app/src/api/job_offers/route.js
import { NextResponse } from 'next/server';

// const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages?per_page=30`;
const JOB_OFFERS_API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/job-offers`;
//const JOB_OFFERS_API_URL = "https://sgi.cynomedia-africa.com/wp-json/wp/v2/job_offers";

// Types pour les données des offres d'emploi
type JobOffer = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
};

export async function GET() {
  try {
    // Récupérer les offres d'emploi depuis l'API externe
    const jobOffersRes = await fetch(JOB_OFFERS_API_URL, {
      next: { revalidate: 60 }, // Revalidation toutes les 60 secondes
    });

    if (!jobOffersRes.ok) {
      throw new Error("Failed to fetch job offers");
    }

    const jobOffers: JobOffer[] = await jobOffersRes.json();

    // Retourner les données au format JSON
    return NextResponse.json(jobOffers);
  } catch (error) {
    console.error("Error fetching job offers:", error);
    return NextResponse.json(
      { message: "Failed to fetch job offers" },
      { status: 500 }
    );
  }
}
