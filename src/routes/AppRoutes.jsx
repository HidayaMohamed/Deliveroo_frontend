import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Dashboard pages
import AdminDashboard from "../pages/AdminDashboard";
import CourierDashboard from "../pages/CourierDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      {/* Landing Page - Default entry */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />

      {/* Login - All roles can access */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* Register - Only customers and couriers */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Unauthorized page */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ================= PROTECTED ROUTES ================= */}

      {/* Customer Dashboard */}
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Customer Orders */}
      <Route
        path="/customer/orders"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Courier Dashboard */}
      <Route
        path="/courier/dashboard"
        element={
          <ProtectedRoute role="courier">
            <CourierDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= REDIRECTS ================= */}

      {/* Legacy route redirects */}
      <Route
        path="/user"
        element={<Navigate to="/customer/dashboard" replace />}
      />
      <Route
        path="/courier"
        element={<Navigate to="/courier/dashboard" replace />}
      />
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      {/* Catch all - redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
