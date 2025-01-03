/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Active le mode strict de React pour la détection de bugs en développement
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/wp-content/uploads/**', // Autorise les images depuis localhost
      },
      {
        protocol: 'https',
        hostname: 'sgi.cynomedia-africa.com', // Ajoute ce domaine
        pathname: '/wp-content/uploads/**', // Autorise les images depuis ce chemin spécifique
      },
    ],
    domains: ['sgi.cynomedia-africa.com', 'localhost','sgimali-frontend.vercel.app'], // Ajoutez localhost ici
  },
  // D'autres configurations possibles si nécessaire
  async rewrites() {
    return [
      {
        source: '/api/images/:path*', // Toutes les requêtes qui commencent par '/api/images/'
        destination: 'https://sgi.cynomedia-africa.com/wp-content/uploads/:path*', // Destination vers le serveur WordPress
      },
    ];
  },
};

module.exports = nextConfig;
