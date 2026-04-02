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
    <div className="navbar glass border-b-2 sticky top-0 z-[9999] px-6">
      <div className="flex-1 color-primary-content font-bold">Training And Intern Management System</div>

      <div className="flex gap-3">
        
       <div className="dropdown dropdown-end z-50">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <Palette size={20} />
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box z-50 w-40 p-2 shadow">
            <li>
              <button onClick={() => changeTheme("corporate")}>
                Light
              </button>
            </li>

            <li>
              <button onClick={() => changeTheme("business")}>
                Dark
              </button>
            </li>
          </ul>
        </div>

        {role === "HR" && <button onClick={() => navigate("/hr")} className="btn btn-sm">HR</button>}
        {role === "Mentor" && <button onClick={() => navigate("/mentor")} className="btn btn-sm">Mentor</button>}
        {role === "Intern" && <button onClick={() => navigate("/intern")} className="btn btn-sm">Intern</button>}

        <button onClick={logout} className="btn btn-error btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
