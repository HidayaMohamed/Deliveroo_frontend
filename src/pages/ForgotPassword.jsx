import { useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authAPI.forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 p-10 text-center">
          <div className="w-20 h-20 bg-yellow-400/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-4">
            Check your email
          </h2>
          <p className="text-gray-500 mb-8 font-medium leading-relaxed">
            If an account exists for{" "}
            <strong className="text-black">{email}</strong>, we have sent
            password reset instructions.
          </p>
          <Link
            to="/login"
            className="text-yellow-500 hover:text-yellow-400 font-black uppercase text-xs tracking-widest"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 p-10">
        <h2 className="text-3xl font-black text-center text-black uppercase tracking-tighter mb-6">
          Reset Password
        </h2>
        <p className="text-gray-500 text-center mb-8 font-medium">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-300 disabled:bg-gray-200 transition-all shadow-lg shadow-yellow-400/20"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          <Link
            to="/login"
            className="text-yellow-500 hover:text-yellow-400 font-black uppercase text-xs tracking-widest"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
