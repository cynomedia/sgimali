import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";

export const metadata: Metadata = {
  title: "FORME JURIDIQUE | SGI Mali",
  description: "Page Forme juridique de SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale
    apple: "/apple-touch-icon.png", // Icône pour Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourcis
  },
  openGraph: {
    title: "FORME JURIDIQUE | SGI Mali",
    description: "Page Forme juridique de SGI Mali",
    url: "https://sgimali-frontend.vercel.app/forme-juridique", // URL canonique de la page
    siteName: "SGI Mali",
    images: [
      {
        url: "https://sgimali-frontend.vercel.app/images/favicon.png", // Image de prévisualisation pour Open Graph
        width: 120,
        height: 120,
        alt: "Logo SGI Mali",
      },
    ],
    locale: "fr_FR", // Langue et région
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // Type de carte Twitter
    title: "FORME JURIDIQUE | SGI Mali",
    description: "Page Forme juridique de SGI Mali",
    images: ["https://sgimali-frontend.vercel.app/images/favicon.png"], // Image partagée sur Twitter
  },
  manifest: "/site.webmanifest", // Fichier manifeste
};

const dataContent = {
  imageSrc: "/images/juridique.png", // Chemin de l'image
  title: "Forme Juridique",
  description: [
    "La SGI-Mali est une société anonyme régie par les dispositions légales édictées par le Conseil Régional de l’épargne Publique et des Marchés Financiers de l’Union Economique et Monétaire Ouest Africain (UEMOA). Elle est un établissement financier de statut et de fonctionnement dérogatoire à la réglementation bancaire, exclusivement soumise aux dispositions de la convention portant réglementation du Marché Financier Régional de l’UEMOA.",
    "En général, les Sociétés de Gestion et d’Intermédiation (SGI) sont une catégorie d’établissements financiers expressément soustraite de la règlementation bancaire. Les SGI sont autorisées, à titre exclusif, à exercer les activités de négociateur-compensateur de valeurs mobilières cotées pour le compte de tiers. Elles sont, en conséquence, habilitées à recevoir et à détenir des fonds du public dans le cadre de cette activité.",
    "Toutes les cessions sur titres cotés à la BRVM sont effectuées par l’entremise d’une SGI, sauf cas de dérogation accordée par la BRVM. Les SGI sont habilitées à exercer l'activité de teneur de compte de valeurs mobilières. Toutefois, les émetteurs pourront détenir leurs propres titres pour le compte de tiers. Le capital minimum des SGI est fixé par une instruction du Conseil Régional. Il est actuellement de 150 millions de FCFA. Les SGI sont obligatoirement constituées sous la forme juridique de Sociétés Anonymes. Les conditions d’agrément des SGI sont définies dans le Règlement Général du CREPMF et par l’Instruction 4/97 du CREPMF relative à l’agrément des Sociétés de Gestion et d’Intermédiation (SGI).",
  ],
};

export default function FormeJuridique() {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="FORME JURIDIQUE | SGI Mali" />
        <meta property="og:description" content="Page Forme juridique de SGI Mali" />
        <meta
          property="og:url"
          content="https://sgimali-frontend.vercel.app/forme-juridique"
        />
        <meta property="og:site_name" content="SGI Mali" />
        <meta property="og:image" content="https://sgimali-frontend.vercel.app/images/logo-og.png" />
        <meta property="og:image:width" content="120" />
        <meta property="og:image:height" content="120" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FORME JURIDIQUE | SGI Mali" />
        <meta name="twitter:description" content="Page Forme juridique de SGI Mali" />
        <meta name="twitter:image" content="https://sgimali-frontend.vercel.app/images/logo-og.png" />
        <title>FORME JURIDIQUE | SGI Mali</title>
      </Head>

      <HeaderPageSection title={"Forme Juridique"} />

      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Bloc gauche : Texte */}
            <div className="col-md-6">
              <div className="main-page">
                <SectionTitle title="Forme juridique" />
                <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#555" }}>
                {dataContent.description}
                </p>
              </div>
            </div>
            {/* Bloc droit : Image */}
            <div className="col-md-6">
              <div className="main-page">
              <Image
                  src={dataContent.imageSrc}
                  alt="Forme Juridique SGI Mali"
                  width={500}  // définir une largeur souhaitée
                  height={500} // définir une hauteur souhaitée
                  className="img-responsive"
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
