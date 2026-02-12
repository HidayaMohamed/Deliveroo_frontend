import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "courier") return <Navigate to="/courier" replace />;
    return <Navigate to="/orders/new" replace />;
  }

  return children;
};

export default PublicRoute;
