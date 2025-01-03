import React from "react";

interface Job {
  code: string;
  title: string;
  location: string;
  department: string;
  expireIn: string;
  contractType: string;
  experience: string;
  skills: string;
  mission: string;
}

interface JobDetailsProps {
  job: Job;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  return (
    <tr className="details-row" style={{ display: "none" }}>
      <td colSpan={5}>
        <div className="job-details row">
          {/* Colonne 1 : Détails de l'offre */}
          <div className="col-md-6">
            <div className="apply-form">
              <h5>Détails de l&apos;offre</h5>
              <form>
                <div className="job-detail-section">
                  <div className="detail-card">
                    <p className="job-detail-title">Type de contrat:</p>
                    <p className="job-detail-description">{job.contractType}</p>
                  </div>
                  <div className="detail-card">
                    <p className="job-detail-title">Expérience requise:</p>
                    <p className="job-detail-description">{job.experience}</p>
                  </div>
                  <div className="detail-card">
                    <p className="job-detail-title">Compétences:</p>
                    <p className="job-detail-description">{job.skills}</p>
                  </div>
                  <div className="detail-card">
                    <p className="job-detail-title">Mission:</p>
                    <p className="job-detail-description">{job.mission}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Colonne 2 : Formulaire de candidature */}
          <div className="col-md-6">
            <div className="apply-form">
              <h5>Formulaire de candidature</h5>
              <form>
                {/* Sélection de l'offre */}
                <div className="form-group">
                  <label htmlFor="jobCode">Code de l&apos;offre</label>
                  <select className="form-control" id="jobCode" required>
                    <option value={job.code}>
                      {job.code} - {job.title}
                    </option>
                  </select>
                </div>

                {/* Nom et prénoms */}
                <div className="form-group">
                  <label htmlFor="firstName">Nom et prénoms</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                {/* Téléphone */}
                <div className="form-group">
                  <label htmlFor="phone">Votre téléphone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Votre téléphone"
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Votre email"
                    required
                  />
                </div>

                {/* CV */}
                <div className="form-group">
                  <label htmlFor="cv">Votre CV</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="cv"
                    required
                  />
                </div>

                {/* Bouton de soumission */}
                <div className="form-submit col-md-3">
                  <button type="submit" className="btn_valider">
                    Postuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default JobDetails;
