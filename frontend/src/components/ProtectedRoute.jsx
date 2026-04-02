import { Navigate } from "react-router";
import toast from "react-hot-toast";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    toast.error("Unauthorized access");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
