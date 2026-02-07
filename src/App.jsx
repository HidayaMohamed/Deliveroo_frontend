import { Routes, Route, Navigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Customer Features
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";
import UserProfile from "./features/user/UserProfile";

// NOTE: Rider/Courier imports have been removed to focus on Customer Experience

function App() {
  return (
    <div className="app-container">
      {/* High-end Navbar stays constant across all pages */}
      <Navbar />

      <main className="content-area" style={{ minHeight: '80vh' }}>
        <Routes>
          {/* 1. ENTRY POINT */}
          <Route path="/" element={<Navigate to="/orders/new" />} />
          
          {/* 2. CUSTOMER FLOW */}
          <Route path="/orders/new" element={<CreateOrder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          
          {/* 3. PROFILE */}
          <Route path="/profile" element={<UserProfile />} />
          
          {/* 4. CATCH-ALL SAFETY */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;