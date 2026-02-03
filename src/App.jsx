import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CreateOrder from "./features/orders/CreateOrder";
import MyOrders from "./features/orders/MyOrders";
// import OrderDetails from "./features/orders/OrderDetails"; // Comment out if you haven't created this file yet!

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect the base URL (/) to the new order page so you don't see a white screen */}
        <Route path="/" element={<Navigate to="/orders/new" />} />
        
        <Route path="/orders/new" element={<CreateOrder />} />
        <Route path="/orders" element={<MyOrders />} />
        
        {/* Only uncomment this if you have the OrderDetails.jsx file ready! */}
        {/* <Route path="/orders/:id" element={<OrderDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
