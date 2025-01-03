"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image from "next/image";
import "animate.css";
import SkeletonSliderLoading from "./skeleton/Skeleton";

// Charger OwlCarousel uniquement côté client
const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

type Slide = {
  id: number;
  title: { rendered: string };
  description: string;
  button_text: string;
  button_link: string;
  alt_text: string;
  featured_image_url: string; // URL de l'image directement exposée via l'API
};

const BigSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isBrowser, setIsBrowser] = useState(false);
  const [loading, setLoading] = useState(true); // État de chargement



  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

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


  // Récupérer les données de l'API
  const fetchSlides = async () => {
    try {
      
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/slides`;
      
      // Construire l'URL complète pour les slides
      const res = await fetch(apiUrl, {
        next: { revalidate: 60 },
      }        
      ); // Requête vers l'API distante
  
      if (!res.ok) {
        throw new Error(`Failed to fetch slides, status: ${res.status}`);
      }
  
      const data = await res.json();
      setSlides(data); // Mettre à jour l'état avec les données récupérées
      setLoading(false); // Fin du chargement
    } catch (error) {
      console.error("Error fetching slides:", error); // Gérer les erreurs de requête
    }
  };
   

  useEffect(() => {
    setIsBrowser(true);
    fetchSlides();
  }, []);

  // Options pour OwlCarousel
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navText: [
      "<div class='nav-prev'>&#10094;</div>",
      "<div class='nav-next'>&#10095;</div>",
    ],
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 1 },
    },
  };


  
  return (
    <>
    {isBrowser && (
      <section id="slider" className="no-padding">
        {loading ? (
          // Affichage du Skeleton pendant le chargement
          <SkeletonSliderLoading />
        ) : (
          <OwlCarousel className="owl-theme" {...options}>
            {slides.map((slide) => (
              <div className="item" key={slide.id}>
                <div className="carousel-image">
                  <Image
                    src={ transformImageUrl(slide.featured_image_url) || "/placeholder.png"}
                    alt={slide.alt_text || "Slide Image"}
                    width={2560}
                    height={1280}
                    className="img-responsive"
                  />
                  <div className="overlay"></div>
                </div>
                <div className="carousel-caption">
                  <h3>{truncateText(slide.title.rendered, 25)}</h3>

                  <p
                    className="sl-s3"
                    style={{ fontFamily: '"Roboto Slab", serif' }}
                    dangerouslySetInnerHTML={{
                      __html: truncateText(slide.description, 55),
                    }}
                  />
                  {slide.button_text && (
                    <a
                      target="_blank"
                      href={slide.button_link}
                      className="btn btn-primary"
                    >
                      {slide.button_text}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}
      </section>
    )}
  </>
  );
};

export default BigSlider;
