import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import SkeletonTemplatePages from "@/components/skeleton/SkeletonTemplatePages";
import SubscriptionForm from "@/components/SubscriptionForm";
import { Metadata } from "next";
import Image from "next/image";

// Type de données
type SouscriptionData = {
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
  title: "SOUSCRIPTION | SGI Mali",
  description: "Page Nous Contacter SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  },
};

// Fonction pour récupérer les données de l'souscription
async function getSouscription(): Promise<SouscriptionData[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages?per_page=30`;
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch nous contacter data");
  }

  const pages = await res.json();
  return pages.map((page: Page) => ({
    title: page.title.rendered,
    description: page.content.rendered, // Récupération du contenu HTML
    image: page.featured_image_url || "", // Récupération de l'URL de l'image mise en avant
    slug: page.slug,
  }));
}

export default async function Souscription() {
  const dataSouscription = await getSouscription();

  if (!dataSouscription || dataSouscription.length === 0) {
    return <SkeletonTemplatePages />;
  }

  
  // Si une des pages a un slug égal à "souscription", cette page sera retournée par la méthode find() et assignée à la variable souscription.
  const souscription = dataSouscription.find(
    (page) => page.slug === "souscription"
  );

  if (!souscription) {
    return <SkeletonHeaderPageSection />;
  }

  return (
    <div>
      <HeaderPageSection title={souscription.title} />

      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Bloc gauche : Texte */}

            <div className="col-md-12">
              <div className="title-block title-contac">
                <SectionTitle title={souscription.title} />
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="faq-description"
                style={{ fontSize: 14, lineHeight: 1.8, color: "#555" }}
                dangerouslySetInnerHTML={{ __html: souscription.description }} // Affichage du contenu HTML
              />
              <br />
              <Image
                src={souscription.image || "/images/default.webp"} // Source de l'image
                alt="Faq SGI Mali" // Texte alternatif
                className="img img-responsive"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                width={500}
                height={300}
                layout="intrinsic"
              />
              <br />
            </div>
            {/* Bloc droit : Image */}
            <SubscriptionForm/>
          </div>
        </div>
      </section>
    </div>
  );
}
