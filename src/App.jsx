import { Toaster } from "react-hot-toast";
import { Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// Global Components
import NotificationToast from "./components/NotificationToast";

// Import pages for routing
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
