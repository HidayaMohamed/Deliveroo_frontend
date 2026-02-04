import { useState, useEffect } from "react";
import { useAuth } from "../features/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "ADMIN") navigate("/admin");
    else if (user.role === "COURIER") navigate("/courier");
    else navigate("/user");
  }, [user, navigate]);
  
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <button className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-brand-orange font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
