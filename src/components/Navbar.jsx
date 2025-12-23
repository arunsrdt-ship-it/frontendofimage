import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To force re-render on route changes if needed
  const [scrolled, setScrolled] = useState(false);
  
  // Check token to determine auth state
  // Note: In a real app, you might want to use a Context or Redux for this
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold tracking-tight text-gray-900">
          PhotoSafe
        </Link>
        
        <div className="flex items-center gap-6">
          {token ? (
            // --- Logged In State ---
            <>
              <button 
                onClick={logout} 
                className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors flex cursor-pointer items-center gap-2"
              >
                Logout
              </button>
              
              <Link
                to="/dashboard"
                className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-gray-900/20"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </>
          ) : (
            // --- Logged Out State ---
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-900/20"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;