import Link from "next/link";
import React from "react";

// Typage des props
interface HeaderPageSectionProps {
  title: string;
}

const HeaderPageSection: React.FC<HeaderPageSectionProps> = ({ title }) => {
  return (
    <section className="no-padding sh-company-history">
      <br />
      <br />
      <br />
      <br />
      <div className="sub-header">
        <h3>{title}</h3>
        <ol className="breadcrumb" style={{ background: "transparent" }}>
          <li>
            <Link href="/">
              <i className="fa fa-home" /> Accueil
            </Link>
          </li>
          <li className="active">{title}</li>
        </ol>
      </div>
    </section>
  );
};

export default HeaderPageSection;
