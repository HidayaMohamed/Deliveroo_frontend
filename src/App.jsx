import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// User Features
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";

// Courier Features
import AssignedOrders from "./features/courier/AssignedOrders";
import RiderPortal from "./features/courier/RiderPortal"; // <--- ADDED THIS

// Admin Features
import Dashboard from "./features/admin/Dashboard";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="content-area" style={{ minHeight: '80vh' }}>
          <Routes>
            {/* 1. HOME / DEFAULT ROUTE */}
            <Route path="/" element={<Navigate to="/orders/new" />} />
            
            {/* 2. CUSTOMER ROUTES */}
            <Route path="/orders/new" element={<CreateOrder />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            
            {/* 3. COURIER/RIDER ROUTES */}
            {/* This is the task list for the courier */}
            <Route path="/courier/tasks" element={<AssignedOrders />} />
            {/* This is the high-end "Cockpit" dashboard you just built */}
            <Route path="/rider-portal" element={<RiderPortal />} /> 
            
            {/* 4. ADMIN ROUTES */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            
            {/* CATCH-ALL */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;