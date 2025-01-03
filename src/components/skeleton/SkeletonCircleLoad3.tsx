import React from 'react';
import './WaveFooter.css'; // Importation du CSS pour le loader wave
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCircleLoad3 = () => {
  return (
    
        <div className="row">
          <div className="col-md-12">
            {/* Loader wave centré */}
            <div
              className="d-flex justify-content-left align-items-left"
              style={{ marginTop:25 }} // Centrer verticalement
            >
              <div className="wave-loader">
                <div className="wave2"></div>
                <div className="wave2"></div>
                <div className="wave2"></div>
              </div>
            </div>
          </div>
        </div>
    
  );
};

export default SkeletonCircleLoad3;
