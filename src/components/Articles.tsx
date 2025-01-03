"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SkeletonLoader } from "./skeleton/SkeletonLoader";

interface Article {
  id: number;
  title: { rendered: string };
  date: string;
  link: string;
  tag: string;
  featured_image_url: string | null; // Utilisation de featured_image_url pour l'image
  categories: number[]; // Catégories associées à l'article sous forme de tableau d'ID de catégorie
  slug: string; // Ajouter le slug dans l'interface Article
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Map<number, string>>(new Map()); // Utilisation d'un Map pour associer les IDs de catégories avec leurs noms
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | string>(""); // ID de la catégorie, initialement vide

  useEffect(() => {
    fetchCategories(); // Récupérer les catégories disponibles
    fetchArticles(); // Récupérer les articles au chargement initial
  }, [selectedCategory, currentPage]);

  // Fonction pour récupérer les catégories
// Fonction pour récupérer les catégories
// `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
// "https://sgi.cynomedia-africa.com/wp-json/wp/v2/categories"                  
// `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
const fetchCategories = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
    );
    const data: { id: number; name: string }[] = await res.json(); // Typage explicite de la réponse
    const categoryMap = new Map<number, string>( // Assurez-vous que Map utilise le bon type
      data.map((category) => [category.id, category.name])
    );
    setCategories(categoryMap);
  };
  //return `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${year}/${month}/${imageName}`;

  // Fonction pour récupérer les articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      // Paramètre de catégorie si sélectionné
      const categoryParam = selectedCategory && selectedCategory !== "" 
        ? `&categories=${selectedCategory}` 
        : "";
  
      // Requête à l'API de Next.js via le proxy
      //`http://localhost:3000/api/articles?orderby=date&per_page=6&page=${currentPage}${categoryParam}&_embed`
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?orderby=date&per_page=6&page=${currentPage}${categoryParam}&_embed`
      );
      //`${process.env.NEXT_PUBLIC_API_BASE_URL}

      // Vérifier si la réponse est correcte
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des articles");
      }
  
      // Récupérer les données au format JSON
      const data = await res.json();
  
      // Vérifier si la réponse contient un tableau d'articles
      if (Array.isArray(data.posts)) {
        setArticles(data.posts);
      } else {
        setArticles([]); // Si la réponse n'est pas un tableau, on vide les articles
      }
  
      // Récupérer le nombre total d'articles depuis le corps de la réponse
      const total = data.totalPosts; // Récupérer directement depuis le corps de la réponse
      console.warn(total);  // Affichage du total pour vérifier dans la console
      
      // Vérifier si le total est bien défini et calculer les pages
      if (total) {
        const totalPagesCalculated = Math.ceil(Number(total) / 6);  // Calcul du nombre de pages
        setTotalPages(totalPagesCalculated);
        console.log('Total Pages:', totalPagesCalculated); // Affichage du total de pages calculé
      } else {
        setTotalPages(1); // Par défaut, si le total n'est pas retourné
      }
    } catch (error) {
      console.error("Erreur:", error);
      setArticles([]); // Vider les articles en cas d'erreur
      setTotalPages(1); // Par défaut, une seule page en cas d'erreur
    }
    setLoading(false); // Désactiver le loader après la récupération des données
  };
  

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Filtre par catégorie */}
      <div className="container row">
        <div className="category-filter">
          <select
            onChange={(e) => setSelectedCategory(Number(e.target.value) || "")}
            value={selectedCategory}
            style={{
              marginBottom: 20,
              padding: "7px 15px",
              fontSize: "14px",
              border: "2px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
              color: "#333",
              outline: "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Ombre subtile
              transition: "all 0.3s ease",
              width: "200px",
              float: "right",
              fontWeight: 700,
            }}
          >
            <option value="">Toutes les catégories</option>
            {[...categories.entries()].map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Affichage des articles */}
      <div className="row" style={{ marginBottom: 20 }}>
        {loading ? (
          <SkeletonLoader /> // Affichage du Skeleton Loader pendant le chargement
        ) : Array.isArray(articles) && articles.length > 0 ? (
          articles.map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item.id}>
              <div className="news-card shadow">
                <Link
                  href={`/articles/${item.slug}`} // Utilisez le slug de l'article pour générer le lien dynamique
                >
                  <div className="news-tag">
                    {item.categories.map((categoryId, index) => {
                      const categoryName = categories.get(categoryId);
                      return categoryName ? (
                        <span
                          key={categoryId}
                          className="news-category"
                          style={{ marginRight: 5, fontWeight: 700 }}
                        >
                          {categoryName}
                          {index < item.categories.length - 1 && " - "}
                        </span>
                      ) : null;
                    })}
                  </div>

                  {/* Vérification de la présence de l'image */}
                  <Image
                    src={
                      item.featured_image_url
                        ? item.featured_image_url
                        : "/images/default-image.webp"
                    }
                    className="img-fluid news-image"
                    alt={item.title.rendered}
                    width={570}
                    height={380}
                  />
                </Link>
                <div className="news-content p-3" style={{ padding: 20 }}>
                  <h4 className="news-title">
                    <Link
                      href={`/articles/${item.slug}`} // Utilisez le slug de l'article pour générer le lien dynamique
                      className="text-decoration-none"
                      style={{ color: "#021039", fontWeight: 600 }}
                    >
                      {item.title.rendered.length > 65 ? (
                        `${item.title.rendered.substring(0, 65)}...`
                      ) : (
                        <>
                          {item.title.rendered}
                          {Array.from({
                            length: Math.ceil(
                              (65 - item.title.rendered.length) / 30
                            ),
                          }).map((_, index) => (
                            <br key={index} />
                          ))}
                        </>
                      )}
                    </Link>
                  </h4>
                  <p className="news-date text-muted mt-2">
                    {new Date(item.date).toLocaleDateString("fr-FR")}
                  </p>

                  <div className="news-categories"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Aucun article trouvé.</div> // Message si aucun article n'est trouvé
        )}
      </div>

      {/* Pagination */}
      <div
        className="paginatio"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          className="previous"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{
            padding: "10px 20px",
            backgroundColor: currentPage <= 1 ? "#ddd" : "#049fe2",
            color: currentPage <= 1 ? "#888" : "white",
            border: "none",
            borderRadius: "25px",
            cursor: currentPage <= 1 ? "not-allowed" : "pointer",
            fontWeight: 600,
            transition: "background-color 0.3s ease",
          }}
        >
          Préc
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className="page"
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "10px 20px",
              backgroundColor:
                currentPage === index + 1 ? "#049fe2" : "#f1f1f1",
              color: currentPage === index + 1 ? "white" : "#333",
              border: "1px solid #ddd",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: currentPage === index + 1 ? "bold" : "normal",
              transition: "all 0.3s ease",
              fontSize: "14px",
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            padding: "10px 20px",
            backgroundColor: currentPage >= totalPages ? "#ddd" : "#049fe2",
            color: currentPage >= totalPages ? "#888" : "white",
            border: "none",
            borderRadius: "25px",
            cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
            fontWeight: 600,
            transition: "background-color 0.3s ease",
          }}
        >
          Suiv
        </button>
      </div>
    </div>
  );
}
