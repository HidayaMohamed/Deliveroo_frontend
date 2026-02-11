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

  const { register, user } = useAuth();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.role === "courier") {
      if (!form.vehicle_type.trim() || !form.plate_number.trim()) {
        setError("Courier must provide vehicle type and plate number.");
        return;
      }
    }

    const payload = {
      full_name: form.full_name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    // Only add phone if provided
    if (form.phone && form.phone.trim()) {
      payload.phone = form.phone.trim();
    }

    if (form.role === "courier") {
      payload.vehicle_type = form.vehicle_type;
      payload.plate_number = form.plate_number;
    }

    try {
      await register(payload);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Check your inputs.",
      );
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
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 mb-4 font-medium text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block mb-1 font-semibold">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-amber-400"
            >
              <option value="customer">Customer</option>
              <option value="courier">Courier</option>
            </select>
          </div>

          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <input
            name="phone"
            placeholder="Phone (optional, e.g., +254712345678)"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {form.role === "courier" && (
            <>
              <input
                name="vehicle_type"
                placeholder="Vehicle Type"
                value={form.vehicle_type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
              <input
                name="plate_number"
                placeholder="Plate Number"
                value={form.plate_number}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
