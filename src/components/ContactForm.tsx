"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner"; // Import de l'animation de chargement

const ContactForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    subject: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false); // État de chargement
  const [formDisabled, setFormDisabled] = useState(false); // Désactiver le formulaire

  // Gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    // Vérification des champs obligatoires
    // Vérification des champs obligatoires
if (!formData.first_name || !formData.email || !formData.subject || !formData.comments) {
    Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Tous les champs sont obligatoires.",        
    });
    return; // Pour éviter l'exécution de la suite si une erreur se produit
  }
  

    // Désactiver le formulaire et commencer le chargement
    setLoading(true);
    setFormDisabled(true);

    // Préparer les données du formulaire
    const data = {
      first_name: formData.first_name,
      email: formData.email,
      subject: formData.subject,
      message: formData.comments,
    };

    try {
      // Envoyer la requête POST à l'API REST de WordPress

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Votre message a été envoyé avec succès!",          
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue, veuillez réessayer.",          
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue, veuillez réessayer.",        
      });
    } finally {
      // Réinitialiser l'état de chargement et réactiver le formulaire
      setLoading(false);
      setFormDisabled(false);

      // Réinitialiser le formulaire après l'envoi
      setFormData({
        first_name: "",
        email: "",
        subject: "",
        comments: "",
      });
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (
    <div className="col-md-6" style={{ marginTop: -5 }}>
      <div className="main-page">
        <form name="contactform" method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="offer">
              Nom et prénoms <span className="text-danger">*</span>:
            </label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Nom et prénoms"
              disabled={formDisabled} // Désactiver le champ pendant le chargement
            />
          </div>

          <div className="form-group">
            <label htmlFor="offer">
              Adresse Email <span className="text-danger">*</span>:
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Adresse Email"
              disabled={formDisabled} // Désactiver le champ pendant le chargement
            />
          </div>

          <div className="form-group">
            <label htmlFor="offer">
              Objet <span className="text-danger">*</span>:
            </label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Objet"
              disabled={formDisabled} // Désactiver le champ pendant le chargement
            />
          </div>

          <div className="form-group">
            <label htmlFor="offer">
              Votre message <span className="text-danger">*</span>:
            </label>
            <textarea
              name="comments"
              className="form-control"
              rows={5}
              placeholder="Votre message"
              value={formData.comments}
              onChange={handleChange}
              disabled={formDisabled} // Désactiver le champ pendant le chargement
            />
          </div>

          <div style={{ float: "right" }}>
            <button
              type="submit"
              className="btn-main-color"
              style={{
                borderRadius: 4,
                fontWeight: 400,
                fontSize: 15,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 7,
                paddingBottom: 7,
              }}
              disabled={formDisabled} // Désactiver le bouton pendant le chargement
            >
              {loading ? (
                <Bars width="30" color="#ffffff" /> // Animation de chargement
              ) : (
                "Envoyer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
