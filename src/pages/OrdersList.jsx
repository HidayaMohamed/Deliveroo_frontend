import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderAPI } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const OrdersList = () => {
  const { isCourier } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      const params = {};
      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await orderAPI.getAll(params);
      setOrders(response.data.orders);
    } catch (error) {
      const message = error.response?.data?.error || "Failed to fetch orders";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      assigned: "bg-blue-100 text-blue-800",
      picked_up: "bg-purple-100 text-purple-800",
      in_transit: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-gray-500 font-medium">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">
            {isCourier ? "My Deliveries" : "My Orders"}
          </h1>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm font-bold"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="picked_up">Picked Up</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 p-12 text-center">
            <p className="text-gray-500 text-lg font-medium mb-4">
              {isCourier ? "No deliveries assigned yet" : "No orders yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 p-6 hover:-translate-y-2 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-all duration-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-black uppercase tracking-tight">
                      #{order.id} - {order.parcel_name}
                    </h3>
                    <p className="text-gray-500 mt-2 font-medium">
                      {order.weight}kg • {order.weight_category}
                    </p>
                    <p className="text-gray-500 mt-1 font-medium">
                      {order.pickup_address}
                    </p>
                    <p className="text-gray-500 font-medium">
                      {order.destination_address}
                    </p>
                    {order.distance && (
                      <p className="text-gray-400 text-sm mt-1 font-medium">
                        {order.distance?.toFixed(2)} km
                      </p>
                    )}
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    {order.payment_status === "completed" &&
                      order.status === "pending" && (
                        <span className="inline-block px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-green-100 text-green-700">
                          Paid
                        </span>
                      )}
                    <span
                      className={`inline-block px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(order.status)}`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                    <p className="text-2xl font-black text-yellow-400 mt-2">
                      KES {order.price}
                    </p>
                    {order.courier && !isCourier && (
                      <p className="text-sm text-gray-500 mt-2 font-medium">
                        Courier: {order.courier.full_name}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
