import { useTheme } from "../context/ThemeContext";

const SurfaceCard = ({ children }) => {
  const { isDark } = useTheme();

  const surface = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)";
  const border = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: "12px",
      padding: "20px"
    }}>
      {children}
    </div>
  );
};

export default SurfaceCard;