import Image from "next/image";
import { useEffect, useState } from "react";

export default function AnimationPage({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(100); // Compteur initial

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 10); // Décrémenter toutes les secondes

    if (counter === 0) {
      clearInterval(interval);
      onComplete(); // Appeler la fonction de redirection
    }

    return () => clearInterval(interval); // Nettoyage
  }, [counter, onComplete]);

  return (
    <div className="container-fluid" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#0a2c4f" }}>
    <div className="text-center" style={{ color: "white" }}>
      {/* <div className="animate-bounce text-3xl font-bold">Bienvenue</div> */}
      <Image
        src="/images/new-logo.png" // Chemin relatif
        alt="Image"
        width={151}  // Largeur de l'image
        height={38} // Hauteur de l'image
      />
      <p className="mt-4"> {counter} %</p>
    </div>
  </div>
  );
}
