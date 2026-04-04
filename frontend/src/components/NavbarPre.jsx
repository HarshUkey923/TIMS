import { useState } from "react";
import { useNavigate } from "react-router";
import { SunIcon, MoonIcon, MenuIcon, XIcon, BellIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const Navbar = () => {
  const role = localStorage.getItem("role");
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const t = isDark ? themes.dark : themes.light;

  return (
    <>
      <nav
        style={{
          background: t.navBg,
          borderBottom: `1px solid ${t.border}`,
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 20px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #6366f1, #10b981)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontSize: "12px", fontWeight: "700" }}>T</span>
            </div>
            <span style={{ fontWeight: "700", fontSize: "15px", color: t.text, letterSpacing: "-0.01em" }}>
              TIMS
            </span>
          </div>

          

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
                border: `1px solid ${isDark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)"}`,
                borderRadius: "8px",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#818cf8",
                fontSize: "12px",
                fontWeight: "500",
                transition: "all 0.2s",
              }}>
              {isDark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
              <span className="hidden-mobile">{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            style={{
              background: t.navBg,
              borderTop: `1px solid ${t.border}`,
              padding: "12px 20px 16px",
            }}
            className="show-mobile">
          </div>
        )}
      </nav>

      {/* Responsive helpers — inject once */}
      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
};

const themes = {
  dark: {
    navBg: "rgba(15,17,23,0.85)",
    border: "rgba(255,255,255,0.07)",
    text: "#f9fafb",
    textMuted: "#6b7280",
    hoverBg: "rgba(255,255,255,0.06)",
  },
  light: {
    navBg: "rgba(255,255,255,0.9)",
    border: "rgba(0,0,0,0.08)",
    text: "#111827",
    textMuted: "#6b7280",
    hoverBg: "rgba(0,0,0,0.04)",
  },
};

export default Navbar;
