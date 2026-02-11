import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    // Already logged in - redirect to appropriate dashboard
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === "courier") {
      return <Navigate to="/courier/dashboard" replace />;
    }
    // Default to customer dashboard
    return <Navigate to="/customer/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
