import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import api from "../../services/api";

export default function OrdersList({ role = "customer", onAssign }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, [role, filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "/api/orders";
      if (role === "admin") {
        endpoint = "/api/admin/orders";
      } else if (role === "courier") {
        endpoint = "/api/courier/orders";
      }

      // Add status filter if not 'all'
      if (filter !== "all") {
        endpoint += `?status=${filter}`;
      }

      const response = await api.get(endpoint);
      const data = response.data;

      if (role === "admin") {
        setOrders(data.orders || []);
      } else if (role === "courier") {
        setOrders(data.orders || []);
      } else {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
      // Use demo data
      setOrders([
        {
          id: "8842",
          tracking_number: "DLV8842",
          pickup_address: "Westlands, Nairobi",
          destination_address: "Kilimani, Nairobi",
          total_price: 450,
          distance_km: 5.2,
          weight_kg: 2.5,
          status: "IN_TRANSIT",
          created_at: new Date().toISOString(),
          courier: {
            full_name: "David Maina",
            phone: "+254712345678",
            vehicle_type: "Motorcycle",
            plate_number: "KDM 442X",
          },
        },
        {
          id: "9021",
          tracking_number: "DLV9021",
          pickup_address: "CBD, Nairobi",
          destination_address: "Karen, Nairobi",
          total_price: 1200,
          distance_km: 15.0,
          weight_kg: 10.0,
          status: "PENDING",
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const statusFilters = [
    { value: "all", label: "All Orders" },
    { value: "PENDING", label: "Pending" },
    { value: "ASSIGNED", label: "Assigned" },
    { value: "PICKED_UP", label: "Picked Up" },
    { value: "IN_TRANSIT", label: "In Transit" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((filterOption) => (
          <button
            key={filterOption.value}
            onClick={() => setFilter(filterOption.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === filterOption.value
                ? "bg-brand-orange text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <p className="text-gray-500 mb-4">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              showCourier={role === "customer"}
              showAssign={role === "admin"}
              onAssign={onAssign}
            />
          ))}
        </div>
      )}
    </div>
  );
}
