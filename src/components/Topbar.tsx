// components/Topbar.js
"use client";
import React, { useEffect, useState } from "react";
import SkeletonCircleLoad from "./skeleton/SkeletonCircleLoad";



// Définir les types pour les données récupérées
type TopbarData = {
  bloc_header: {
    contacts_et_localisation: {
      localisation: string;
      adresse_mail: string;
      telephone: string;
    };
    reseaux_sociaux: {
      facebook: string;
      twitter: string;
      whatsapp: string;
      linkedin: string;
    };
  };
};

const Topbar = () => {
  const [topbardata, setTopbarData] = useState<TopbarData[]>([]);
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(true); // État de chargement

  // Récupérer les données de l'API
  const fetchTopbarData = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/acf-options`;

      // Construire l'URL complète pour les slides
      const res = await fetch(apiUrl, {
        next: { revalidate: 60 },
      }); // Requête vers l'API distante

      if (!res.ok) {
        throw new Error(`Failed to fetch Topbar, status: ${res.status}`);
      }

      const data = await res.json();
      setTopbarData(data); // Mettre à jour l'état avec les données récupérées
      setLoading(false); // Fin du chargement
      console.log(topbardata);
    } catch (error) {
      console.error("Error fetching top bar:", error); // Gérer les erreurs de requête
    }
  };

  useEffect(() => {
    setIsBrowser(true);
    fetchTopbarData();
  }, []);

  return (
    <>
      {isBrowser &&
        (loading ? (
          <SkeletonCircleLoad/>
        ) : (
            <div
            className="topbar tb-dark tb-md"
            style={{ background: "#0a2c4f !important" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="topbar-home2">
                    <div className="tb-contact tb-iconbox">
                      <ul>
                        <li>
                          <a href="contact.html">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            />
                            <span>
                              <div>
                                {topbardata[0].bloc_header.contacts_et_localisation.localisation
                                  .split("\n") // Diviser la chaîne par retour à la ligne
                                  .map((line, index) => (
                                    <span key={index}>
                                      {line}
                                      <br />
                                    </span> // Ajouter <br /> à chaque ligne
                                  ))}
                              </div>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href={`mailto:${topbardata[0].bloc_header.contacts_et_localisation.adresse_mail}`}
                          >
                            <i className="fa fa-envelope" aria-hidden="true" />
                            <span>
                              {topbardata[0].bloc_header.contacts_et_localisation.adresse_mail
                                .split("\n") // Diviser la chaîne par retour à la ligne
                                .map((line, index) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                  </span> // Ajouter <br /> à chaque ligne
                                ))}
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href={`tel:${topbardata[0].bloc_header.contacts_et_localisation.telephone}`}
                          >
                            <i className="fa fa-phone" aria-hidden="true" />
                            <span>
                              {topbardata[0].bloc_header.contacts_et_localisation.telephone
                                .split("\n") // Diviser la chaîne par retour à la ligne
                                .map((line, index) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                  </span> // Ajouter <br /> à chaque ligne
                                ))}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tb-social-lan language">
                      <ul>
                        
                      <li>
                        
                        &nbsp;&nbsp;
                        
                        </li>
                        <li>
                          <a style={{color:"white", backgroundColor:"#019ee2", padding:10, borderRadius:3, opacity:1, fontWeight:700}} target="_blank" href="https://www.sgimali.net/">
                          <i className="fa fa-user"></i>
                          &nbsp;
                            Espace Client
                          </a>
                        </li>
                        <li>
                          <a
                            href={
                              topbardata[0].bloc_header.reseaux_sociaux.facebook
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="facebook"
                            target="_blank"
                          >
                            <i className="fab fa-facebook" aria-hidden="true" />
                          </a>
                        </li>
                        <li>
                          <a
                            href={
                              topbardata[0].bloc_header.reseaux_sociaux.twitter
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="twitter"
                            target="_blank"
                          >
                            <i
                              className="fa-brands fa-x-twitter"
                              aria-hidden="true"
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href={
                              topbardata[0].bloc_header.reseaux_sociaux.whatsapp
                            }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="whatsapp"
                            target="_blank"
                          >
                            <i className="fab fa-whatsapp" aria-hidden="true" />
                          </a>
                        </li>
                        
                        <li>
                          <a
                            href={
                              topbardata[0].bloc_header.reseaux_sociaux.linkedin
                            }
                            target="_blank"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="linkedin"
                          >
                            <i className="fab fa-linkedin" aria-hidden="true" />
                          </a>
                        </li>
                        
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
export default Topbar;
