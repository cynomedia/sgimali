"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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

  

  
  const slides = [
    {
      image: "/images/Slider/s00.png",
      alt: "Image 1",
      title: "LA SGI-MALI VOUS SOUHAITE SUR LE NOUVEAU SITE ...",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      buttonText: "Détails",
      buttonLink: "#",
    },
    {
      image: "/images/Slider/slide2.png",
      alt: "Image 2",
      title: "LA SGI-MALI VOUS SOUHAITE",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      buttonText: "Détails",
      buttonLink: "#",
    },
    {
      image: "/images/Slider/s00.png",
      alt: "Image 3",
      title: "LA SGI-MALI VOUS SOUHAITE",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      buttonText: "Détails",
      buttonLink: "#",
    },
    {
      image: "/images/Slider/slide2.png",
      alt: "Image 4",
      title: "LA SGI-MALI VOUS SOUHAITE",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      buttonText: "Détails",
      buttonLink: "#",
    },
  ];

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
          <OwlCarousel className="owl-theme" {...options}>
            {slides.map((slide, index) => (
              <div className="item" key={index}>
                <div className="carousel-image">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    width={2560}
                    height={1280}
                    className="img-responsive"
                  />
                  <div className="overlay"></div>
                </div>
                <div className="carousel-caption">
                  <h3>{slide.title}</h3>
                  <p className="sl-s3" style={{ fontFamily: '"Roboto Slab", serif' }}>
                    {slide.description}
                  </p>
                  <a href={slide.buttonLink} className="btn btn-primary">
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </section>
      )}
    </>
  );
};

export default BigSlider;
