import React from 'react';
import './SkeletonLoader.css'; // Assure-toi de créer ce fichier CSS

export const SkeletonLoader = () => {
  return (
    <div className="row">
      {[...Array(6)].map((_, index) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
          <div className="news-card shadow">
            {/* Skeleton pour l'image */}
            <div className="skeleton-image"></div>
            <br />

            <div className="news-content p-3" style={{ marginLeft: 10, paddingBottom: 50 }}>
              {/* Skeleton pour le titre */}
              <div className="skeleton-text skeleton-title"></div>
              {/* Skeleton pour la date */}
              <div className="skeleton-text skeleton-date"></div>
              {/* Skeleton pour la catégorie */}
              <div className="skeleton-text skeleton-category"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
