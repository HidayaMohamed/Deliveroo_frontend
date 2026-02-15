import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authAPI } from "../services/api";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        await authAPI.verifyEmail(token);
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.error ||
            "Verification failed. The link may be invalid or expired.",
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 p-10 text-center">
        {status === "verifying" && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-6"></div>
            <h2 className="text-xl font-black text-black uppercase tracking-tight">
              Verifying your email...
            </h2>
          </div>
        )}

        {status === "success" && (
          <div>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-4">
              Email Verified!
            </h2>
            <p className="text-gray-500 mb-8 font-medium leading-relaxed">
              Your account has been successfully verified. You can now log in.
            </p>
            <Link
              to="/login"
              className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-500 mb-8 font-medium">{message}</p>
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-400 font-black uppercase text-xs tracking-widest"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
