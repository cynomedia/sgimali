import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonMotPresident = () => {
  return (
    <div className="container">
      {/* Titre de la section */}
      <div className="title-block text-center title-pd" style={{ marginTop: "-70px" }}>
        <Skeleton
          width={200} 
          height={30} 
          style={{ marginBottom: '10px', animationDuration: '1.2s' }} // Skeleton pour le titre
        />
        <Skeleton
          width={150} 
          height={20} 
          style={{ marginBottom: '20px', animationDuration: '1.2s' }} // Skeleton pour le sous-titre
        />
        <span className="bottom-title" />
      </div>

      {/* Contenu principal */}
      <div className="row align-items-center">
        {/* Colonne gauche : image */}
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          <Skeleton
            height={300} // Ajuster selon la taille de l'image
            width="100%" // Utilise 100% de la largeur de l'écran
            style={{ marginBottom: '20px', borderRadius: '8px' }}
          />
        </div>

        {/* Colonne droite : texte */}
        <div className="col-lg-6 col-md-12">
          <div className="content-container">
            {/* Titre de la section */}
            <Skeleton
              width="80%" 
              height={30} 
              style={{ marginBottom: '15px', animationDuration: '1.2s' }} // Skeleton pour le titre
            />

            {/* Description */}
            <Skeleton
              width="90%" 
              height={20} 
              style={{ marginBottom: '10px', animationDuration: '1.2s' }} // Skeleton pour la description
            />
            <Skeleton
              width="85%" 
              height={20} 
              style={{ marginBottom: '10px', animationDuration: '1.2s' }} // Skeleton pour plus de texte
            />

            {/* Bouton */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Skeleton
                width={150} 
                height={40} 
                borderRadius={20} 
                style={{ animationDuration: '1.2s' }} // Skeleton pour le bouton
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMotPresident;
