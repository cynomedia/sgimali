import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import SkeletonHistorique from "@/components/skeleton/SkeletonHistorique";
import { Metadata } from "next";
import Image from "next/image";


// Type de données
type EmissionEmpruntPublicData = {
  title: string;
  description: string;
  image: string;
  slug: string;
};

interface Page {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_image_url?: string;
  slug: string;
}



export const metadata: Metadata = {
  title: "EMISSION D'EMPRUNT PUBLIC | SGI Mali",
  description: "Page Emission d'emprunt public - SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  }
}


// Fonction pour récupérer les données de l'emissionempruntpub
async function getEmissionempruntpub(): Promise<EmissionEmpruntPublicData[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages?per_page=30`;
  //const apiUrl = "https://sgi.cynomedia-africa.com/wp-json/wp/v2/pages?per_page=30";
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch emissionempruntpub data");
  }

  const pages = await res.json();
  return pages.map((page: Page) => ({
    title: page.title.rendered,
    description: page.content.rendered, // Récupération du contenu HTML
    image: page.featured_image_url || "", // Récupération de l'URL de l'image mise en avant
    slug: page.slug,

  }));
}

export default async function Emissionempruntpub() {
  // Récupérer les données depuis l'API
  const dataEmissionempruntpub = await getEmissionempruntpub();
  //si le slug
  if (!dataEmissionempruntpub || dataEmissionempruntpub.length === 0) {
    return <SkeletonHistorique />;
  }

  // Si une des pages a un slug égal à "emissionempruntpub", cette page sera retournée par la méthode find() et assignée à la variable emissionempruntpub.
  const emissionempruntpub = dataEmissionempruntpub.find(page => page.slug === "emissions-demprunts-publics");

  if (!emissionempruntpub) {
    return (
      <SkeletonHeaderPageSection/>
    );
  }
  
    
  return (
    <div>            
      <HeaderPageSection title={emissionempruntpub.title} />      
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Bloc gauche : Texte */}
            <div className="col-md-8">
              <div className="main-page">
                <SectionTitle title={emissionempruntpub.title} />
                <div
                  className="emissionempruntpub-description"
                  style={{ fontSize: 14, lineHeight: 1.8, color: "#555" }}
                  dangerouslySetInnerHTML={{ __html: emissionempruntpub.description }} // Affichage du contenu HTML
                />

              </div>
            </div>

            {/* Bloc droit : Image */}
            <div className="col-md-4">
              <div className="main-page">
                <Image
                  src={emissionempruntpub.image || "/images/default.webp"} // Source de l'image
                  alt="Emissionempruntpub SGI Mali" // Texte alternatif
                  className="img-responsive"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                  width={500}
                  height={300}
                  layout="intrinsic"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
