import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Customer Features
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";
import UserProfile from "./features/user/UserProfile"; // <--- Added for Sharon's Personal Profile

// Rider/Courier Features
import AssignedOrders from "./features/courier/AssignedOrders";
import RiderPortal from "./features/courier/RiderPortal";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
    <AppRoutes />
      <div className="app-container">
        {/* The high-end Obsidian & Gold Navbar */}
        <Navbar />

        <main className="content-area" style={{ minHeight: '80vh' }}>
          <Routes>
            {/* 1. ENTRY POINT */}
            {/* Redirects to the Create Order page automatically */}
            <Route path="/" element={<Navigate to="/orders/new" />} />
            
            {/* 2. CUSTOMER FLOW */}
            <Route path="/orders/new" element={<CreateOrder />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            
            {/* 3. PRIVATE USER VAULT */}
            {/* This is where Sharon manages her ID, Age, and Personal Info */}
            <Route path="/profile" element={<UserProfile />} />
            
            {/* 4. RIDER LOGISTICS FLOW */}
            {/* The "Cockpit" where riders manage their status and vehicle */}
            <Route path="/rider-portal" element={<RiderPortal />} /> 
            {/* The list of specific tasks assigned to them */}
            <Route path="/courier/tasks" element={<AssignedOrders />} />
            
            {/* 5. CATCH-ALL SAFETY */}
            {/* If a user types a wrong URL, take them back home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}


function App() {
  return (
    <div>
    </div>
  );
}

export default App;
