import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import SkeletonTemplatePages from "@/components/skeleton/SkeletonTemplatePages";
import { Metadata } from "next";

// Type de données
type TelechargementData = {
  title: string;
  description: string;
  image: string;
  slug: string;
  acf: {
    elements: Array<{
      libelle: string;
      description: string;
      pdf: number;
      date_de_mise_a_jour: string;
    }>;
  };
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
  acf: {
    elements: Array<{
      libelle: string;
      description: string;
      pdf: number;
      date_de_mise_a_jour: string;
    }>;
  };
}

export const metadata: Metadata = {
  title: "TELECHARGEMENT | SGI Mali",
  description: "Page telechargement SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  },
};

// Fonction pour récupérer l'URL du média (PDF) à partir de son ID

/*
async function getMediaUrlById(mediaId: number): Promise<string> {
  // const apiUrl = `http://localhost:3000/api/media/${mediaId}`; // Appel à votre route API proxy
  // const apiUrl = `http://localhost:3000/api/media/${mediaId}`; // Appel à votre route API proxy
  //const apiUrl = `https://sgimali-frontend.vercel.app/api/media/${mediaId}`; // Appel à votre route API proxy
  const apiUrl = `https://sgi.cynomedia-africa.com/wp-json/wp/v2/media/${mediaId}`;
  const res = await fetch(apiUrl);

  if (!res.ok) {
    const errorData = await res.text(); // Afficher les détails de l'erreur
    throw new Error(`Failed to fetch media with ID ${mediaId}: ${errorData}`);
  }

  const mediaData = await res.json();
  return mediaData.source_url; // Retourner l'URL du média
}
*/

async function getMediaUrlById(mediaId: number): Promise<string> {
  //const apiUrl = `https://sgi.cynomedia-africa.com/wp-json/wp/v2/media/${mediaId}`; // Appel à votre route API proxy backend wp
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/media/${mediaId}`; // Appel à votre route API proxy frontend
  //   const apiUrl = `http://localhost:3000/api/media/${mediaId}`; // Endpoint local original localhost OK

  // Effectuer la requête API
  const res = await fetch(apiUrl);

  if (!res.ok) {
    const errorData = await res.text();
    console.error(`API call failed for media ID ${mediaId}:`, errorData);
    throw new Error(`Failed to fetch media with ID ${mediaId}: ${errorData}`);
  }

  const mediaData = await res.json();
  // console.log(`Media data for ID ${mediaId}:`, mediaData); // Vérification des données

  // Vérifier si fileUrl est valide
  if (!mediaData.fileUrl || typeof mediaData.fileUrl !== "string") {
    throw new Error(`Invalid fileUrl for media ID ${mediaId}`);
  }

  try {
    // Extraire le chemin du fichier à partir de l'URL complète
    const urlPath = new URL(mediaData.fileUrl).pathname;

    // Séparer le chemin en parties pour extraire les segments de date et de fichier
    const pathParts = urlPath.split("/");

    // Extraire les informations pertinentes
    const year = pathParts[pathParts.length - 3]; // Année (ex. 2024)
    const month = pathParts[pathParts.length - 2]; // Mois (ex. 12)
    const filename = pathParts[pathParts.length - 1]; // Nom du fichier (ex. SupportSBFr090103.pdf)
//const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages?per_page=30`;
    // Construire le chemin complet à passer à l'API proxy
    const proxyUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/proxy/${year}/${month}/${filename}`;
    //const proxyUrl = `http://localhost:3000/api/proxy/${year}/${month}/${filename}`;

    return proxyUrl; // Retourner l'URL masquée via le proxy
  } catch (error) {
    // Vérification du type de l'erreur et gestion appropriée
    if (error instanceof Error) {
      throw new Error(
        `Error parsing fileUrl for media ID ${mediaId}: ${error.message}`
      );
    } else {
      // Si ce n'est pas une instance de Error, gérer le cas générique
      throw new Error(
        `Unknown error occurred while parsing fileUrl for media ID ${mediaId}`
      );
    }
  }
}

// Fonction pour récupérer les données de l'telechargement
async function getTelechargement(): Promise<TelechargementData[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages?per_page=30`;
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch telechargement data");
  }

  const pages = await res.json();
  return pages.map((page: Page) => ({
    title: page.title.rendered,
    description: page.content.rendered,
    image: page.featured_image_url || "",
    slug: page.slug,
    acf: page.acf, // Inclure les éléments ACF dans les données
  }));
}

export default async function Telechargement() {
  const dataTelechargement = await getTelechargement();
  if (!dataTelechargement || dataTelechargement.length === 0) {
    return <SkeletonTemplatePages />;
  }

  const telechargement = dataTelechargement.find(
    (page) => page.slug === "telechargement"
  );

  if (!telechargement) {
    return <SkeletonHeaderPageSection />;
  }

  // Récupérer les liens PDF pour chaque élément
  {
    /*
    const elementsWithPdfUrl = await Promise.all(
    telechargement.acf.elements.map(async (element) => {
      const pdfUrl = await getMediaUrlById(element.pdf);
      return { ...element, pdfUrl };
    })
  );
  */
  }

  const elementsWithPdfUrl = await Promise.all(
    telechargement.acf.elements.map(async (element) => {
      try {
        const pdfUrl = await getMediaUrlById(element.pdf);
        return { ...element, pdfUrl };
      } catch (error) {
        console.error(`Failed to fetch PDF URL for element:`, element, error);
        return { ...element, pdfUrl: null }; // Retourne un lien vide en cas d'échec
      }
    })
  );

  return (
    <div>
      <HeaderPageSection title={telechargement.title} />
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="main-page">
                <SectionTitle title={telechargement.title} />
                <div
                  className="telechargement-description"
                  style={{ fontSize: 14, lineHeight: 1.8, color: "#555" }}
                  dangerouslySetInnerHTML={{
                    __html: telechargement.description,
                  }} // Affichage du contenu HTML
                />
              </div>

              <div className="list-job-warp">
                <div className="table-warp">
                  <div className="table-responsive">
                    <table className="table table-hove table-reset">
                      <thead>
                        <tr>
                          <th>Libellé</th>
                          <th>Description</th>
                          <th>Mise à jour le</th>
                          <th>Télécharger</th>
                        </tr>
                      </thead>
                      <tbody>
                        {elementsWithPdfUrl.map((element, index) => (
                          <tr key={index}>
                            <td>
                              <a
                                href={element.pdfUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{color:"#2da2dd", fontWeight:600}}
                              >
                                {element.libelle}
                              </a>
                            </td>

                            <td>{element.description}</td>
                            <td>{element.date_de_mise_a_jour}</td>
                            <td>
                              {/* Lien de téléchargement du fichier PDF */}

                              {/*

                                  <a href={element.pdfUrl} target="_blank" rel="noopener noreferrer">
                                    Télécharger
                                  </a>
*/}
                              <a
                                href={element.pdfUrl || "#"}
                                target={element.pdfUrl ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                style={{
                                  pointerEvents: element.pdfUrl
                                    ? "auto"
                                    : "none",
                                  color: element.pdfUrl ? "#2da2dd" : "#2da2dd",fontWeight:600
                                }}
                              >
                                Télécharger
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
