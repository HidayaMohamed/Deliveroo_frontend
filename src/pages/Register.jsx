import { useState, useEffect } from "react";
import { useAuth } from "../features/auth/useAuth";
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
      role: form.role, // already lowercase
    };

    if (form.role === "courier") {
      payload.vehicle_type = form.vehicle_type;
      payload.plate_number = form.plate_number;
    }

    try {
      await register(payload);
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError("Registration failed. Please check your input.");
    }
  };

  // Redirect after successful registration / login
  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/admin");
    else if (user.role === "courier") navigate("/courier");
    else navigate("/user");
  }, [user, navigate]);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-brand-cream rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>

      {error && (
        <p className="text-red-600 mb-4 font-medium text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Role */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          >
            <option value="customer">Customer</option>
            <option value="courier">Courier</option>
          </select>
        </div>

        {/* Full Name */}
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
        />

        {/* Phone */}
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg mb-4"
          required
        />

        {/* Courier-only fields */}
        {form.role === "courier" && (
          <>
            <input
              name="vehicle_type"
              placeholder="Vehicle Type"
              value={form.vehicle_type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mb-4"
              required
            />
            <input
              name="plate_number"
              placeholder="Plate Number"
              value={form.plate_number}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg mb-4"
              required
            />
          </>
        )}

        {/* Submit */}
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
