import { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import PageLayout from "../../components/PageLayout.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { XIcon, CalendarIcon, ClockIcon, UsersIcon, UserIcon } from "lucide-react";

const Details = () => {
  const [program, setProgram] = useState({});
  const [interns, setInterns] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const { isDark } = useTheme();

  const t = isDark ? {
    surface: "rgba(255,255,255,0.03)",
    surfaceAlt: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.07)",
    text: "#f9fafb",
    textMuted: "#6b7280",
    textFaint: "#374151",
    rowHover: "rgba(255,255,255,0.03)",
    theadBg: "rgba(255,255,255,0.03)",
    theadText: "#6b7280",
  } : {
    surface: "rgba(255,255,255,0.85)",
    surfaceAlt: "rgba(248,250,252,0.9)",
    border: "rgba(0,0,0,0.08)",
    text: "#111827",
    textMuted: "#6b7280",
    textFaint: "#d1d5db",
    rowHover: "rgba(0,0,0,0.02)",
    theadBg: "rgba(0,0,0,0.03)",
    theadText: "#6b7280",
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [progRes, internRes, mentorRes] = await Promise.all([
          api.get(`/hr/findprogram/${id}`),
          api.get(`/hr/get-interns/${id}`),
          api.get(`/hr/get-mentor/${id}`),
        ]);
        setProgram(progRes.data);
        setInterns(internRes.data);
        setMentors(mentorRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  const deleteProgram = async () => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;
    setDeleting(true);
    try {
      await api.delete(`/hr/delete-program/${id}`);
      toast.success("Program deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting program!");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageLayout backPath="/hr" backLabel="Back to Dashboard" maxWidth="780px">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Program header card */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", padding: "24px", boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.2)" : "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1", marginBottom: "6px" }}>
                Program Details
              </p>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: t.text, letterSpacing: "-0.02em", margin: 0 }}>
                {program.title || "Loading..."}
              </h1>
            </div>
            <DeleteButton onClick={deleteProgram} loading={deleting} />
          </div>

          {/* Meta row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px", paddingTop: "20px", borderTop: `1px solid ${t.border}` }}>
            <MetaItem icon={<CalendarIcon size={13} />} label="Created" value={program.createdAt ? new Date(program.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"} t={t} />
            <MetaItem icon={<ClockIcon size={13} />} label="Duration" value={program.duration || "—"} t={t} />
            <MetaItem icon={<UsersIcon size={13} />} label="Interns" value={interns.length} t={t} />
            <MetaItem icon={<UserIcon size={13} />} label="Mentors" value={mentors.length} t={t} />
          </div>

          {/* Mentors */}
          {mentors.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              <p style={{ fontSize: "12px", color: t.textMuted, marginBottom: "8px", fontWeight: 500 }}>Assigned Mentors</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {mentors.map((mentor) => (
                  <span key={mentor._id} style={{ fontSize: "12px", fontWeight: 500, padding: "4px 12px", borderRadius: "20px", background: "rgba(99,102,241,0.1)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
                    {mentor.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interns table */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: "16px", overflow: "hidden", boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.2)" : "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: t.text, margin: 0 }}>Assigned Interns</h2>
            <span style={{ fontSize: "11px", background: "rgba(16,185,129,0.1)", color: "#34d399", padding: "2px 8px", borderRadius: "20px" }}>
              {interns.length}
            </span>
          </div>

          {interns.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: t.theadBg }}>
                    {["Name", "Email", "College", "Status"].map((h) => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: t.theadText, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${t.border}` }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {interns.map((intern, i) => (
                    <InternRow key={intern._id} intern={intern} t={t} isLast={i === interns.length - 1} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: "40px 24px", textAlign: "center" }}>
              <UsersIcon size={28} style={{ color: t.textFaint, marginBottom: "10px" }} />
              <p style={{ fontSize: "14px", color: t.textMuted }}>No interns assigned yet</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const MetaItem = ({ icon, label, value, t }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <span style={{ color: "#6b7280" }}>{icon}</span>
    <div>
      <p style={{ fontSize: "10px", color: t.textMuted, margin: 0 }}>{label}</p>
      <p style={{ fontSize: "13px", fontWeight: 600, color: t.text, margin: 0 }}>{value}</p>
    </div>
  </div>
);

const InternRow = ({ intern, t, isLast }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? t.rowHover : "transparent", transition: "background 0.15s", borderBottom: isLast ? "none" : `1px solid ${t.border}` }}
    >
      <td style={{ padding: "12px 16px", fontWeight: 500, color: t.text }}>{intern.name}</td>
      <td style={{ padding: "12px 16px", color: t.textMuted }}>{intern.email}</td>
      <td style={{ padding: "12px 16px", color: t.textMuted }}>{intern.college || "—"}</td>
      <td style={{ padding: "12px 16px" }}>
        <span style={{ fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", background: "rgba(16,185,129,0.1)", color: "#34d399" }}>
          Active
        </span>
      </td>
    </tr>
  );
};

const DeleteButton = ({ onClick, loading }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={loading}
      style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: 500,
        background: hovered ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.08)",
        border: `1px solid ${hovered ? "rgba(239,68,68,0.4)" : "rgba(239,68,68,0.2)"}`,
        color: "#f87171", cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1, transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <XIcon size={13} /> {loading ? "Deleting..." : "Delete Program"}
    </button>
  );
};

export default Details;
