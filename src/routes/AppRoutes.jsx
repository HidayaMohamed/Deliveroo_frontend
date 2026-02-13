import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";
import AdminDashboard from "../pages/AdminDashboard";
import CourierDashboard from "../pages/CourierDashboard";
import RiderProfile from "../pages/RiderProfile";

// Protected/Public Wrappers
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Features (Orders + User)
import CreateOrder from "../features/orders/CreateOrder";
import MyOrders from "../features/orders/MyOrders";
import OrderDetails from "../features/orders/OrderDetails";
import UserProfile from "../features/user/UserProfile";

// Hook
import { useAuth } from "../features/auth/useAuth";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return null;
  }

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

      {/* ---------------- PROTECTED USER ROUTES ---------------- */}
      <Route
        path="/orders/new"
        element={
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        }
      />

      {/* ---------------- COURIER ROUTES ---------------- */}
      <Route
        path="/courier/dashboard"
        element={
          <ProtectedRoute role="courier">
            <CourierDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier/profile"
        element={
          <ProtectedRoute role="courier">
            <RiderProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
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
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ---------------- CUSTOMER ROUTES ---------------- */}
      <Route
        path="/customer/create-order"
        element={
          <ProtectedRoute role="customer">
            <CreateOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/orders"
        element={
          <ProtectedRoute role="customer">
            <MyOrders />
          </ProtectedRoute>
        }
      />

      {/* ---------------- FALLBACK ---------------- */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="customer">
            <CreateOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier"
        element={
          <ProtectedRoute role="courier">
            <Navigate to="/courier/dashboard" replace />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
