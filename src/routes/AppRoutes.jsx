import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

// Public pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

// Customer pages
import CustomerDashboard from "../pages/CustomerDashboard";
import CreateOrder from "../features/orders/CreateOrder";
import OrdersList from "../components/orders/OrdersList";
import LiveTrackingMap from "../components/maps/LiveTrackingMap";

// Courier pages
import CourierDashboard from "../pages/CourierDashboard";
import AssignedOrders from "../features/courier/AssignedOrders";
import GoogleMaps from "../components/maps/GoogleMaps";

// Admin pages
import AdminDashboard from "../pages/AdminDashboard";
// import UserManagement from "../pages/admin/UserManagement";
import AllOrders from "../features/admin/AllOrders";

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
            <OrdersList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/track-order"
        element={
          <ProtectedRoute role="customer">
            <LiveTrackingMap />
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
            <AssignedOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courier/map"
        element={
          <ProtectedRoute role="courier">
            <GoogleMaps />
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

      {/* <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <UserManagement />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute role="admin">
            <AllOrders />
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
