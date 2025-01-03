import React from "react";

// Typage des props
interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <h3
      style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginTop: -20,
        marginBottom: 20,
        paddingBottom: 8,
        borderBottom: "4px solid #019ee2",
        display: "inline-block",
        color: "rgb(2, 16, 57)",
      }}
    >
      {title}
    </h3>
  );
};

export default SectionTitle;
