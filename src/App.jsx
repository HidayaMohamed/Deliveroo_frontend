<<<<<<< HEAD

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
// Global Components
import NotificationToast from "./components/NotificationToast";
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
>>>>>>> main

// Import AppRoutes for routing logic
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
<<<<<<< HEAD
    <div className="app-container">
      {/* React Hot Toast container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#363636",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      />

      {/* Global Notification Toast component for polling */}
      <NotificationToast />

      <main className="content-area" style={{ minHeight: "80vh" }}>
        <AppRoutes />
=======
    <div className="flex flex-col min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected order routes (any authenticated user) */}
          <Route path="/orders/new" element={<ProtectedRoute><CreateOrder /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

          {/* Protected user routes */}
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/control-center" replace />} />
          <Route path="/admin/control-center" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />

          {/* Courier routes */}
          <Route path="/courier" element={<Navigate to="/courier/dashboard" replace />} />
          <Route path="/courier/dashboard" element={<ProtectedRoute role="courier"><CourierDashboard /></ProtectedRoute>} />
          <Route path="/rider/profile" element={<ProtectedRoute role="courier"><RiderProfile /></ProtectedRoute>} />

          {/* Legacy redirect */}
          <Route path="/user" element={<Navigate to="/orders/new" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
>>>>>>> main
      </main>

      <Footer />
      
    </div>
  );
}

export default App;
<<<<<<< HEAD

=======
>>>>>>> main
