import { useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";

const AddIntern = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    department: "",
    skills: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/hr/intern",
        form);
      toast.success("Intern added successfully");
      setForm({
        name: "",
        email: "",
        password: "",
        college: "",
        department: "",
        skills: ""
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding intern");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/60 via-base-300 to-secondary/60">
      <Navbar/>
      <div className="mx-auto p-5 max-w-3xl ">
        <Link to="/hr" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/> Back to Dashboard</Link>
        <form
        onSubmit={handleSubmit}
        className="card glass border-2 shadow-lg p-3">
          <h2 className="font-bold text-lg mb-3 text-center">Add Intern</h2>

          <input name="name" placeholder="Name"
            className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
            onChange={handleChange} required />

          <input name="email" type="email" placeholder="Email"
            className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
            onChange={handleChange} required />

          <input name="password" type="password" placeholder="Password"
            className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
            onChange={handleChange} required />

          <input name="college" placeholder="College"
            className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
            onChange={handleChange} required />

          <input name="department" placeholder="Department"
            className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
            onChange={handleChange} required />

          <input name="skills" placeholder="Skills (comma separated)"
            className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
            onChange={handleChange} required />

          <button className="btn btn-bordered bg-base-100/30 backdrop-blur border border-base-300">Add Intern</button>
        </form>
      </div>
    </div>
  );
};

export default AddIntern;
