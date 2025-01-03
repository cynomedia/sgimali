import ContactForm from "@/components/ContactForm";
import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import SkeletonTemplatePages from "@/components/skeleton/SkeletonTemplatePages";
import { Metadata } from "next";
import Image from "next/image";

// Type de données
type NouscontacterData = {
  title: string;
  description: string;
  image: string;
  slug: string;
  acf: {
    informations_generales: {
      localisation: string;
      telephone: string;
      adresse_email: string;
    };
    url_google_maps: string; // Ajoutez ici la propriété
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
  acf?: {
    informations_generales: {
      localisation: string;
      telephone: string;
      adresse_email: string;
    };
    url_google_maps: string;
  };
}

export const metadata: Metadata = {
  title: "NOUS CONTACTER | SGI Mali",
  description: "Page Nous Contacter SGI Mali",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  }
}

// Fonction pour récupérer les données de l'nouscontacter
async function getNouscontacter(): Promise<NouscontacterData[]> {
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
    acf: page.acf || { informations_generales: {}, url_google_maps: "" }, // Mapping des données ACF
  }));
}

export default async function Nouscontacter() {
  // Récupérer les données depuis l'API
  const dataNouscontacter = await getNouscontacter();

  if (!dataNouscontacter || dataNouscontacter.length === 0) {
    return <SkeletonTemplatePages />;
  }

  function formatTextWithLineBreaks(text: string) {
    return text.split("\r\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  }
  
  // Si une des pages a un slug égal à "nouscontacter", cette page sera retournée par la méthode find() et assignée à la variable nouscontacter.
  const nouscontacter = dataNouscontacter.find(page => page.slug === "nous-contacter");

  if (!nouscontacter || !nouscontacter.acf.informations_generales) {
    return <SkeletonHeaderPageSection />;
  }

  const { localisation, telephone, adresse_email } = nouscontacter.acf.informations_generales;
  const { url_google_maps } = nouscontacter.acf;


  return (
    <div>
      <HeaderPageSection title={nouscontacter.title} />
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title-block title-contac">
                <SectionTitle title={nouscontacter.title} />
              </div>
            </div>

            {/* Affichage des informations directement depuis ACF */}
            <div className="col-md-4">
              <div className="iconbox-inline">
                <span style={{ background: "#00a0e2", color: "white" }} className="fa fa-map-marker"/>
                <h4>Localisation</h4>
                <p style={{ fontSize: 14 }}>{formatTextWithLineBreaks(localisation)}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="iconbox-inline">
              <span style={{ background: "#00a0e2", color: "white" }} className="fa fa-phone"/>
                <h4>Téléphone</h4>
                <p style={{ fontSize: 14 }}>{formatTextWithLineBreaks(telephone)}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="iconbox-inline">
              <span style={{ background: "#00a0e2", color: "white" }} className="fa fa-envelope" />
                <h4>Email</h4>
                <p style={{ fontSize: 14 }}>{formatTextWithLineBreaks(adresse_email)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carte Google Maps */}
      {url_google_maps && (
        <div id="map-canvas" className="map-warp" style={{ height: 360 }}>
          <iframe
            src={url_google_maps}
            width="100%"
            height={450}
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
      {/* /Map */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="title-block title-contac">
              <SectionTitle title="Envoyer un message" />              
            </div>
          </div>

          <div className="col-md-6">
          <div
                  className="faq-description"
                  style={{ fontSize: 14, lineHeight: 1.8, color: "#555" }}
                  dangerouslySetInnerHTML={{ __html: nouscontacter.description }} // Affichage du contenu HTML
                />          
            <br/>
            <Image
                  src={nouscontacter.image || "/images/default.webp"} // Source de l'image
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
            <br/>
          </div>
          
          <ContactForm/>
          {/* <div className="col-md-6" style={{marginTop:-5}}>
            <div className="main-page">
              <form name="contactform" method="post" action="">
                <div className="form-group">
                  <label htmlFor="offer">
                    Nom et prénoms <span className="text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    placeholder="Nom et prénoms"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="offer">
                  Addresse Email <span className="text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Addresse Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="offer">
                  Objet <span className="text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    placeholder="Objet"
                  />
                </div>
                

                <div className="form-group">
                  <label htmlFor="offer">
                  Votre message <span className="text-danger">*</span>:
                  </label>
                  <textarea
                      name="comments"
                      className="form-control"
                      rows={5}
                      placeholder="Votre message"
                      defaultValue={""}
                    />
                </div>
                
                <div style={{float:'right'}}>
                <button type="submit" className="btn-main-color" style={{borderRadius:4, fontWeight:400, fontSize:15, paddingLeft:25, paddingRight:25, paddingTop:7, paddingBottom:7}}>            
            Envoyer
          </button>                    
              </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}
