import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

// Route Guards
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// User Features
import CreateOrder from "../features/orders/CreateOrder";
import MyOrders from "../features/orders/MyOrders";
import OrderDetails from "../features/orders/OrderDetails";
import UserProfile from "../features/user/UserProfile";

// Admin
import AdminDashboard from "../pages/AdminDashboard";

// Courier Pages
import RiderProfile from "../pages/RiderProfile";
import CourierDashboard from "../pages/CourierDashboard";

/**
 * VOLT CORE NAVIGATION ARCHITECTURE
 * Manages Public, User, Admin, and Courier routing layers.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* ---------------- PUBLIC ROUTES ---------------- */}
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

      {/* ---------------- USER PROTECTED ROUTES ---------------- */}
      <Route
        path="/orders/new"
        element={
          <ProtectedRoute role="user">
            <CreateOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute role="user">
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute role="user">
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* ---------------- ADMIN ROUTES ---------------- */}
      <Route path="/admin" element={<Navigate to="/admin/control-center" replace />} />

      <Route
        path="/admin/control-center"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ---------------- COURIER ROUTES ---------------- */}
      <Route path="/courier" element={<Navigate to="/courier/dashboard" replace />} />

      <Route
        path="/courier/dashboard"
        element={
          <ProtectedRoute role="courier">
            <CourierDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rider/profile"
        element={
          <ProtectedRoute role="courier">
            <RiderProfile />
          </ProtectedRoute>
        }
      />

      {/* ---------------- FALLBACK ---------------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;