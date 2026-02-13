import { useState, useEffect } from "react";
import { getToken } from "../../utils/token";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Status mapping from backend to frontend
const statusMapping = {
  PENDING: "Pending",
  ASSIGNED: "In Transit",
  PICKED_UP: "In Transit",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Completed",
  CANCELLED: "Cancelled",
};

const AllOrders = ({ onAssignCourier }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/admin/orders?limit=100`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const transformedOrders = (data.orders || []).map((order) => ({
          id: order.tracking_number || order.id,
          customer: order.customer?.full_name || "Customer",
          pickup: order.pickup_address || "Pickup Location",
          destination: order.destination_address || "Delivery Location",
          weight: order.weight_category || "MEDIUM",
          price: order.total_price || 0,
          status: statusMapping[order.status] || order.status || "Pending",
          time: order.created_at
            ? new Date(order.created_at).toLocaleString()
            : "N/A",
          courier: order.courier?.full_name || null,
          courier_id: order.courier_id,
          orderId: order.id,
          pickup_lat: order.pickup_lat,
          pickup_lng: order.pickup_lng,
          destination_lat: order.destination_lat,
          destination_lng: order.destination_lng,
        }));
        setOrders(transformedOrders);
      } else {
        throw new Error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Keep empty array - don't show demo data
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-500",
      "In Transit": "bg-blue-500",
      Completed: "bg-green-500",
      Cancelled: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const getWeightBadgeColor = (weight) => {
    const colors = {
      SMALL: "bg-green-100 text-green-700",
      MEDIUM: "bg-yellow-100 text-yellow-700",
      LARGE: "bg-orange-100 text-orange-700",
      XLARGE: "bg-red-100 text-red-700",
    };
    return colors[weight] || "bg-gray-100 text-gray-700";
  };

  const getFilterStatus = () => {
    switch (filter) {
      case "pending":
        return "PENDING";
      case "active":
        return ["ASSIGNED", "PICKED_UP", "IN_TRANSIT"];
      case "completed":
        return "DELIVERED";
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const filterStatus = getFilterStatus();
    const matchesFilter =
      !filterStatus ||
      (Array.isArray(filterStatus)
        ? filterStatus.includes(order.status?.toUpperCase())
        : order.status?.toUpperCase() === filterStatus);
    const matchesSearch =
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex gap-3 flex-wrap">
          {["all", "pending", "active", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-[20px] font-black uppercase text-[9px] tracking-[0.2em] transition-all
                ${
                  filter === status
                    ? "bg-yellow-500 text-black shadow-lg scale-105"
                    : "bg-white text-gray-400 hover:bg-gray-50"
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 px-6 py-3 bg-white rounded-[20px] border border-gray-100 outline-none font-bold text-sm focus:ring-4 focus:ring-yellow-100 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Orders Count */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Showing {filteredOrders.length} {filter !== "all" ? filter : ""}{" "}
          orders
        </span>
        <div className="h-[2px] w-12 bg-yellow-500"></div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Order ID
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Customer
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Route
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Weight
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Price
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Status
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Courier
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="group hover:bg-gray-50 transition-all"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusColor(order.status)} ${order.status === "Pending" ? "animate-pulse" : ""}`}
                      ></div>
                      <span className="font-black text-sm">{order.id}</span>
                    </div>
                    <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest mt-1">
                      {order.time}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        👤
                      </div>
                      <div>
                        <p className="font-bold text-sm">{order.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold flex items-center gap-2">
                        <span className="text-green-500">📍</span>
                        {order.pickup}
                      </p>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-xs">↓</span>
                      </div>
                      <p className="text-sm font-bold flex items-center gap-2">
                        <span className="text-red-500">📍</span>
                        {order.destination}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={`px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-[0.2em] ${getWeightBadgeColor(order.weight)}`}
                    >
                      {order.weight}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-xl italic text-yellow-600">
                      KES {order.price?.toLocaleString() || 0}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}
                      ></div>
                      <span className="font-bold text-sm">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {order.courier ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">
                          ✓
                        </div>
                        <span className="text-sm font-bold">
                          {order.courier}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {!order.courier && order.status === "Pending" && (
                      <button
                        onClick={() => onAssignCourier(order)}
                        className="px-6 py-3 bg-yellow-500 text-black rounded-[15px] font-black text-[9px] uppercase tracking-[0.2em] hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-lg transition-all active:scale-95"
                      >
                        Assign
                      </button>
                    )}
                    {order.courier && (
                      <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-[15px] font-black text-[9px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-all">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl font-black text-gray-400 mb-2">
              No Orders Found
            </p>
            <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
