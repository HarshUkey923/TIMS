export const PrimaryButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "#6366f1",
      color: "#fff",
      padding: "8px 14px",
      borderRadius: "8px",
      fontSize: "12px",
      border: "none",
      cursor: "pointer"
    }}
  >
    {children}
  </button>
);

export const GhostButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "8px 14px",
      borderRadius: "8px",
      fontSize: "12px",
      cursor: "pointer"
    }}
  >
    {children}
  </button>
);