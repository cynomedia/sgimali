import React from "react";
import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import Script from "next/script";
import { Metadata } from "next";
import { format } from "date-fns";
import JobApplicationForm from "@/components/JobApplicationForm";

// Déclaration des métadonnées pour la page
export const metadata: Metadata = {
  title: "OFFRES D'EMPLOI | SGI Mali",
  description: "Offre d'emploi",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  openGraph: {
    images: [{ url: "https://sgimali-frontend.vercel.app/images/favicon.png" }],
  },
  manifest: "/site.webmanifest",
};

// Déclaration des types TypeScript
type JobOffer = {
  id: number;
  title: { rendered: string };
  acf: {
    localisation?: string;
    departement?: string;
    date_dexpiration?: string;
    type_de_contrat?: string;
    experience_requise?: string;
    competences?: string;
    missions?: string;
  };
};

// Fonction pour récupérer les données via fetch
async function getJobOffers(): Promise<JobOffer[]> {
  const res = await fetch(
    "https://sgi.cynomedia-africa.com/wp-json/wp/v2/job_offers",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des offres d'emploi");
  }

  return res.json();
}

// Fonction utilitaire pour formater la date avec date-fns
function formatDate(dateString?: string): string {
  if (!dateString || dateString.length !== 8) return "Non spécifié";

  // Reformater la date en YYYY-MM-DD
  const formattedString = `${dateString.slice(0, 4)}-${dateString.slice(
    4,
    6
  )}-${dateString.slice(6, 8)}`;

  const date = new Date(formattedString);

  if (isNaN(date.getTime())) {
    return "Date invalide";
  }

  return format(date, "dd/MM/yyyy");
}

// Composant principal
export default async function Emploi() {
  const jobOffers = await getJobOffers();

  return (
    <div>
      <HeaderPageSection title={"Offres d'emploi"} />
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <SectionTitle title="Offres disponibles" />
          <JobOffersTable jobOffers={jobOffers} />
        </div>
      </section>

      <Script id="toggle-details-script">
        {`
          document.querySelectorAll('.details-row').forEach((row) => {
            row.style.display = "none";
          });

          document.querySelectorAll('.clickable-row').forEach((row) => {
            row.addEventListener('click', function() {
              const detailsRow = this.nextElementSibling;
              if (detailsRow.style.display === "table-row") {
                detailsRow.style.display = "none";
              } else {
                document.querySelectorAll('.details-row').forEach((otherDetailsRow) => {
                  otherDetailsRow.style.display = "none";
                });
                detailsRow.style.display = "table-row";
              }
            });
          });
        `}
      </Script>
    </div>
  );
}

// Composant pour afficher les offres d'emploi dans un tableau
const JobOffersTable: React.FC<{ jobOffers: JobOffer[] }> = ({ jobOffers }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="list-job-warp">
        <div className="table-warp">
          <div className="table-responsive">
            <table className="table table-hover table-reset">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Intitulé du poste</th>
                  <th>Localisation</th>
                  <th>Département</th>
                  <th>Expire le</th>
                </tr>
              </thead>
              <tbody>
                {jobOffers.map((job) => (
                  <React.Fragment key={job.id}>
                    <tr className="clickable-row">
                      <td>{job.id}</td>
                      <td>{job.title.rendered}</td>
                      <td>{job.acf.localisation || "Non spécifié"}</td>
                      <td>{job.acf.departement || "Non spécifié"}</td>
                      <td>{formatDate(job.acf.date_dexpiration)}</td>
                    </tr>
                    <JobDetailsRow job={job} />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Composant pour afficher les détails d'une offre
const JobDetailsRow: React.FC<{ job: JobOffer }> = ({ job }) => (
  <tr className="details-row">
    <td colSpan={5}>
      <div className="job-details row">
        <JobDetailsColumn job={job} />
        <JobApplicationForm jobOffers={[job]} />
      </div>
    </td>
  </tr>
);

// Colonne pour les détails de l'offre
const JobDetailsColumn: React.FC<{ job: JobOffer }> = ({ job }) => (
  <div className="col-md-6">
    <div className="apply-form">
      <h5>Détails de l&apos;offre</h5>
      <div className="job-detail-section">
        <DetailCard
          title="Type de contrat"
          description={job.acf.type_de_contrat}
        />
        <DetailCard
          title="Expérience requise"
          description={job.acf.experience_requise}
        />
        <DetailCard title="Compétences" description={job.acf.competences} />
        <DetailCard title="Mission" description={job.acf.missions} />
      </div>
    </div>
  </div>
);

// Composant pour afficher un détail
const DetailCard: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => (
  <div className="detail-card">
    <p className="job-detail-title">{title}:</p>
    <p className="job-detail-description">{description || "Non spécifié"}</p>
  </div>
);

// Formulaire de candidature
