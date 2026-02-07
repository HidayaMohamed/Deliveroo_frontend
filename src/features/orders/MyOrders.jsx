import { useEffect, useState } from "react";
import { getMyOrders } from "./ordersAPI";
import OrderCard from "./OrderCard";

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
    // .my-orders-page
    <div className="p-8 max-w-[900px] mx-auto min-h-screen">
      
      {/* .orders-header */}
      <header className="mb-8">
        <h1 className="text-[#00ccbc] text-3xl font-bold mb-2">My Deliveries</h1>
        <p className="text-slate-600">View the status of your current parcel requests.</p>
      </header>

      {loading ? (
        // .loading-state
        <div className="text-center p-12 text-slate-500 bg-slate-50 rounded-xl mt-8 border border-dashed border-slate-200">
          <div className="animate-pulse">Loading your parcels...</div>
        </div>
      ) : orders.length > 0 ? (
        // .orders-grid
        <div className="grid gap-6 mt-8">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        // .empty-state
        <div className="text-center p-12 text-slate-500 bg-slate-50 rounded-xl mt-8 border border-slate-100">
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No active orders</h3>
          <p>Your delivery history will appear here once you place an order.</p>
        </div>
      )}
    </div>
  );
}