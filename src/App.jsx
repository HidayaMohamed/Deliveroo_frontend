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
      </main>

      <Footer />
    </div>
  );
}

export default App;
