import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        PhotoSafe
      </Link>

      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/dashboard" className="text-gray-700">
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="text-red-500 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
