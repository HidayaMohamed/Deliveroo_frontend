import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Pass object with email + password
      const loggedInUser = await login({ email, password });

      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else if (loggedInUser.role === "courier") {
        navigate("/courier");
      } else {
        navigate("/orders/new");
      }
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "courier") return <Navigate to="/courier" replace />;
    return <Navigate to="/orders/new" replace />;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-[5%] py-20 bg-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter">
            Sign <span className="italic">in</span>
            <span className="text-yellow-500">.</span>
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[20px] p-5 mb-8">
            <p className="text-red-800 text-sm font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-black font-black underline">
              Create one
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          <ShieldCheck size={12} className="text-gray-300" />
          <p className="text-[9px] text-gray-300 font-bold uppercase">
            Secure 256-bit encrypted login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
