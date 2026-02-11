import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Public pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

// Customer pages
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CreateOrder from "../pages/customer/CreateOrder";
import MyOrders from "../pages/customer/MyOrders";
import TrackOrder from "../pages/customer/TrackOrder";

// Courier pages
import CourierDashboard from "../pages/courier/CourierDashboard";
import AssignedTasks from "../pages/courier/AssignedTasks";
import DeliveryMap from "../pages/courier/DeliveryMap";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import OrderControl from "../pages/admin/OrderControl";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Routes>
      {/* Public routes - Landing page is accessible to everyone */}
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

      {/* Customer routes */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/customer/track-order"
        element={
          <ProtectedRoute role="customer">
            <TrackOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/track-order/:id"
        element={
          <ProtectedRoute role="customer">
            <TrackOrder />
          </ProtectedRoute>
        }
      />

      {/* Courier routes */}
      <Route
        path="/courier"
        element={
          <ProtectedRoute role="courier">
            <CourierDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier/tasks"
        element={
          <ProtectedRoute role="courier">
            <AssignedTasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier/map"
        element={
          <ProtectedRoute role="courier">
            <DeliveryMap />
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <UserManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute role="admin">
            <OrderControl />
          </ProtectedRoute>
        }
      />

      {/* User profile - accessible to all authenticated users */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">User Profile</h1>
              <p>Welcome, {user?.full_name || user?.email}</p>
              <p className="mt-2">Role: {user?.role}</p>
              <p className="mt-2">Email: {user?.email}</p>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Catch-all - redirect to home or appropriate dashboard based on role */}
      <Route
        path="*"
        element={
          user ? (
            user.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : user.role === "courier" ? (
              <Navigate to="/courier" replace />
            ) : (
              <Navigate to="/customer" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
