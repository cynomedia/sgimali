import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const url = request.url;

  // Vérifier la présence du cookie X-Authorized
  const isAuthorized = request.cookies.get('X-Authorized') === 'true';
  const isAuthPage = url.includes('/auth');
  const isMaintenancePage = url.includes('/maintenance');

  // Vérifie si le site est en maintenance et si l'utilisateur est autorisé
  if (maintenanceMode && !isAuthorized && !isAuthPage && !isMaintenancePage) {
    // Redirige l'utilisateur non autorisé vers la page de maintenance
    return NextResponse.redirect(new URL('/maintenance', url));
  }

  // Si l'utilisateur est autorisé ou si le mode maintenance est désactivé, continuer l'accès
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth', '/maintenance', '/articles', '/historique', '/forme-juridique', '/actionnariat', '/mission', '/notre-equipe', '/organisation', '/relation-clientele', '/privatisation', '/financement-des-entreprises', '/gestion-des-portefeuilles', '/gestion-du-registre-des-actionnaires', '/intermediation', '/emissions-demprunts-prives', '/emissions-demprunts-publics', '/capacite-de-placement-de-titre', '/publications', '/souscription', '/nous-contacter', '/foire-aux-questions', '/notre-actualite'],
};
