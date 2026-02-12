import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultRole = (searchParams.get("role") || "customer").toLowerCase();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: defaultRole,
    vehicle_type: "",
    plate_number: "",
  });

  const { register, user, loading } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? value.toLowerCase() : value,
    }));
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Courier validation
    if (form.role === "courier") {
      if (!form.vehicle_type.trim() || !form.plate_number.trim()) {
        setError("Courier must provide vehicle type and plate number.");
        return;
      }
    }

    const payload = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role,
    };

    // Add phone if provided
    if (form.phone.trim()) {
      payload.phone = form.phone.trim();
    }

    // Add courier fields
    if (form.role === "courier") {
      payload.vehicle_type = form.vehicle_type.trim();
      payload.plate_number = form.plate_number.trim();
    }

    setIsSubmitting(true);
    try {
      await register(payload);
      // Navigation handled by AuthContext useEffect
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "courier") navigate("/courier");
      else navigate("/customer");
    }
  }, [user, navigate, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Deliveroo
          </h2>
          <p className="text-gray-600 font-medium">Create your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Type
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            >
              <option value="customer">👛 Customer</option>
              <option value="courier">🚴 Courier/Rider</option>
            </select>
          </div>

          <div>
            <input
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition disabled:bg-gray-50"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition disabled:bg-gray-50"
              required
            />
          </div>

          <div>
            <input
              name="phone"
              type="tel"
              placeholder="Phone (+254712345678)"
              value={form.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition disabled:bg-gray-50"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (8+ characters)"
              value={form.password}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition disabled:bg-gray-50"
              required
            />
          </div>

          {form.role === "courier" && (
            <>
              <div>
                <input
                  name="vehicle_type"
                  placeholder="Vehicle Type (Motorcycle, Bicycle, etc.)"
                  value={form.vehicle_type}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition disabled:bg-gray-50"
                  required
                />
              </div>
              <div>
                <input
                  name="plate_number"
                  placeholder="Plate Number (KMC456X)"
                  value={form.plate_number}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition disabled:bg-gray-50"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 focus:ring-4 focus:ring-amber-200 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-amber-600 hover:text-amber-700"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
