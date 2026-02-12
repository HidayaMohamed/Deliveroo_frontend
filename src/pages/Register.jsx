import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Truck, ArrowRight, ShieldCheck } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  

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
    setLoading(true);
    try {
      await register(form);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "courier") return <Navigate to="/courier" replace />;
    return <Navigate to="/orders/new" replace />;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-[5%] py-20 bg-white selection:bg-yellow-200">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">Join The Fleet</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter">
            Create <span className="italic">account</span><span className="text-yellow-500">.</span>
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-[20px] p-5 mb-8 flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
            <p className="text-red-800 text-sm font-bold">{error}</p>
          </div>
        )}

        {/* Role Selector */}
        <div className="mb-8">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block">I want to</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "customer" })}
              className={`p-5 rounded-[25px] border-2 text-left transition-all ${
                form.role === "customer"
                  ? "border-black bg-black text-white shadow-xl"
                  : "border-gray-100 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <User size={20} className={form.role === "customer" ? "text-yellow-400 mb-2" : "text-gray-400 mb-2"} />
              <p className="text-xs font-black uppercase tracking-widest">Send Parcels</p>
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "courier" })}
              className={`p-5 rounded-[25px] border-2 text-left transition-all ${
                form.role === "courier"
                  ? "border-black bg-black text-white shadow-xl"
                  : "border-gray-100 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <Truck size={20} className={form.role === "courier" ? "text-yellow-400 mb-2" : "text-gray-400 mb-2"} />
              <p className="text-xs font-black uppercase tracking-widest">Deliver Parcels</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                name="full_name"
                placeholder="John Doe"
                value={form.full_name}
                onChange={handleChange}
                className="w-full bg-gray-50 p-6 pl-14 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl focus:bg-white transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-50 p-6 pl-14 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl focus:bg-white transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Phone Number</label>
            <div className="relative">
              <Phone size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                name="phone"
                placeholder="+254712345678"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 p-6 pl-14 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl focus:bg-white transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-50 p-6 pl-14 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl focus:bg-white transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                required
              />
            </div>
          </div>

          {/* Courier-specific fields */}
          {form.role === "courier" && (
            <div className="bg-gray-50 p-6 rounded-[30px] border border-gray-100 space-y-5">
              <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em]">Courier Details</p>
              <div className="relative group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Vehicle Type</label>
                <input
                  name="vehicle_type"
                  placeholder="e.g. Motorcycle, Bicycle, Van"
                  value={form.vehicle_type}
                  onChange={handleChange}
                  className="w-full bg-white p-5 rounded-[20px] outline-none font-bold text-sm shadow-sm focus:shadow-xl transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                />
              </div>
              <div className="relative group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Plate Number</label>
                <input
                  name="plate_number"
                  placeholder="e.g. KDM 442X"
                  value={form.plate_number}
                  onChange={handleChange}
                  className="w-full bg-white p-5 rounded-[20px] outline-none font-bold text-sm shadow-sm focus:shadow-xl transition-all placeholder:text-gray-300 border border-transparent focus:border-yellow-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-6 bg-black text-white rounded-[30px] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-yellow-500 hover:text-black transition-all active:scale-95 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-black hover:text-yellow-600 transition-colors underline decoration-yellow-500 decoration-2 underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          <ShieldCheck size={12} className="text-gray-300" />
          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Secure 256-bit encrypted registration</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
