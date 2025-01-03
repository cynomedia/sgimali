import React from 'react';
import './WaveLoader.css'; // Importation du CSS pour le loader wave
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCircleLoad = () => {
  return (
    <div className="topbar tb-dark tb-md" style={{ background: "#0a2c4f" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* Loader wave centré */}
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '100vh', marginTop:25 }} // Centrer verticalement
            >
              <div className="wave-loader">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCircleLoad;
