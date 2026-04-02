import { useState } from "react";
import authApi from "../services/authApi.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Navbar from "../components/NavbarPre.jsx";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [role, setRole] = useState("Intern");
  
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(password !== repassword){
        toast.error("Password do not match!");
      }
      else{
      await authApi.post("/register", {name, email, password, role});
      toast.success("Registration successful. Please login.");
      navigate("/");
    }} catch (err) {
      console.log(err)
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-base-200 to-secondary/30">
      <Navbar/>
    <div className="mx-auto p-5 max-w-3xl">
      <form
        onSubmit={HandleSubmit}
        className="card glass border-2 shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          name="repassword"
          type="password"
          placeholder="Repeat Password"
          className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-3"
          onChange={(e) => setRePassword(e.target.value)}
          required
        />

        <select
          name="role"
          className="select select-bordered bg-base-100/30 backdrop-blur border border-base-300 mb-4"
          onChange={(e) => setRole(e.target.value)}>
          <option value="Intern">INTERN</option>
          <option value="Mentor">MENTOR</option>
          <option value="HR">HR</option>
        </select>

        <button className="btn bg-base-200/40 backdrop-blur-xl w-full">
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="link link-primary"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Register;
