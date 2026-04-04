import { useState } from "react";
import { useParams, useLocation } from "react-router";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import PageLayout from "../../components/PageLayout.jsx";
import { FormCard, StyledInput, StyledTextarea, PrimaryButton } from "../../components/FormComponents.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { UserIcon, LayoutGridIcon, UploadIcon, XIcon } from "lucide-react";

const AssignTask = () => {
  const { programId, internId } = useParams();
  const { state } = useLocation();
  const { isDark } = useTheme();

  const internName    = state?.internName    || "Intern";
  const programTitle  = state?.programTitle  || "Program";

  const t = isDark
    ? { text: "#f9fafb", textMuted: "#6b7280", surface: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.07)", fileBg: "rgba(255,255,255,0.03)", fileBorder: "rgba(255,255,255,0.08)", fileText: "#6b7280" }
    : { text: "#111827", textMuted: "#6b7280", surface: "rgba(255,255,255,0.85)", border: "rgba(0,0,0,0.08)", fileBg: "rgba(0,0,0,0.02)", fileBorder: "rgba(0,0,0,0.09)", fileText: "#9ca3af" };

  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const [file, setFile]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (f) => {
    if (f) setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title",       form.title);
      formData.append("description", form.description);
      formData.append("dueDate",     form.dueDate);
      formData.append("internId",    internId);
      formData.append("programId",   programId);
      if (file) formData.append("file", file);

      await api.post("/task/mentor", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Task assigned to ${internName}!`);
      setForm({ title: "", description: "", dueDate: "" });
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign task");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout backPath="/mentor" backLabel="Back to Dashboard">
      {/* Context pill */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1" }}>
          Assigning task to
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "20px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <UserIcon size={11} style={{ color: "#818cf8" }} />
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#818cf8" }}>{internName}</span>
        </div>
        <span style={{ fontSize: "12px", color: t.textMuted }}>in</span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "20px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <LayoutGridIcon size={11} style={{ color: "#34d399" }} />
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#34d399" }}>{programTitle}</span>
        </div>
      </div>

      <FormCard title="New Task" subtitle="Fill in the details below and optionally attach a reference file">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <StyledInput
            label="Task Title"
            name="title"
            placeholder="e.g. Build a REST API for user authentication"
            value={form.title}
            onChange={handleChange}
            required
          />

          <StyledTextarea
            label="Description"
            name="description"
            placeholder="Describe the task requirements, expected output, and any relevant notes..."
            value={form.description}
            onChange={handleChange}
            rows={5}
            required
          />

          <StyledInput
            label="Due Date"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            required
          />

          <div>
            <label style={{ fontSize: "12px", fontWeight: 500, color: t.textMuted, display: "block", marginBottom: "6px" }}>
              Reference File <span style={{ opacity: 0.6 }}>(optional)</span>
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
              style={{
                border: `1px dashed ${dragOver ? "#6366f1" : t.fileBorder}`,
                borderRadius: "10px", padding: "20px",
                background: dragOver ? "rgba(99,102,241,0.06)" : t.fileBg,
                textAlign: "center", cursor: "pointer",
                transition: "all 0.15s",
              }}
              onClick={() => document.getElementById("task-file").click()}
            >
              <input
                id="task-file"
                type="file"
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {file ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#818cf8" }}>{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: "50%", padding: "3px", cursor: "pointer", display: "flex", color: "#f87171" }}
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              ) : (
                <div>
                  <UploadIcon size={20} style={{ color: t.fileText, marginBottom: "6px" }} />
                  <p style={{ fontSize: "12px", color: t.fileText, margin: 0 }}>
                    Drag & drop a file here, or <span style={{ color: "#6366f1", fontWeight: 500 }}>browse</span>
                  </p>
                  <p style={{ fontSize: "11px", color: t.fileText, opacity: 0.6, marginTop: "4px" }}>
                    PDF, DOC, ZIP, PNG, JPG — max 10MB
                  </p>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: "4px" }}>
            <PrimaryButton type="submit" loading={loading}>
              Assign Task to {internName}
            </PrimaryButton>
          </div>
        </form>
      </FormCard>
    </PageLayout>
  );
};

export default AssignTask;
