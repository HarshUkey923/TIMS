import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import HRDashboard from "./pages/hr/HRDashboard";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import InternDashboard from "./pages/intern/InternDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import CreateProgram from "./pages/hr/CreateProgram";
import AssignIntern from "./pages/hr/AssignIntern";
import AddIntern from "./pages/hr/AddIntern";
import Details from "./pages/hr/Details";
import AddMentor from "./pages/hr/AddMentor";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor"
          element={
            <ProtectedRoute allowedRoles={["Mentor"]}>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/intern"
          element={
            <ProtectedRoute allowedRoles={["Intern"]}>
              <InternDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/program" element={<CreateProgram/>}/>
        <Route path = "/details/:id" element={<Details/>}/>
        <Route path="/assign-program/:id"  element={<AssignIntern/>}/>
        <Route path="/add-intern" element={<AddIntern/>}/>
        <Route path="add-mentor" element={<AddMentor/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
