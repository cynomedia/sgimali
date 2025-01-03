import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import SkeletonMission from "@/components/skeleton/SkeletonMission";
import { Metadata } from "next";
import Image from "next/image";


// Type de données
type MissionData = {
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
  title: "MISSION | SGI Mali",
  description: "Page mission SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  }
}



// Fonction pour récupérer les données de l'Mission
async function getMission(): Promise<MissionData[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages?per_page=30`;
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Mission data");
  }

  const pages = await res.json();
  return pages.map((page: Page) => ({
    title: page.title.rendered,
    description: page.content.rendered, // Récupération du contenu HTML
    image: page.featured_image_url || "", // Récupération de l'URL de l'image mise en avant
    slug: page.slug,

  }));
}







export default async function Mission() {

  // Récupérer les données depuis l'API
  const dataMission = await getMission();
  //si le slug
  if (!dataMission || dataMission.length === 0) {
    return <SkeletonMission />;
  }

  // Si une des pages a un slug égal à "mission", cette page sera retournée par la méthode find() et assignée à la variable Mission.
  const datamission = dataMission.find(page => page.slug === "mission");

  if (!datamission) {
    return (
      <SkeletonHeaderPageSection/>
    );
  }
  
  

  return (
    <div>            
      <HeaderPageSection title={datamission.title} />      
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Bloc gauche : Texte */}
            <div className="col-md-8">
              <div className="main-page">
                <SectionTitle title={datamission.title} />
                <div
                  className="mission-description"
                  style={{ fontSize: 14, lineHeight: 1.8, color: "#555" }}
                  dangerouslySetInnerHTML={{ __html: datamission.description }} // Affichage du contenu HTML
                />
              </div>
            </div>

            {/* Bloc droit : Image */}
            <div className="col-md-4">
              <div className="main-page">
                <Image
                  src={datamission.image || "/images/default.webp"} // Source de l'image
                  alt="Mission SGI Mali" // Texte alternatif
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
