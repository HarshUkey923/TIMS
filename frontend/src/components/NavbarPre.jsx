import { Palette } from "lucide-react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };
  

  return (
    <div className="navbar bg-primary px-6">
      <div className="flex-1 font-bold">Training And Intern Management System</div>

      <div className="flex gap-3">
        
       <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Palette size={20} />
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-[1] w-40 p-2 shadow">
            <li>
              <button onClick={() => changeTheme("business")}>
                Dark
              </button>
            </li>

            <li>
              <button onClick={() => changeTheme("corporate")}>
                Light
              </button>
            </li>
          </ul>
        </div>

        {role === "HR" && <button onClick={() => navigate("/hr")} className="btn btn-sm">HR</button>}
        {role === "Mentor" && <button onClick={() => navigate("/mentor")} className="btn btn-sm">Mentor</button>}
        {role === "Intern" && <button onClick={() => navigate("/intern")} className="btn btn-sm">Intern</button>}
      </div>
    </div>
  );
};

export default Navbar;
