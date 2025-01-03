import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonDetailsArticles = () => {
  return (
    <section style={{ padding: "10px 0" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Bloc principal */}
          <div className="col-md-12">
            <div className="main-page">
              {/* En-tête */}
              <header className="mb-6">
                <nav className="text-sm text-gray-600 mb-4 flex flex-wrap items-center space-x-2">
                  <Skeleton width={"100%"} height={20} />                  
                </nav>
                <br />
                <Skeleton width="100%" height={350} />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  <Skeleton width="80%" height={40} />
                </h1>
                <div
                  className="text-sm text-gray-500 mb-4"
                >
                  <Skeleton width={100} height={20} />
                </div>
              </header>

              {/* Contenu de l'article */}
              <div
                className="prose max-w-none mb-8 detail-article"
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "#555",
                  marginTop: 10,
                }}
              >
                <Skeleton count={5} width="100%" height={20} />
              </div>

              <Skeleton width={100} height={30} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonDetailsArticles;
