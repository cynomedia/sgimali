import Image from 'next/image';
import Link from 'next/link';

const Copyright = () => {
  const currentYear = new Date().getFullYear(); // Récupère l'année actuelle

  return (
    <>
<div className="copyright-warp cr-1 d-flex flex-wrap justify-content-between align-items-center">
  {/* Section Copyright */}
  
  <div className="copyright-text-left"
    style={{
      color: "white",
      fontWeight: 600,
      marginTop: "0px",
      textAlign: "center",
    }}>
    <p style={{ marginBottom: -20, listStyle: "none", padding: 0 }}>

        <Link
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
          }}
          href="/"
        >
          Copyright © {currentYear}
          {new Date().getFullYear() !== 2024 && ` - ${new Date().getFullYear()}`}{" "}
          SGI-MALI tous droits réservés
        </Link>

    </p>
  </div>

  {/* Section Développé par */}
  <div
    className="copyright-text"
    style={{
      color: "white",
      fontWeight: 600,
      marginTop: "0px",
      textAlign: "center",
    }}
  >
    <p
      style={{
        color: "white",
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 0,
      }}
    >
      <span style={{ color: "white", fontWeight: 600 }}>
        Développé par &nbsp;
        <a
          target="_blank"
          href="https://cynomedia.com/"
          style={{ textDecoration: "none" }}
        >
          <Image
            src={"/images/logo-cynomedia.webp"}
            width={90}
            height={31}
            alt="logo cynomedia"
            style={{ marginTop: -10 }}
          />
        </a>
      </span>
    </p>
  </div>
</div>


    </>
  );
};

export default Copyright;
