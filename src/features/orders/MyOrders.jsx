import { useEffect, useState } from "react";
import { getMyOrders } from "./ordersAPI";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then((res) => {
        setOrders(res.data.orders || res.data || []);
      })
      .catch(() => {
        console.warn("Backend offline: Showing Demo Fleet");
        // Demo data
        setOrders([
          {
            id: "8842",
            tracking_number: "DLV8842",
            pickup_address: "Westlands, Nairobi",
            destination_address: "Kilimani, Nairobi",
            total_price: 450,
            status: "IN_TRANSIT",
            created_at: new Date().toISOString(),
          },
          {
            id: "9021",
            tracking_number: "DLV9021",
            pickup_address: "CBD, City Hall",
            destination_address: "Karen, Nairobi",
            total_price: 1200,
            status: "PENDING",
            created_at: new Date().toISOString(),
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PICKED_UP":
        return "bg-blue-100 text-blue-800";
      case "IN_TRANSIT":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black uppercase tracking-[0.5em] text-sm text-gray-400">
          Loading Fleet...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-grayDark mb-2">
          My Orders
        </h1>
        <p className="text-gray-500">Track and manage your deliveries</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You don't have any orders yet</p>
          <Link
            to="/orders/new"
            className="text-brand-orange font-semibold hover:underline"
          >
            Create your first order
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">
                      #{order.tracking_number || order.id}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="font-semibold text-brand-grayDark">
                    {order.pickup_address || order.pickup_location} →{" "}
                    {order.destination_address || order.destination}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-brand-orange">
                    KES {order.total_price || order.price}
                  </span>
                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                  >
                    Track
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
