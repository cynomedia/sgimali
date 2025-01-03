"use client"
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Identifiants d'accès autorisés (vous pouvez les stocker dans une variable d'environnement pour plus de sécurité)
  const validUsername = 'admin';
  const validPassword = 'password123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier les identifiants
    if (username === validUsername && password === validPassword) {
      // Authentification réussie, accéder au contenu
      localStorage.setItem('authenticated', 'true'); // Sauvegarde dans localStorage ou sessionStorage
      router.push('/'); // Redirige vers la page d'accueil ou une autre page protégée
    } else {
      // Afficher un message d'erreur si les identifiants sont incorrects
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <html lang="fr">
      <head>
        {/* Inclure Bootstrap et Font Awesome */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <style>
          {`
            /* Animation du brouillard */
            @keyframes fog {
              0% {
                transform: translateX(-100%) scale(1);
              }
              50% {
                transform: translateX(0%) scale(1.1);
              }
              100% {
                transform: translateX(100%) scale(1);
              }
            }

            .fog-layer {
              position: absolute;
              top: 0;
              left: 0;
              width: 200%;
              height: 100%;
              background: url('/fog.png') repeat-x;
              opacity: 0.6;
              animation: fog 20s linear infinite;
            }

            .fog-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              z-index: -1; /* Derrière le contenu */
              background: linear-gradient(180deg, #1b2735 0%, #090a0f 100%);
            }

            .auth-wrapper {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              padding: 20px;
              color: #ffffff;
              text-align: center;
            }

            .auth-wrapper h1 {
              font-size: 3rem;
              font-weight: bold;
              margin-bottom: 20px;
            }

            .auth-wrapper p {
              font-size: 1.2rem;
              margin-bottom: 10px;
            }

            /* Animation de l'icône de rouage (cog) */
            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            .rotate-icon {
              font-size: 4rem;
              animation: rotate 2s linear infinite;
              margin-bottom: 20px;
              color: #ffffff;
            }

            /* Animation de la date */
            @keyframes blinkZoom {
              0% {
                opacity: 1;
                transform: scale(1);
                color: #00a0e2; /* Rouge #ff0000*/
              }
              50% {
                opacity: 0.5;
                transform: scale(1.2);
                color: #ff0000; /* Rouge */
              }
              100% {
                opacity: 1;
                transform: scale(1);
                color: #00a0e2; /* Rouge */
              }
            }

            .date {
              font-size: 2rem;
              font-weight: bold;
              animation: blinkZoom 1.5s ease-in-out infinite;
            }
          `}
        </style>
      </head>
      <body>
        <div className="fog-container">
          {/* Fond animé avec plusieurs couches */}
          <div className="fog-layer"></div>
          <div className="fog-layer" style={{ animationDelay: '5s' }}></div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div className="auth-wrapper">
                {/* Logo ou autre image */}
                <Image
                  src="/images/new-logo.png"
                  className="img-responsive"
                  alt="Logo"
                  width={151} // Largeur de l'image
                  height={38} // Hauteur de l'image
                />
                <br />
                {/* Icône de rouage animée */}
                <i className="fas fa-cog rotate-icon"></i>
                <h1 style={{ marginTop: -10 }}>Page d'Authentification</h1>
                <p>Veuillez vous connecter pour accéder au site.</p>
                <p>
                  <strong>Connexion sécurisée</strong>
                </p>
                {/* Formulaire de connexion */}
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="form-control"
                    style={{ marginBottom: '10px' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    className="form-control"
                    style={{ marginBottom: '20px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn btn-primary btn-block" type="submit">
                    Se connecter
                  </button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p>Merci de votre compréhension !</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
