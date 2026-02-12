<<<<<<< HEAD
import { Toaster } from "react-hot-toast";
import { Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// Global Components
import NotificationToast from "./components/NotificationToast";

// Import pages for routing
=======
import "leaflet/dist/leaflet.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Unauthorized from "./pages/Unauthorized";
import AdminDashboard from "./pages/AdminDashboard";
import CourierDashboard from "./pages/CourierDashboard";
import RiderProfile from "./pages/RiderProfile";
>>>>>>> origin/main
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";
import UserProfile from "./features/user/UserProfile";
<<<<<<< HEAD
=======

import { Routes, Route, Navigate } from "react-router-dom";
>>>>>>> origin/main

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />
<<<<<<< HEAD

      <main className="flex-grow">
        <Routes>
          {/* 1. PRIMARY LANDING LOGIC */}
          {/* This ensures that the base URL "/" immediately renders the CreateOrder component */}
          <Route index element={<Navigate to="/orders/new" replace />} />

          {/* 2. ORDER ROUTES (Rearranged for priority) */}
          {/* Define the 'new' subpath BEFORE the generic list path */}
          <Route path="/orders/new" element={<CreateOrder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />

          {/* 3. USER ROUTES */}
          <Route path="/profile" element={<UserProfile />} />

          {/* 4. FALLBACK */}
          {/* If a user enters a wrong URL, send them to Ship Parcel */}
          <Route path="*" element={<Navigate to="/orders/new" replace />} />
=======
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
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

          {/* Orders */}
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

          {/* User */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/control-center" replace />}
          />
          <Route
            path="/admin/control-center"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Courier */}
          <Route
            path="/courier"
            element={<Navigate to="/courier/dashboard" replace />}
          />
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

          {/* Legacy */}
          <Route path="/user" element={<Navigate to="/orders/new" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
>>>>>>> origin/main
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
