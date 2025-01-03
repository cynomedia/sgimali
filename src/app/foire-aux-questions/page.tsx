import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import SkeletonTemplatePages from "@/components/skeleton/SkeletonTemplatePages";
import { Metadata } from "next";
import Image from "next/image";


// Type de données
type FaqItem = {
  question: string;
  reponse: string;
};

type FaqData = {
  title: string;
  description: string;
  image: string;
  slug: string;
  acf: {
    faq: FaqItem[];
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
    faq: FaqItem[];
  };
}

// Données statiques pour la FAQ



export const metadata: Metadata = {
  title: "FOIRE AUX QUESTIONS | SGI Mali",
  description: "Page Foire Aux Questions SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  }
}


// Fonction pour récupérer les données de la FAQ
async function getFaq(): Promise<FaqData[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pages?per_page=30`;
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch FAQ data");
  }

  const pages = await res.json();
  return pages.map((page: Page) => ({
    title: page.title.rendered,
    description: page.content.rendered,
    image: page.featured_image_url || "",
    slug: page.slug,
    acf: page.acf || { faq: [] }, // Inclure les champs ACF si disponibles
  }));
}



export default async function Faq() {
  // Récupérer les données depuis l'API
  const dataFaq = await getFaq();

  if (!dataFaq || dataFaq.length === 0) {
    return <SkeletonTemplatePages />;
  }

  // Trouver la page avec le slug correspondant
  const faq = dataFaq.find((page) => page.slug === "foire-aux-questions");

  if (!faq) {
    return <SkeletonHeaderPageSection />;
  }
  
    
  return (
    <div>            
      <HeaderPageSection title={faq.title} />      
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Bloc gauche : Texte */}
            <div className="col-md-8">
              <div className="main-page">
                <SectionTitle title={faq.title} />
                <div
                  className="faq-description"
                  style={{ fontSize: 14, lineHeight: 1.8, color: "#555" }}
                  dangerouslySetInnerHTML={{ __html: faq.description }} // Affichage du contenu HTML
                />

              </div>
            </div>

            {/* Bloc droit : Image */}
            <div className="col-md-4">
              <div className="main-page">
                <Image
                  src={faq.image || "/images/default.webp"} // Source de l'image
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
              </div>
            </div>
          </div>
          <br/>
          {/* FAQ Dynamique */}
          <div className="col-md-12">
              <div className="panel-group accordion-1" id="accordion">
              {faq.acf.faq.map((item, index) => (
                  <div key={index} className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <a
                          className="accordion-toggle collapsed"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href={`#collapse${index}`}
                        >
                          {item.question}
                        </a>
                      </h4>
                    </div>
                    <div
                      id={`collapse${index}`}
                      className="panel-collapse collapse"
                    >
                        <div className="panel-body">{item.reponse}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
        
      </section>
    </div>
  );
}
