import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Global Components (from your src/components folder)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Features (from your src/features/orders folder)
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";

// Courier Features (from your src/features/courier folder)
import AssignedOrders from "./features/courier/AssignedOrders";

// Admin Features (from your src/features/admin folder)
import Dashboard from "./features/admin/Dashboard";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* The Navbar stays at the top of every page */}
        <Navbar />

        {/* Main Content Area */}
        <main className="content-area" style={{ minHeight: '80vh' }}>
          <Routes>
            {/* 1. HOME / DEFAULT ROUTE */}
            <Route path="/" element={<Navigate to="/orders/new" />} />
            
            {/* 2. CUSTOMER ROUTES */}
            <Route path="/orders/new" element={<CreateOrder />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            
            {/* 3. COURIER ROUTES */}
            <Route path="/courier/dashboard" element={<AssignedOrders />} />
            
            {/* 4. ADMIN ROUTES */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            
            {/* CATCH-ALL: Redirect any unknown URL to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* The Footer stays at the bottom of every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;