import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/authActions";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HeaderNavigationLoggin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser());

    // Remove user data and token from localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");

    setActivePage("");

    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    // Kada se promeni lokacija (stranica), ažurirajte stanje aktivne stranice
    const path = location.pathname;
    setActivePage(
      path === "/users"
        ? "users"
        : path === "/status"
        ? "status"
        : path === "/welcome"
        ? "welcome"
        : ""
    );
  }, [location]);

  return (
    <nav className="flex gap-12	w-full p-4 bg-black">
      <div className="w-full flex gap-12 text-lg text-white">
        <Link
          to="/welcome"
          className={`hover:text-yellow-400 uppercase font-semibold border-slate-50 border-2 p-2 ${
            activePage === "welcome" ? "bg-yellow-400" : ""
          }`}
        >
          Welcome
        </Link>
        {userData.permission === "admin" && (
          <Link
            to="/users"
            className={`hover:text-yellow-400 uppercase font-semibold border-slate-50 border-2 p-2 ${
              activePage === "users" ? "bg-yellow-400" : ""
            }`}
          >
            All users
          </Link>
        )}

        <Link
          to="/status"
          className={`hover:text-yellow-400 uppercase font-semibold border-slate-50 border-2 p-2 ${
            activePage === "status" ? "bg-yellow-400" : ""
          }`}
        >
          Status
        </Link>
      </div>
      <div className="flex justify-end w-full gap-6 items-center">
        <div>
          <span className="text-white font-semibold">
            Welcome{" "}
            <span className="text-lime-400 font-extrabold uppercase">
              {userData.username}
            </span>
          </span>
          <span className="text-white"> ({userData.permission})</span>
        </div>
        <button
          className="bg-white px-3 py-1 rounded-lg text-yellow-600 font-semibold hover:bg-gray-300"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default HeaderNavigationLoggin;
