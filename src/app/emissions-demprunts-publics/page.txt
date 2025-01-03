import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import { Metadata } from "next";
import Image from "next/image";


// Tableau contenant les données dynamiques pour la page
const contentData = [
  {
    title: "Historique",
    description:
      "Créée grâce à l'impulsion de l'Association professionnelle des banques et établissements financiers (APBEF) le 11 décembre 1996, et en partenariat avec la Chambre de commerce et d'industrie, la Société de Gestion et d'Intermédiation du Mali (SGI-Mali SA) détient le monopole de la négociation des titres (actions, obligations, etc.) à la Bourse régionale des valeurs mobilières (BRVM). Elle est également responsable de la gestion des comptes-titres ainsi que, de façon générale, de l'exécution de tout appel public à l'épargne dans la zone UEMOA. À sa création, la société a été dotée d'un capital de 200 millions de francs CFA et a réellement démarré ses activités le 2 janvier 1999. Son objectif principal est d'accroître les capacités de collecte de l'épargne tout en améliorant les structures et les conditions de financement des entreprises.",
    image: "/images/graph-cfa.jpg", // Lien de l'image
  },
];

export const metadata: Metadata = {
  title: "HISTORIQUE | SGI Mali",
  description: "Page d'historique de SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  },
  openGraph: {
    title: "HISTORIQUE | SGI Mali", // Titre de la page pour Open Graph
    description: "Découvrez l'historique et les réalisations de SGI Mali.",
    url: "https://sgimali-frontend.vercel.app/historique", // URL canonique de la page
    siteName: "SGI Mali", // Nom du site
    images: [
      {
        url: "https://sgimali-frontend.vercel.app/images/favicon.png", // Image de prévisualisation pour Open Graph
        width: 120, // Largeur de l'image
        height: 120, // Hauteur de l'image
        alt: "Logo SGI Mali", // Texte alternatif pour l'image
      },
    ],
    locale: "fr_FR", // Langue et région
    type: "website", // Type de contenu
  },
  twitter: {
    card: "summary_large_image", // Type de carte Twitter
    title: "HISTORIQUE | SGI Mali", // Titre sur Twitter
    description: "Découvrez l'historique et les réalisations de SGI Mali.",
    images: ["https://sgimali-frontend.vercel.app/images/favicon.png"], // Image partagée sur Twitter
  },
  manifest: "/site.webmanifest", // Fichier manifeste pour PWA
};


export default function Historique() {
  // Accès aux données depuis le tableau contentData
  const { title, description, image } = contentData[0];

  return (
    <div>
      <HeaderPageSection title={title} />

      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Bloc gauche : Texte */}
            <div className="col-md-6">
              <div className="main-page">
                <SectionTitle title={title} />
                <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#555" }}>
                  {description}
                </p>
              </div>
            </div>

            {/* Bloc droit : Image */}
            <div className="col-md-6">
              <div className="main-page">
              <Image
      src={image}         // source de l'image
      alt={'historique sgi mali'}           // texte alternatif
      className="img-responsive"    // classe CSS pour la fluidité
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
      width={500}              // largeur de l'image (à ajuster selon vos besoins)
      height={300}             // hauteur de l'image (à ajuster selon vos besoins)
      layout="intrinsic"       // option pour ajuster automatiquement la taille
    />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
