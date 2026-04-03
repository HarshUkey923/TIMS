import { useState } from "react";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import PageLayout from "../../components/PageLayout.jsx";
import { FormCard, StyledInput, StyledTextarea, PrimaryButton } from "../../components/FormComponents.jsx";

const CreateProgram = () => {
  const [form, setForm] = useState({ title: "", description: "", duration: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/hr/program", form);
      toast.success("Program created successfully");
      setForm({ title: "", description: "", duration: "" });
    } catch (err) {
      toast.error("Error creating program!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout backPath="/hr" backLabel="Back to Dashboard">
      <FormCard title="Create Program" subtitle="Define a new training or internship program">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <StyledInput
            label="Program Title"
            placeholder="e.g. Full Stack Web Development"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <StyledTextarea
            label="Description"
            placeholder="Describe what this program covers, goals, expectations..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            required
          />

          <StyledInput
            label="Duration"
            placeholder="e.g. 3 Months, 6 Weeks"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
          />

          <div style={{ marginTop: "4px" }}>
            <PrimaryButton type="submit" loading={loading}>Create Program</PrimaryButton>
          </div>
        </form>
      </FormCard>
    </PageLayout>
  );
};

export default CreateProgram;
