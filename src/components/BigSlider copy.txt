// src/components/BigSlider.tsx
"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamique pour charger OwlCarousel côté client
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image from "next/image";
import "animate.css";

// Charger OwlCarousel uniquement côté client
const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

const BigSlider = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

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
    animateOut: "fadeOut", // Animation pour la sortie
    animateIn: "fadeIn",   // Animation pour l'entrée
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
          <OwlCarousel className="owl-theme" {...options}>
            {/* Slide 1 */}
            <div className="item">
              <div className="carousel-image">
                <Image
                  src="/images/Slider/s00.png"
                  alt="Image 1"
                  width={1200}
                  height={800}
                  className="img-responsive"
                />
                <div className="overlay"></div> {/* Overlay */}
              </div>
              <div className="carousel-caption">
                <h3>LA SGI-MALI VOUS SOUHAITE SUR LE NOUVEAU SITE ...</h3>
                <p className="sl-s3" style={{ fontFamily: '"Roboto Slab", serif' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
                <a href="#" className="btn btn-primary">
                  Détails
                </a>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="item">
              <div className="carousel-image">
                <Image
                  src="/images/Slider/slide2.png"
                  alt="Image 2"
                  width={1200}
                  height={800}
                  className="img-responsive"
                />
                <div className="overlay"></div> {/* Overlay */}
              </div>
              <div className="carousel-caption">
                <h3>LA SGI-MALI VOUS SOUHAITE</h3>
                <p className="sl-s3" style={{ fontFamily: '"Roboto Slab", serif' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
                <a href="#" className="btn btn-primary">
                  Détails
                </a>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="item">
              <div className="carousel-image">
                <Image
                  src="/images/Slider/s00.png"
                  alt="Image 3"
                  width={1200}
                  height={800}
                  className="img-responsive"
                />
                <div className="overlay"></div> {/* Overlay */}
              </div>
              <div className="carousel-caption">
                <h3>LA SGI-MALI VOUS SOUHAITE</h3>
                <p className="sl-s3" style={{ fontFamily: '"Roboto Slab", serif' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit...
                </p>
                <a href="#" className="btn btn-primary">
                  Détails
                </a>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="item">
              <div className="carousel-image">
                <Image
                  src="/images/Slider/slide2.png"
                  alt="Image 4"
                  width={1200}
                  height={800}
                  className="img-responsive"
                />
                <div className="overlay"></div> {/* Overlay */}
              </div>
              <div className="carousel-caption">
                <h3>LA SGI-MALI VOUS SOUHAITE</h3>
                <p className="sl-s3" style={{ fontFamily: '"Roboto Slab", serif' }}>
                  Lorem ipsum dolor sit amet consectet adipisicing elit...
                </p>
                <a href="#" className="btn btn-primary">
                  Détails
                </a>
              </div>
            </div>

          </OwlCarousel>
        </section>
      )}
    </>
  );
};

export default BigSlider;
