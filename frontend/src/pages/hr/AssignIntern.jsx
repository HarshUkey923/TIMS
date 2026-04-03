import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import PageLayout from "../../components/PageLayout.jsx";
import { FormCard, StyledSelect, PrimaryButton, SectionDivider } from "../../components/FormComponents.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { UsersIcon, UserIcon } from "lucide-react";

const AssignIntern = () => {
  const [interns, setInterns]   = useState([]);
  const [program, setProgram]   = useState({});
  const [mentors, setMentors]   = useState([]);
  const [internId, setInternId] = useState("");
  const [mentorId, setMentorId] = useState("");
  const [loadingIntern, setLoadingIntern] = useState(false);
  const [loadingMentor, setLoadingMentor] = useState(false);
  const { id } = useParams();
  const { isDark } = useTheme();

  const t = isDark
    ? { text: "#f9fafb", textMuted: "#6b7280", badge: "rgba(99,102,241,0.12)", badgeText: "#818cf8" }
    : { text: "#111827", textMuted: "#6b7280", badge: "rgba(99,102,241,0.1)",  badgeText: "#6366f1" };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internRes, programRes, mentorRes] = await Promise.all([
          api.get("/hr/intern"),
          api.get(`/hr/findprogram/${id}`),
          api.get("/hr/mentor"),
        ]);
        setInterns(internRes.data);
        setProgram(programRes.data);
        setMentors(mentorRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const assignIntern = async (e) => {
    e.preventDefault();
    setLoadingIntern(true);
    try {
      await api.put("/hr/assign-program", { programId: id, internId });
      toast.success("Intern assigned successfully");
      setInternId("");
    } catch (error) {
      toast.error("Failed to assign intern");
      console.log(error);
    } finally {
      setLoadingIntern(false);
    }
  };

  const assignMentor = async (e) => {
    e.preventDefault();
    setLoadingMentor(true);
    try {
      await api.put("/hr/assign-mentor", { programId: id, mentorId });
      toast.success("Mentor assigned successfully");
      setMentorId("");
    } catch (error) {
      toast.error("Failed to assign mentor");
      console.log(error);
    } finally {
      setLoadingMentor(false);
    }
  };

  return (
    <PageLayout backPath="/hr" backLabel="Back to Dashboard">
      {/* Program title badge */}
      {program.title && (
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1" }}>
            Assigning to
          </span>
          <span style={{ fontSize: "14px", fontWeight: 600, color: t.text }}>{program.title}</span>
          <span style={{ fontSize: "11px", padding: "2px 10px", borderRadius: "20px", background: t.badge, color: t.badgeText }}>
            {program.duration}
          </span>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Assign Intern */}
        <FormCard title="Assign Intern" subtitle="Add an intern to this program">
          <form onSubmit={assignIntern} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <StyledSelect
              label="Select Intern"
              value={internId}
              onChange={(e) => setInternId(e.target.value)}
              required
            >
              <option value="">Choose an intern...</option>
              {[...interns].sort((a, b) => a.name.localeCompare(b.name)).map((intern) => (
                <option key={intern._id} value={intern._id}>{intern.name}</option>
              ))}
            </StyledSelect>
            <PrimaryButton type="submit" loading={loadingIntern}>
              <UsersIcon size={15} /> Assign Intern
            </PrimaryButton>
          </form>
        </FormCard>

        <SectionDivider />

        {/* Assign Mentor */}
        <FormCard title="Assign Mentor" subtitle="Assign a mentor or trainer to this program">
          <form onSubmit={assignMentor} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <StyledSelect
              label="Select Mentor"
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
              required
            >
              <option value="">Choose a mentor...</option>
              {[...mentors].sort((a, b) => a.name.localeCompare(b.name)).map((mentor) => (
                <option key={mentor._id} value={mentor._id}>{mentor.name}</option>
              ))}
            </StyledSelect>
            <PrimaryButton type="submit" loading={loadingMentor}>
              <UserIcon size={15} /> Assign Mentor
            </PrimaryButton>
          </form>
        </FormCard>
      </div>
    </PageLayout>
  );
};

export default AssignIntern;
