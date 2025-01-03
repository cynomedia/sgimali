import { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2"; // Import de SweetAlert

const NewsletterForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");

    // Fonction pour mettre à jour l'email
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Vérification si l'email est vide
        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Erreur",
                text: "Veuillez entrer une adresse email.",
            });
            return;
        }

        // Envoi de la requête API pour traiter l'abonnement
        try {
            const response = await fetch("https://sgi.cynomedia-africa.com/wp-json/newsletter/v1/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            // Si la requête est réussie (code 200)
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Inscription réussie",
                    text: "Vous êtes maintenant abonné à la newsletter !",
                });
                setEmail(""); // Réinitialiser le champ email
            } else {
                // Si la réponse a échoué (code 409 ou autre)
                const data = await response.json();

                // Si le code de statut est 409 (email déjà enregistré)
                if (response.status === 409) {
                    Swal.fire({
                        icon: "error",
                        title: "Erreur",
                        text: "Cet email est déjà inscrit à la newsletter.",
                    });
                } else {
                    // Pour toute autre erreur, afficher le message d'erreur de l'API
                    Swal.fire({
                        icon: "error",
                        title: "Erreur",
                        text: data.message || "Erreur lors de l'inscription. Veuillez réessayer.",
                    });
                }
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erreur réseau",
                text: "Veuillez vérifier votre connexion.",
            });
        }
    };

    return (
        <form className="form-subcri-footer" onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    style={{ fontSize: 14 }}
                    placeholder="Votre Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <button type="submit" className="btn_valider_newsletter">
                s&apos;inscrire
            </button>
        </form>
    );
};

export default NewsletterForm;
