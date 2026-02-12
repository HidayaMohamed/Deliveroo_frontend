import { Routes, Route, Navigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Unauthorized from "./pages/Unauthorized";

// Features
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";
import UserProfile from "./features/user/UserProfile";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected order routes */}
          <Route path="/orders/new" element={<ProtectedRoute><CreateOrder /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />

          {/* Protected user routes */}
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* Role-based dashboards */}
          <Route path="/user" element={<Navigate to="/orders/new" replace />} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><h1>Admin Dashboard</h1></ProtectedRoute>} />
          <Route path="/courier" element={<ProtectedRoute role="courier"><h1>Courier Dashboard</h1></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
