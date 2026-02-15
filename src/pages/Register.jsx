import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Zap, CheckCircle2, ArrowRight } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    vehicle_type: "",
    plate_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMode, setSuccessMode] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const data = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "courier") {
      data.vehicle_type = formData.vehicle_type;
      data.plate_number = formData.plate_number;
    }

    setLoading(true);
    const result = await register(data);
    setLoading(false);

    if (result.success) {
      setSuccessMode(true);
    }
  };

  // SUCCESS STATE DESIGN
  if (successMode) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-6 font-sans antialiased">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
          <div className="w-20 h-20 bg-yellow-400/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-yellow-600" />
          </div>
          <h2 className="text-3xl font-black text-black tracking-tighter uppercase mb-4">
            Success{" "}
            <span className="italic font-light text-gray-400 normal-case">
              Confirmed
            </span>
          </h2>
          <p className="text-gray-500 font-medium leading-relaxed mb-8">
            Please check your email to verify your account. Access to the
            network is restricted until verification is complete.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 w-full bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-all"
          >
            Return to Login <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // FORM DESIGN
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-16 px-6 font-sans antialiased">
      {/* Structural background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-yellow-400 mb-6 shadow-lg shadow-black/10">
              <Zap size={28} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-black text-black tracking-tighter uppercase text-center">
              Create{" "}
              <span className="italic font-light text-gray-400 normal-case">
                Account
              </span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <InputField
                label="Full Name"
                name="full_name"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={handleChange}
                required
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+254 700 000 000"
                value={formData.phone}
                onChange={handleChange}
              />

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                    Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                >
                  <option value="customer">Customer</option>
                  <option value="courier">Courier</option>
                </select>
              </div>

              {formData.role === "courier" && (
                <div className="space-y-5 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                      Vehicle Type
                    </label>
                    <select
                      name="vehicle_type"
                      value={formData.vehicle_type}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                      required={formData.role === "courier"}
                    >
                      <option value="">Select type</option>
                      <option value="Motorcycle">Motorcycle</option>
                      <option value="Bicycle">Bicycle</option>
                      <option value="Car">Car</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>

                  <InputField
                    label="Plate Number"
                    name="plate_number"
                    placeholder="ABC123DE"
                    value={formData.plate_number}
                    onChange={handleChange}
                    required={formData.role === "courier"}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="Confirm"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 mt-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 disabled:bg-gray-300"
            >
              {loading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Member already?{" "}
              <Link
                to="/login"
                className="text-black font-black uppercase text-[11px] tracking-widest border-b-2 border-yellow-400 pb-0.5 hover:text-yellow-600 transition-colors"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component for clean code
const InputField = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold"
    />
  </div>
);

export default Register;
