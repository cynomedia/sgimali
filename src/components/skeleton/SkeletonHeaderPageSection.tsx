import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonHeaderPageSection: React.FC = () => {
  return (
    <div style={{ width: "100%", maxWidth: "1931px", height: "388px", margin: "0 auto" }}>
      <Skeleton
        height="100%"
        width="100%"
        style={{
          borderRadius: "8px",
          animationDuration: "2s", // Durée de l'animation augmentée
          animationTimingFunction: "ease-in-out", // Animation plus fluide
          animationDirection: "alternate", // Va-et-vient
          animationIterationCount: "infinite", // Animation continue
        }}
      />
    </div>
  );
};

export default SkeletonHeaderPageSection;
