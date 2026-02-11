import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password");
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin");
    else if (user.role === "courier") navigate("/courier");
    else navigate("/customer");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-amber-600 mb-6">
          Login to Deliveroo
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-amber-400"
              placeholder="********"
              required
            />
          </div>

          <button className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-amber-500 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
