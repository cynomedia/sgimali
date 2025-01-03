import React from 'react';
import Image from 'next/image';
import SkeletonMotPresident from './skeleton/SkeletonMotPresident';
import Link from 'next/link';

// Définir les types pour les données récupérées
type MissionVision = {
  titre: string;
  description: string;
};

type ContentData = {
    bloc_mot_du_president: {
    titre: string;
    sous_titre: string;
    image: string;
    texte_alternatif_de_limage: string;
    missions_et_visions: MissionVision;
    lien_du_bouton: string;
  };
};

// Fonction pour récupérer les données à partir de l'API
async function getMotPresident(): Promise<ContentData[]> {
  

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/acf-options`;

  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  }); // Requête vers l'API distante

  if (!res.ok) {
    throw new Error("Failed to fetch mot du pr");
  }

  return res.json();
}



// Fonction pour transformer l'URL de l'image
function transformImageUrl(imageUrl: string): string {
  // Extraire les parties de l'URL : année, mois et nom de l'image
  const parts = imageUrl.split('/');
  const year = parts[parts.length - 3]; // L'année est l'avant-dernier élément
  const month = parts[parts.length - 2]; // Le mois est l'avant-avant-dernier élément
  const imageName = parts.pop(); // Le nom de l'image est le dernier élément
  // Construire l'URL locale pour l'image
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${year}/${month}/${imageName}`;
}

export default async function MotPresident() {

  
  const dataMotPresident = await getMotPresident();
  //console.log(dataMotPresident);


  if (!dataMotPresident || dataMotPresident.length === 0) {
    return <SkeletonMotPresident />;
  }

  // Accédez à la clé bloc_mot_du_president à l'intérieur des données récupérées
  const contentData = dataMotPresident[0].bloc_mot_du_president;
  // Transformer l'URL de l'image pour charger depuis votre API locale
  const imageUrl = transformImageUrl(contentData.image);




  return (
    <section className="bg-case-h9 py-5">
      <div className="container">
        {/* Titre de la section */}
        <div className="title-block text-center title-pd" style={{ marginTop: "-70px" }}>
          <h3 style={{ fontSize: 28, color: "#021039" }}>{contentData.titre}</h3>
          <p className="sub-title" style={{ fontSize: 15, lineHeight: 2 }}>
            {contentData.sous_titre}
          </p>
          <span className="bottom-title" />
        </div>

        {/* Contenu principal */}
        <div className="row align-items-center">
          {/* Colonne gauche : image */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            {/* src={contentData.image} */}
            <Image
              src={imageUrl}              
              alt={contentData.texte_alternatif_de_limage}
              className="img-responsive img-thumbnail"
              style={{ marginBottom: 20, borderColor: "#f8f8f8 !important" }}
              width={1024}
              height={683}
            />
          </div>

          {/* Colonne droite : texte */}
          <div className="col-lg-6 col-md-12">
            <div className="content-container">
              <h3 className="text-title" style={{ fontSize: 22, fontWeight: "bold", color: "#333" }}>
              {contentData.missions_et_visions.titre}
              </h3>
          
              <div
  className="mission-description"
  style={{
    fontSize: 14, 
    color: "#555", 
    lineHeight: 1.8,
  }}
  dangerouslySetInnerHTML={{
    __html: contentData.missions_et_visions.description,
  }}
/>
          </div>


          
              <center>
                <Link
                  href={contentData.lien_du_bouton}
                  className="btn btn-primary mt-3 mission-description"
                  style={{
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#00a0e2",
                  }}
                >
                  En savoir plus
                </Link>
              </center>
            </div>
          </div>
        </div>
      
    </section>
  );
};


