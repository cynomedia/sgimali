"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Importer Image de Next.js si vous l'utilisez
import Link from "next/link";

// Définir les types pour les données de service
type Service = {
  titre: string;
  image: string;  // L'image est maintenant une chaîne de caractères (URL)
  description: string;
  lien: string;
  backgroundcolor: string;
};

type BlocServices = {
  bloc_services: {
    titre: string;
    description: string;
    services: Service[];
  };
};


const NoServices = () => {
  // Définir le contenu dynamique avec les couleurs de fond et autres détails

  // Déclarez les états
  const [blocserviceData, setBlocserviceData] = useState<BlocServices[]>([]); // Stocke les services
  const [loading, setLoading] = useState<boolean>(true); // Indique si les données sont en cours de chargement

  function transformImageUrl(imageUrl: string): string {
    // Extraire les parties de l'URL : année, mois et nom de l'image
    const parts = imageUrl.split("/");
    const year = parts[parts.length - 3]; // L'année est l'avant-dernier élément
    const month = parts[parts.length - 2]; // Le mois est l'avant-avant-dernier élément
    const imageName = parts.pop(); // Le nom de l'image est le dernier élément
    // Construire l'URL locale pour l'image
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${year}/${month}/${imageName}`;
  }

  const fetchBlocServicesData = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/acf-options`;

      // Construire l'URL complète pour les slides
      const res = await fetch(apiUrl, {
        next: { revalidate: 60 },
      }); // Requête vers l'API distante

      if (!res.ok) {
        throw new Error(`Failed to fetch service, status: ${res.status}`);
      }

      const data = await res.json();
      setBlocserviceData(data); // Mettre à jour l'état avec les données récupérées
      setLoading(false); // Fin du chargement
      //console.log(blocserviceData);
      //console.log(serviceData[0].bloc_services);
      console.log("serviceData[0].bloc_services.image");
      //console.log(data[0].bloc_services.services);
      //console.log("serviceData[0].bloc_services.services");
      //console.log(serviceData[0].bloc_services.services);
      //
    } catch (error) {
      console.error(error); // Ou un log utile
    }
  };

  useEffect(() => {
    fetchBlocServicesData();
  }, []);

  return (
    <>
      {loading ? (
        <p></p>
      ) : (
        <section className="no-padding" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div
                  className="title-block text-center"
                  style={{ marginTop: 0, marginBottom: 20 }}
                >
                  <h3 style={{ fontSize: 28, color: "#021039" }}>
                    {blocserviceData[0]?.bloc_services?.titre}
                  </h3>
                  <p
                    className="sub-title"
                    style={{ fontSize: 15, lineHeight: 2 }}
                  >
                    {blocserviceData[0]?.bloc_services?.description}
                  </p>
                  <span className="bottom-title" />
                </div>

                <div className="warp-full-width services-h1-warp offer-h10-warp">
                  {/* Itérer sur contentData pour afficher chaque service */}
                  {/* data[0].bloc_services.services */}
                  {blocserviceData[0]?.bloc_services?.services.map(
                    (service, index) => (
                      <Link key={index} href={service.lien}>
                        <div
                          className="col-md-4 col-sm-6"
                          style={{ backgroundColor: service.backgroundcolor }}
                        >
                          <div className="item-offer-h10">
                            <div className="iconbox-type-xs text-center">
                              {/* Vérifier s'il y a une image ou une icône */}
                              {service.image ? (
                                <center>
                                  <Image
                                    src={transformImageUrl(service.image)} // Utilisez une image par défaut si service.image est vide
                                    className="img img-responsive img-circle"
                                    width={105}
                                    height={20}
                                    alt={service.titre || "Service image"}
                                  />
                                </center>
                              ) : (
                                <i
                                  className="fas fa-camera" // Utilisation d'une icône fixe Font Awesome
                                  style={{ fontSize: 60, color: "white" }}
                                />
                              )}

                              <h4
                                style={{
                                  fontSize: 21,
                                  marginBottom: "-1px",
                                  color: "white",
                                }}
                              >
                                {service.titre}
                              </h4>
                              <p
                                style={{
                                  fontSize: 14,
                                  color: "white",
                                  marginTop: 7,
                                }}
                              >
                                {service.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default NoServices;
