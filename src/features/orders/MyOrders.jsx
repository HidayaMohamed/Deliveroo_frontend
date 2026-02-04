import { useEffect, useState } from "react";
import { getMyOrders } from "./ordersAPI";
import OrderCard from "./OrderCard"; // Fixed path
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="my-orders-page">
      <header className="orders-header">
        <h1>My Deliveries</h1>
        <p>View the status of your current parcel requests.</p>
      </header>

      {loading ? (
        <div className="loading-state">Loading your parcels...</div>
      ) : orders.length > 0 ? (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No active orders</h3>
          <p>Your delivery history will appear here once you place an order.</p>
        </div>
      )}
    </div>
  );
}