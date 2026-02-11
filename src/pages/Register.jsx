import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import { useSearchParams, Navigate } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "customer";

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: defaultRole,
    vehicle_type: "",
    plate_number: "",
  });

  const [error, setError] = useState("");
  const { register, user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  // Redirect if logged in
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "courier") return <Navigate to="/courier" replace />;
    return <Navigate to="/orders/new" replace />;
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-brand-cream rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>

      {error && (
        <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="customer">User</option>
            <option value="courier">Courier</option>
          </select>
        </div>

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number (e.g. +254712345678)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
        />

        {/* Show courier fields only if role is courier */}
        {form.role === "courier" && (
          <>
            <input
              name="vehicle_type"
              placeholder="Vehicle Type"
              value={form.vehicle_type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            />
            <input
              name="plate_number"
              placeholder="Plate Number"
              value={form.plate_number}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mb-4"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-brand-orange text-white py-2 rounded-lg font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
