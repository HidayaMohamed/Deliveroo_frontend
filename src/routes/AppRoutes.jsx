import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

// Protected/Public Wrappers
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Features (Orders + User)
import CreateOrder from "../features/orders/CreateOrder";
import MyOrders from "../features/orders/MyOrders";
import OrderDetails from "../features/orders/OrderDetails";
import UserProfile from "../features/user/UserProfile";

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

      {/* ---------------- PROTECTED USER ROUTES ---------------- */}
      <Route
        path="/orders/new"
        element={
          <ProtectedRoute>
            <CreateOrder />
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

      {/* ---------------- ROLE BASED ROUTES ---------------- */}
      <Route path="/user" element={<Navigate to="/orders/new" replace />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <h1>Admin Dashboard</h1>
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier"
        element={
          <ProtectedRoute role="courier">
            <h1>Courier Dashboard</h1>
          </ProtectedRoute>
        }
      />

      {/* ---------------- FALLBACK ---------------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;