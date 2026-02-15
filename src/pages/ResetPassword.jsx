import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
        toast.error("Invalid reset token");
        return;
    }

    setLoading(true);
    try {
      await authAPI.resetPassword(token, formData.password);
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
            <div className="bg-white p-10 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 text-center">
                <p className="text-red-500 mb-6 font-medium">Invalid or missing reset token.</p>
                <Link to="/login" className="text-yellow-500 hover:text-yellow-400 font-black uppercase text-xs tracking-widest">Back to Login</Link>
            </div>
        </div>
      )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 p-10">
        <h2 className="text-3xl font-black text-center text-black uppercase tracking-tighter mb-8">Set New Password</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
              New Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-300 disabled:bg-gray-200 transition-all shadow-lg shadow-yellow-400/20 mt-2"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
