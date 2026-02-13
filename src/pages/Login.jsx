import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
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
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
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
    <div className="min-h-[85vh] flex items-center justify-center px-[5%] py-20 bg-white selection:bg-yellow-200">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">
              Welcome Back
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">
            Sign <span className="italic">in</span>
            <span className="text-yellow-500">.</span>
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[20px] p-5 mb-8 flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
            <p className="text-red-800 text-sm font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 p-6 pl-14 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl focus:bg-white transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"
              />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 p-6 pl-14 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl focus:bg-white transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-black text-white rounded-[30px] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-yellow-500 hover:text-black transition-all active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && (
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-black font-black hover:text-yellow-600 transition-colors underline decoration-yellow-500 decoration-2 underline-offset-4"
            >
              Create one
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          <ShieldCheck size={12} className="text-gray-300" />
          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
            Secure 256-bit encrypted login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
