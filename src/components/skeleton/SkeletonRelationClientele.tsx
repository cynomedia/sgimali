import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonRelationClientele = () => {
  return (
    <section style={{ padding: "120px 0" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Bloc gauche : Texte */}
          <div className="col-md-6">
            <div className="main-page">
              {/* Skeleton pour le titre */}
              <Skeleton width={200} height={30} style={{ marginBottom: '20px', animationDuration: '1.2s' }} />
              {/* Skeleton pour la description */}
              <Skeleton width="90%" height={20} style={{ marginBottom: '15px', animationDuration: '1.2s' }} />
              <Skeleton width="85%" height={20} style={{ marginBottom: '15px', animationDuration: '1.2s' }} />
              <Skeleton width="80%" height={20} style={{ marginBottom: '15px', animationDuration: '1.2s' }} />
            </div>
          </div>

          {/* Bloc droit : Image */}
          <div className="col-md-6">
            <div className="main-page">
              {/* Skeleton pour l'image */}
              <Skeleton height={300} width="100%" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', animationDuration: '1.2s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonRelationClientele;
