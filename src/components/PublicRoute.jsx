import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (user) {
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "COURIER") return <Navigate to="/courier" replace />;
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default PublicRoute;
