import { useState } from "react";
import api from "../../services/api.js";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar.jsx";
import { ArrowLeftIcon } from 'lucide-react';
import { Link } from "react-router";

const CreateProgram = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/hr/program", { title, description, duration });
      toast.success("Program created successfully");
      setTitle("");
      setDescription("");
      setDuration("");
    } catch (err) {
      toast.error("Error creating program!");
      console.log(err);
    }
  };

  return (
    <div className="container min-h-screen bg-gradient-to-r from-primary/60 via-base-300 to-secondary/60">
      <Navbar/>

        <div className="mx-auto p-5 max-w-3xl">

          <Link to="/hr" className="btn btn-ghost mb-6">
          <ArrowLeftIcon className="size-5"/> Back to Dashboard</Link>
          
          <div className="card glass shadow-lg border-2 gap-6">
            <form
            onSubmit={HandleSubmit}
            className="card shadow p-4 gap-6">
              <h2 className="font-bold text-lg mb-3 text-center">Create Program</h2>

              <input
                className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-2"
                placeholder="Program Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                className="textarea textarea-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <input
                className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-2"
                placeholder="Duration (e.g. 3 Months)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
    </div>
    
  );
};

export default CreateProgram;
