import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import SkeletonNotreEquipe from "@/components/skeleton/SkeletonNotreEquipe";
import { Metadata } from "next";
import Image from "next/image";

// Type de données
type TeamMember = {
  image: string; // URL complète de l'image
  titre: string;
  sous_titre: string;
};

type NotreEquipeData = {
  title: string;
  description: string;
  image: string; // URL de l'image principale (featured_image_url)
  slug: string;
  equipe: TeamMember[]; // Membres de l'équipe
};

interface Page {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_image_url?: string | null;
  slug: string;
  acf?: {
    equipe?: {
      image: number; // ID de l'image dans WordPress
      titre: string;
      sous_titre: string;
    }[];
  };
}

export const metadata: Metadata = {
  title: "NOTRE EQUIPE | SGI Mali",
  description: "Page Notre Equipe SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  },
};

// Fonction pour récupérer l'URL de l'image par ID
async function getImageUrlById(imageId: number): Promise<string> {
  const apiUrl = `https://sgi.cynomedia-africa.com/wp-json/wp/v2/media/${imageId}`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    const errorData = await res.text(); // Afficher les détails de l'erreur
    throw new Error(`Failed to fetch image with ID ${imageId}: ${errorData}`);
  }

  const imageData = await res.json();
  return imageData.guid.rendered; // Récupérer l'URL de l'image à partir de guid.rendered
}

// Fonction pour récupérer les données de l'historique
async function getNotreEquipe(): Promise<NotreEquipeData[]> {
  const apiUrl = "https://sgimali-frontend.vercel.app/api/pages?per_page=30";
  //const apiUrl = "https://sgi.cynomedia-africa.com/wp-json/wp/v2/pages?per_page=30";
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch historique data");
  }

  const pages = await res.json();
  const equipePromises = pages.map(async (page: Page) => {
    const equipe =
      page.acf?.equipe?.map(async (member) => {
        const imageUrl = await getImageUrlById(member.image); // Récupérer l'URL de l'image
        return {
          image: imageUrl, // URL complète de l'image
          titre: member.titre,
          sous_titre: member.sous_titre,
        };
      }) || [];

    // Résultats après résolution des promesses pour les membres de l'équipe
    const equipeResolved = await Promise.all(equipe);

    return {
      title: page.title.rendered,
      description: page.content.rendered, // Récupération du contenu HTML
      image: page.featured_image_url || "", // Récupération de l'URL de l'image mise en avant
      slug: page.slug,
      equipe: equipeResolved, // Membres de l'équipe avec les images récupérées
    };
  });

  return await Promise.all(equipePromises); // Résoudre toutes les promesses
}

export default async function Equipe() {
  // Récupérer les données depuis l'API
  const dataNotreEquipe = await getNotreEquipe();

  if (!dataNotreEquipe || dataNotreEquipe.length === 0) {
    return <SkeletonNotreEquipe />;
  }

  // Si une des pages a un slug égal à "notre-equipe", cette page sera retournée par la méthode find() et assignée à la variable notrequipe.
  const notrequipe = dataNotreEquipe.find(
    (page) => page.slug === "notre-equipe"
  );

  if (!notrequipe) {
    return <SkeletonHeaderPageSection />;
  }

  return (
    <div>
      <HeaderPageSection title={notrequipe.title} />
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Bloc gauche : Texte */}
            <div className="col-md-8">
              <div className="main-page">
                <SectionTitle title={notrequipe.title} />
                <div
                  className="historique-description"
                  style={{ fontSize: 14, lineHeight: 1.8, color: "#555" }}
                  dangerouslySetInnerHTML={{ __html: notrequipe.description }} // Affichage du contenu HTML
                />
              </div>
            </div>

            {/* Bloc droit : Image */}
            <div className="col-md-4">
              <div className="main-page">
                <Image
                  src={notrequipe.image || "/images/default.webp"}
                  alt="Historique SGI Mali" // Texte alternatif
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
          <div className="row">
            {/* retourner les membres ici */}
            <br />
            <br />
            <br />
            <br />
            <div className="row">
              {notrequipe.equipe && notrequipe.equipe.length > 0 ? (
                notrequipe.equipe.map((member, index) => (
                  <div
                    className="col-lg-3 col-md-4 col-6 mb-4"
                    key={index}
                    style={{ marginBottom: 20 }}
                  >
                    <div className="team-member text-center item-team">
                      <Image
                        src={member.image} // Remplacer par l'URL de l'image
                        alt={member.titre}
                        className="img-responsive img-thumbnail"
                        style={{
                          borderRadius: "50%",
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          marginBottom: "15px",
                        }}
                        width={150}
                        height={150}
                      />
                      <h5>{member.titre}</h5>
                      <p style={{ fontSize: "14px", color: "#777" }}>
                        {member.sous_titre}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#777" }}>
                  Aucun membre trouvé.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
