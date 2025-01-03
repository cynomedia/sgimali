import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonSliderLoading = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Centrer verticalement
        alignItems: 'center',        
        backgroundColor: '#f9f9f9',
        padding: '10px', // Réduit le padding pour mieux s'adapter aux petits écrans
        minHeight: '100vh', // Assure que la hauteur soit toujours 100vh        
      }}
    >
      {/* Conteneur pour les lignes animées */}
      <div
        style={{
          width: '100%', // Utilise 100% de la largeur disponible
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <Skeleton
          width="100%" // 100% pour s'adapter à la largeur
          height={20}
          style={{ marginBottom: '10px', animationDuration: '1.2s' }}
        />
        <Skeleton
          width="80%" // Réduit la largeur à 80% pour plus d'équilibre
          height={20}
          style={{ marginBottom: '10px', animationDuration: '1.2s' }}
        />
        <Skeleton
          width="60%" // Réduit encore la largeur sur mobile
          height={20}
          style={{ marginBottom: '10px', animationDuration: '1.2s' }}
        />
      </div>

      {/* Skeleton pour l'image */}
      <div
        style={{
          width: '100%', // Assure que l'image occupe toute la largeur disponible
          height: 'auto', // Laisse l'image s'ajuster en fonction de son ratio
          maxHeight: '350px', // Limite la hauteur de l'image à 350px pour mobile
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Skeleton
          height="100%" 
          width="100%" 
          borderRadius={8} 
          style={{ animationDuration: '1.2s' }} 
        />
      </div>

      {/* Skeleton pour les textes */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Skeleton pour le titre */}
        <Skeleton
          width="60%" // Réduit la largeur pour que ça s'adapte mieux aux petits écrans
          height={30}
          style={{
            marginBottom: '15px',
            animationDuration: '1.2s',
          }}
        />
        <Skeleton
          width="60%" // Même largeur que pour le premier titre
          height={30}
          style={{
            marginBottom: '15px',
            animationDuration: '1.2s',
          }}
        />

        {/* Skeleton pour la description */}
        <Skeleton
          width="70%"
          height={20}
          style={{
            marginBottom: '10px',
            animationDuration: '1.2s',
          }}
        />
        <Skeleton
          width="60%"
          height={20}
          style={{
            marginBottom: '10px',
            animationDuration: '1.2s',
          }}
        />

        {/* Skeleton pour le bouton */}
        <div style={{ marginTop: '20px' }}>
          <Skeleton
            width={150}
            height={40}
            borderRadius={20}
            style={{
              animationDuration: '1.2s',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonSliderLoading;
