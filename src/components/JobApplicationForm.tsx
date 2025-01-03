"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner"; // Import du composant Spinner

type JobOffer = {
  id: number;
  title: { rendered: string };
};

const JobApplicationForm: React.FC<{ jobOffers: JobOffer[] }> = ({ jobOffers }) => {
  const [formData, setFormData] = useState({
    jobCode: jobOffers.length > 0 ? jobOffers[0].id : "",
    firstName: "",
    phone: "",
    email: "",
    cv: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (jobOffers.length > 0 && !formData.jobCode) {
      setFormData((prevData) => ({
        ...prevData,
        jobCode: jobOffers[0].id,
      }));
    }
  }, [jobOffers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, cv: e.target.files[0] });
    }
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.email || !formData.phone || !formData.jobCode || !formData.cv) {
      Swal.fire({
        icon: "error",
        title: "Validation échouée",
        text: "Tous les champs sont obligatoires.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    const selectedJobOffer = jobOffers.find((offer) => offer.id === Number(formData.jobCode));
    const jobTitle = selectedJobOffer ? selectedJobOffer.title.rendered : "Offre inconnue";

    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("subject", `ID Offre: ${formData.jobCode} - ${jobTitle}`);
    formDataToSend.append("telephone", formData.phone);
    formDataToSend.append("cv", formData.cv as Blob);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/apply-job/`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Erreur API:", errorResponse);
        throw new Error("Erreur lors de l'envoi de la candidature");
      }

      Swal.fire({
        icon: "success",
        title: "Félicitation",
        text: "Votre candidature a été envoyée avec succès !",
      });

      setFormData({
        jobCode: jobOffers.length > 0 ? jobOffers[0].id : "",
        firstName: "",
        phone: "",
        email: "",
        cv: null,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de l'envoi de votre candidature.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-6">
      <div className="apply-form">
        <h5>Formulaire de candidature</h5>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            <div className="form-group">
              <label htmlFor="jobCode">Code de l&apos;offre</label>
              <select
                className="form-control"
                id="jobCode"
                name="jobCode"
                value={formData.jobCode}
                onChange={handleInputChange}
                required
              >
                {jobOffers.map((offer) => (
                  <option key={offer.id} value={offer.id}>
                    {offer.id} - {offer.title.rendered}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Nom et prénoms</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="Votre nom"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Votre téléphone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Votre téléphone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cv">Votre CV</label>
              <input
                type="file"
                className="form-control-file"
                id="cv"
                name="cv"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-submit col-md-3">
              <button type="submit" className="btn_valider" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Bars height="30" width="30" color="#fff" ariaLabel="loading" />
                ) : (
                  "Postuler"
                )}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
