import { useState } from "react";
import { useNavigate } from "react-router";
import authApi from "../services/authApi";
import PageLayout from "../components/PageLayout";
import SurfaceCard from "../components/SurfaceCard";
import StyledInput from "../components/StyledInput";
import { PrimaryButton } from "../components/Buttons";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const navigate = useNavigate();

  const { isDark } = useTheme();

const text = isDark ? "#f9fafb" : "#111827";
const subText = isDark ? "#9ca3af" : "#6b7280";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await authApi.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "HR") navigate("/hr");
      else if (res.data.role === "MENTOR") navigate("/mentor");
      else navigate("/intern");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <PageLayout>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh"
        }}
      >

        <SurfaceCard>

          <div style={{ width: "320px" }}>

            <h2 style={{
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "6px"
            }}>
              Welcome back
            </h2>

            <p style={{
              fontSize: "13px",
              opacity: 0.7,
              marginBottom: "20px"
            }}>
              Login to your account
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >

              <StyledInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <StyledInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <PrimaryButton>
                Login
              </PrimaryButton>

            </form>

            <p style={{
              marginTop: "16px",
              fontSize: "12px",
              opacity: 0.7,
              textAlign: "center"
            }}>
              Don’t have an account?{" "}
              <span
                style={{
                  color: "#6366f1",
                  cursor: "pointer",
                  fontWeight: "500"
                }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>

          </div>

        </SurfaceCard>

      </div>

    </PageLayout>
  );
};

export default Login;