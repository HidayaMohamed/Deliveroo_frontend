import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials");
    }
  };

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "courier") return <Navigate to="/courier" replace />;
    return <Navigate to="/orders/new" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="max-w-md w-full bg-brand-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-brand-orange mb-6">
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-brand-orange font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
