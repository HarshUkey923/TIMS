import { useContext, useState } from "react"
import authApi from "../services/authApi.js"
import { AuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast"
import { useNavigate } from "react-router";
import Navbar from "../components/NavbarPre.jsx";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await authApi.post("/login", { email, password });
          login(res.data.token, res.data.role);

          const { token, role } = res.data;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);

          if(role === "HR")
            navigate("/hr")
          else if(role === "Mentor")
            navigate("/mentor")
          else if(role === "Intern")
            navigate("/intern")
        } catch (err) {
          toast.error("Incorrect Email or Password!");
          console.log(err)
        }
    };

    return (
         <div className="min-h-screen bg-gradient-to-br from-primary/30 via-base-200 to-secondary/30">
          <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto shadow-xl">
        <div className="card glass">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-8">Login</h2>
            <form onSubmit={HandleSubmit}>
              <div className="form-control mb-8">
                <input type="text"
                  placeholder="Email"
                  className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300"
                  onChange={(e) => setEmail(e.target.value)}
                  required/>
              </div>

              <div className="form-control mb-8">
                <input
                  type = "password"
                  placeholder="Password"
                  className="input input-bordered bg-base-100/30 backdrop-blur border border-base-300"
                  onChange={(e) => setPassword(e.target.value)}
                  required/>
              </div>

              <div className="card-actions justify-center">
                <button type="submit" className="btn btn-primary w-full">Login
                </button>
              </div>
              <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="link link-primary"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default Login;