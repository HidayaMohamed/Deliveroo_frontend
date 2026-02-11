import { useState, useEffect } from "react";
import { useAuth } from "../features/auth/useAuth";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? value.toLowerCase() : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation: courier must have vehicle + plate
    if (form.role === "courier") {
      if (!form.vehicle_type.trim() || !form.plate_number.trim()) {
        setError("Courier must provide vehicle type and plate number.");
        return;
      }
    }

    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      role: form.role,
    };

    if (form.role === "courier") {
      payload.vehicle_type = form.vehicle_type;
      payload.plate_number = form.plate_number;
    }

    try {
      await register(payload);
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your input.",
      );
    }
  };

  // Redirect after successful registration
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

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-brand-cream rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
      <p className="text-center text-gray-500 mb-6">
        {form.role === "courier" ? "Join as a Courier" : "Join as a Customer"}
      </p>

      {error && (
        <p className="text-red-600 mb-4 font-medium text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">I want to</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="customer">Send Parcels (Customer)</option>
            <option value="courier">Deliver Parcels (Courier)</option>
          </select>
        </div>

        {/* Full Name */}
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-brand-orange focus:outline-none"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-brand-orange focus:outline-none"
          required
        />

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone Number (+254...)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-brand-orange focus:outline-none"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-brand-orange focus:outline-none"
          required
        />

        {/* Courier-only fields */}
        {form.role === "courier" && (
          <>
            <input
              name="vehicle_type"
              placeholder="Vehicle Type (e.g., Motorcycle, Car)"
              value={form.vehicle_type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              required
            />
            <input
              name="plate_number"
              placeholder="Plate Number"
              value={form.plate_number}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mb-4 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              required
            />
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-brand-orange text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          {form.role === "courier" ? "Apply as Courier" : "Create Account"}
        </button>
      </form>

      {/* Login link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login?role=customer"
            className="text-brand-orange font-semibold"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Back to home */}
      <div className="mt-4 text-center">
        <Link to="/" className="text-sm text-gray-500 hover:text-brand-orange">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;
