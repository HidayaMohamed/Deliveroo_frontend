import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public-only pages */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected pages */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="USER">
            <h1>User Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier"
        element={
          <ProtectedRoute role="COURIER">
            <h1>Courier Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <h1>Admin Dashboard</h1>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
