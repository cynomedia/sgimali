import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLastestArticles = () => {
  return (
    <div className="row" style={{ marginBottom: "20px" }}>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="news-card shadow">
            {/* Skeleton pour le tag */}
            <div className="news-ta" style={{ float: "right" }}>
              <Skeleton width={120} height={30} /> {/* Augmenter la hauteur du tag */}
            </div>

            {/* Skeleton pour l'image */}
            <div className="w-full h-56 bg-gray-300 rounded-lg mb-3"> {/* Augmenter la hauteur de l'image et ajouter une marge sous l'image */}
              <Skeleton height="100%" width="100%" borderRadius={8} />
            </div>

            <div className="news-content p-3" style={{ padding: "20px" }}>
              {/* Skeleton pour le titre */}
              <h4 className="news-title">
                <Skeleton width="80%" height={40} /> {/* Augmenter la hauteur du titre */}
              </h4>
              {/* Skeleton pour la date */}
              <p className="news-date text-muted mt-2">
                <Skeleton width="60%" height={25} /> {/* Augmenter la hauteur de la date */}
              </p>
              <p className="news-date text-muted mt-2">
                <Skeleton width="50%" height={25} /> {/* Augmenter la hauteur de la date */}
              </p>
              <p className="news-date text-muted mt-2">
                <Skeleton width="60%" height={25} /> {/* Augmenter la hauteur de la date */}
              </p>
              <p className="news-date text-muted mt-2">
                <Skeleton width="30%" height={25} /> {/* Augmenter la hauteur de la date */}
              </p>
              <p className="news-date text-muted mt-2">
                <Skeleton width="60%" height={25} /> {/* Augmenter la hauteur de la date */}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLastestArticles;
