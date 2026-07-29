import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("Please fill in all fields.");
    }

    try {
      setLoading(true);

      await login(formData);

      navigate("/admin", {
        replace: true,
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/60
        backdrop-blur-2xl
        p-8
        shadow-2xl
        shadow-blue-500/5
      "
    >
      <h2 className="text-3xl font-bold text-white">
        Admin Login
      </h2>

      <p className="mt-2 text-zinc-400">
        Sign in to manage your portfolio.
      </p>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        {/* Email */}

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-950/60
              py-4
              pl-12
              pr-4
              text-white
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
            "
          />
        </div>

        {/* Password */}

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-zinc-700
              bg-zinc-950/60
              py-4
              pl-12
              pr-12
              text-white
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-4 text-zinc-500 hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-blue-600
            py-4
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Signing In...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Login
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default LoginForm;