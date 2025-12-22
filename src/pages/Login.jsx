import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      // Add a slight delay just for the UI feel of "processing" success
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setError(err.response?.data?.msg || "Incorrect email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      
      {/* Background Decor (Subtle Blur) */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      {/* Back to Home Link */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 md:left-12 z-10"
      >
        {/* <Link 
          to="/" 
          className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link> */}
      </motion.div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-white z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome back</h2>
          <p className="text-gray-500">Enter your credentials to access your vault.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-2xl flex items-center"
          >
            <AlertCircle size={18} className="mr-2 shrink-0" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full pl-12 p-3.5 transition-all outline-none"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" class="text-xs font-medium text-blue-600 hover:text-blue-500">Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 block w-full pl-12 p-3.5 transition-all outline-none"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
      
      <p className="absolute bottom-6 text-xs text-gray-400">
        © 2024 PhotoSafe Inc. Secure Login.
      </p>
    </div>
  );
};

export default Login;