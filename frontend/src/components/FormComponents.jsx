import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const themes = {
  dark: {
    surface: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.07)",
    text: "#f9fafb",
    textMuted: "#6b7280",
    inputBg: "rgba(255,255,255,0.04)",
    inputBorder: "rgba(255,255,255,0.1)",
    inputFocus: "rgba(99,102,241,0.5)",
    inputText: "#f9fafb",
    inputPlaceholder: "#4b5563",
    labelColor: "#9ca3af",
  },
  light: {
    surface: "rgba(255,255,255,0.85)",
    border: "rgba(0,0,0,0.08)",
    text: "#111827",
    textMuted: "#6b7280",
    inputBg: "rgba(255,255,255,0.9)",
    inputBorder: "rgba(0,0,0,0.12)",
    inputFocus: "rgba(99,102,241,0.5)",
    inputText: "#111827",
    inputPlaceholder: "#9ca3af",
    labelColor: "#6b7280",
  },
};

// ─── FormCard ─────────────────────────────────────────────────────────────────
export const FormCard = ({ title, subtitle, children }) => {
  const { isDark } = useTheme();
  const t = isDark ? themes.dark : themes.light;

  return (
    <div style={{
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: "16px", padding: "clamp(20px, 4vw, 32px)",
      boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.2)" : "0 4px 24px rgba(0,0,0,0.06)",
      transition: "background 0.3s, border 0.3s",
    }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: "24px", paddingBottom: "20px", borderBottom: `1px solid ${t.border}` }}>
          {title && <h2 style={{ fontSize: "18px", fontWeight: 700, color: t.text, letterSpacing: "-0.01em", margin: 0 }}>{title}</h2>}
          {subtitle && <p style={{ fontSize: "13px", color: t.textMuted, marginTop: "4px" }}>{subtitle}</p>}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {children}
      </div>
    </div>
  );
};

// ─── FieldGroup (label + input wrapper) ──────────────────────────────────────
export const Field = ({ label, children }) => {
  const { isDark } = useTheme();
  const t = isDark ? themes.dark : themes.light;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <label style={{ fontSize: "12px", fontWeight: 500, color: t.labelColor }}>{label}</label>}
      {children}
    </div>
  );
};

// ─── StyledInput ──────────────────────────────────────────────────────────────
export const StyledInput = ({ label, ...props }) => {
  const { isDark } = useTheme();
  const t = isDark ? themes.dark : themes.light;
  const [focused, setFocused] = useState(false);

  const input = (
    <input
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: "10px",
        fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
        background: t.inputBg, color: t.inputText,
        border: `1px solid ${focused ? t.inputFocus : t.inputBorder}`,
        outline: "none", transition: "border 0.15s",
        boxShadow: focused ? `0 0 0 3px rgba(99,102,241,0.12)` : "none",
      }}
    />
  );

  if (label) return <Field label={label}>{input}</Field>;
  return input;
};

// ─── StyledTextarea ───────────────────────────────────────────────────────────
export const StyledTextarea = ({ label, rows = 4, ...props }) => {
  const { isDark } = useTheme();
  const t = isDark ? themes.dark : themes.light;
  const [focused, setFocused] = useState(false);

  const textarea = (
    <textarea
      {...props}
      rows={rows}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: "10px",
        fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
        background: t.inputBg, color: t.inputText,
        border: `1px solid ${focused ? t.inputFocus : t.inputBorder}`,
        outline: "none", resize: "vertical", transition: "border 0.15s",
        boxShadow: focused ? `0 0 0 3px rgba(99,102,241,0.12)` : "none",
      }}
    />
  );

  if (label) return <Field label={label}>{textarea}</Field>;
  return textarea;
};

// ─── StyledSelect ─────────────────────────────────────────────────────────────
export const StyledSelect = ({ label, children, ...props }) => {
  const { isDark } = useTheme();
  const t = isDark ? themes.dark : themes.light;
  const [focused, setFocused] = useState(false);

  const select = (
    <select
      {...props}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: "100%", padding: "10px 14px", borderRadius: "10px",
        fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
        background: t.inputBg, color: props.value ? t.inputText : t.inputPlaceholder,
        border: `1px solid ${focused ? t.inputFocus : t.inputBorder}`,
        outline: "none", cursor: "pointer", transition: "border 0.15s",
        boxShadow: focused ? `0 0 0 3px rgba(99,102,241,0.12)` : "none",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: "36px",
      }}
    >
      {children}
    </select>
  );

  if (label) return <Field label={label}>{select}</Field>;
  return select;
};

// ─── PrimaryButton ────────────────────────────────────────────────────────────
export const PrimaryButton = ({ children, loading, fullWidth = true, variant = "primary", ...props }) => {
  const [hovered, setHovered] = useState(false);

  const variants = {
    primary: {
      bg: hovered ? "#4f46e5" : "#6366f1",
      color: "#ffffff",
      border: "transparent",
    },
    danger: {
      bg: hovered ? "#dc2626" : "#ef4444",
      color: "#ffffff",
      border: "transparent",
    },
    ghost: {
      bg: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
      color: "#9ca3af",
      border: "rgba(255,255,255,0.1)",
    },
  };

  const v = variants[variant] || variants.primary;

  return (
    <button
      {...props}
      onMouseEnter={(e) => { setHovered(true); props.onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); props.onMouseLeave?.(e); }}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "11px 20px", borderRadius: "10px",
        fontSize: "14px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
        background: v.bg, color: v.color,
        border: `1px solid ${v.border}`,
        cursor: props.disabled || loading ? "not-allowed" : "pointer",
        opacity: props.disabled || loading ? 0.6 : 1,
        transition: "background 0.15s, transform 0.1s",
        transform: hovered && !props.disabled ? "translateY(-1px)" : "translateY(0)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
      }}
    >
      {loading ? (
        <>
          <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
          Processing...
        </>
      ) : children}
    </button>
  );
};

// ─── SectionDivider ───────────────────────────────────────────────────────────
export const SectionDivider = ({ label }) => {
  const { isDark } = useTheme();
  const borderColor = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const textColor = isDark ? "#4b5563" : "#9ca3af";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0" }}>
      <div style={{ flex: 1, height: "1px", background: borderColor }} />
      {label && <span style={{ fontSize: "11px", color: textColor, fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>}
      <div style={{ flex: 1, height: "1px", background: borderColor }} />
    </div>
  );
};

// Inject spin keyframe once
const style = document.createElement("style");
style.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
document.head.appendChild(style);
