import { Routes, Route, Navigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// Global Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Features
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
import OrderDetails from "./features/orders/OrderDetails";
import UserProfile from "./features/user/UserProfile";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-yellow-200">
      <Navbar />
      
      {/* The main content area where all the magic happens */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/orders/new" element={<CreateOrder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/orders" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;