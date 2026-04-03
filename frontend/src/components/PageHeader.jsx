const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div style={{ marginBottom: "28px" }}>
      <p style={{
        fontSize: "10px",
        letterSpacing: "0.15em",
        color: "#6366f1"
      }}>
        Aetherbyte IT Solutions
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: 700 }}>{title}</h1>
          <p style={{ fontSize: "13px", opacity: 0.7 }}>{subtitle}</p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {actions}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;