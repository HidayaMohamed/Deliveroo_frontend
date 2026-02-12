import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// Global Components
import NotificationToast from "./components/NotificationToast";
import ProtectedRoute from "./components/ProtectedRoute";

// Import features
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";
import UserProfile from "./features/user/UserProfile";

// Import auth hook
import { useAuth } from "./features/auth/useAuth";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* 1. PRIMARY LANDING LOGIC */}
          {/* Redirect unauthenticated users to login, authenticated users to orders/new */}
          <Route
            index
            element={
              user ? (
                <Navigate to="/orders/new" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 2. ORDER ROUTES (Protected for customers) */}
          <Route
            path="/orders/new"
            element={
              <ProtectedRoute role="customer">
                <CreateOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute role="customer">
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute role="customer">
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          {/* 3. USER ROUTES */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* 4. FALLBACK */}
          {/* Redirect based on authentication status */}
          <Route
            path="*"
            element={
              user ? (
                user.role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : user.role === "courier" ? (
                  <Navigate to="/courier" replace />
                ) : (
                  <Navigate to="/orders/new" replace />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
