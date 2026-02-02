import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    vehicle_type: "",
    plate_number: "",
  });

  const { register, user } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  if (user) {
    if (user.role === "ADMIN") window.location.href = "/admin";
    else if (user.role === "COURIER") window.location.href = "/courier";
    else window.location.href = "/user";
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange}>
        <option value="USER">User</option>
        <option value="COURIER">Courier</option>
      </select>

      {form.role === "COURIER" && (
        <>
          <input
            name="vehicle_type"
            placeholder="Vehicle Type"
            onChange={handleChange}
          />
          <input
            name="plate_number"
            placeholder="Plate Number"
            onChange={handleChange}
          />
        </>
      )}

      <button type="submit">Create Account</button>
    </form>
  );
};

export default Register;
