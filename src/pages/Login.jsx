import { useState, useEffect } from "react";
import { useAuth } from "../features/auth/useAuth";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role") || "";

  // Redirect after successful login based on role
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "courier") {
        navigate("/courier/dashboard");
      } else {
        navigate("/customer/dashboard");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-4">
      <div className="max-w-md w-full bg-brand-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-brand-orange mb-2">
          Deliveroo
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {roleParam === "admin"
            ? "Admin Login"
            : roleParam === "courier"
              ? "Courier Login"
              : "Customer Login"}
        </p>

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
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-brand-orange focus:outline-none"
              required
            />
          </div>

          <button className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            Login
          </button>
        </form>

        {/* Show appropriate register link based on role */}
        <div className="mt-6 text-center">
          {roleParam === "courier" ? (
            <p className="text-sm text-gray-600">
              New courier?{" "}
              <Link
                to="/register?role=courier"
                className="text-brand-orange font-semibold"
              >
                Apply here
              </Link>
            </p>
          ) : roleParam !== "admin" ? (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register?role=customer"
                className="text-brand-orange font-semibold"
              >
                Register
              </Link>
            </p>
          ) : null}
        </div>

        {/* Back to home */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-brand-orange"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
