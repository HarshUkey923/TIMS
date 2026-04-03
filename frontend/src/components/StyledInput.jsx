import { useTheme } from "../context/ThemeContext";

const StyledInput = (props) => {
  const { isDark } = useTheme();

  const surface = isDark ? "rgba(255,255,255,0.03)" : "#fff";
  const border = isDark ? "rgba(255,255,255,0.07)" : "#ddd";
  const text = isDark ? "#e5e7eb" : "#111827";
  const placeholder = isDark ? "#9ca3af" : "#6b7280";

  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: `1px solid ${border}`,
        background: surface,
        color: text,
        fontSize: "13px",
        outline: "none"
      }}
      placeholder={props.placeholder}
    />
  );
};

export default StyledInput;