import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import { useSearchParams } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") || "customer";

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: defaultRole.toLowerCase(),
    vehicle_type: "",
    plate_number: "",
  });

  const { register, user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { ...form };

    // Only include courier fields if role is courier
    if (form.role !== "courier") {
      delete submitData.vehicle_type;
      delete submitData.plate_number;
    }

    await register(submitData);
  };

  // Redirect if logged in
  if (user) {
    if (user.role === "ADMIN") window.location.href = "/admin";
    else if (user.role === "COURIER") window.location.href = "/courier";
    else window.location.href = "/user";
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-brand-cream rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>

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
        placeholder="Name"
        value={form.full_name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-lg mb-4"
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-lg mb-4"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-lg mb-4"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded-lg mb-4"
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
        onClick={handleSubmit}
        className="w-full bg-brand-orange text-white py-2 rounded-lg font-semibold"
      >
        Register
      </button>
    </div>
  );
};

export default Register;
