import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../services/api";
import toast from "react-hot-toast";
import OrderMap from "../components/OrderMap";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignForm, setAssignForm] = useState({ orderId: "", courierId: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dashboardRes, couriersRes] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getCouriers(),
      ]);
      setStats(dashboardRes.data.stats);
      setRecentOrders(dashboardRes.data.recent_orders);
      setCouriers(couriersRes.data.couriers);
    } catch (error) {
      const message = error.response?.data?.error || "Failed to fetch data";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignCourier = async (e) => {
    e.preventDefault();

    try {
      await adminAPI.assignCourier(assignForm.orderId, assignForm.courierId);
      toast.success("Courier assigned successfully");
      setShowAssignModal(false);
      setAssignForm({ orderId: "", courierId: "" });
      fetchData();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to assign courier";
      toast.error(message);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await adminAPI.updateOrderStatus(orderId, status);
      toast.success("Status updated successfully");
      fetchData();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to update status";
      toast.error(message);
    }
  };

  const handleToggleUserActive = async (userId) => {
    try {
      await adminAPI.toggleUserActive(userId);
      toast.success("User status toggled");
      fetchData();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to toggle user";
      toast.error(message);
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
            <p className="text-gray-500 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-black tracking-tighter uppercase">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-6 border border-gray-100 hover:-translate-y-2 transition-all duration-500">
            <p className="text-4xl font-black text-black tracking-tighter">
              {stats.total_users}
            </p>
            <p className="text-gray-500 text-sm font-medium mt-2">
              Total Users
            </p>
            <p className="text-xs text-gray-400 mt-1 font-medium">
              {stats.total_customers} customers, {stats.total_couriers} couriers
            </p>
          </div>
          <div className="bg-white rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-6 border border-gray-100 hover:-translate-y-2 transition-all duration-500">
            <p className="text-4xl font-black text-black tracking-tighter">
              {stats.total_orders}
            </p>
            <p className="text-gray-500 text-sm font-medium mt-2">
              Total Orders
            </p>
          </div>
          <div className="bg-white rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-6 border border-gray-100 hover:-translate-y-2 transition-all duration-500">
            <p className="text-4xl font-black text-black tracking-tighter">
              {stats.delivered_orders}
            </p>
            <p className="text-gray-500 text-sm font-medium mt-2">Delivered</p>
          </div>
          <div className="bg-white rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-6 border border-gray-100 hover:-translate-y-2 transition-all duration-500">
            <p className="text-4xl font-black text-yellow-400 tracking-tighter">
              KES {stats.total_revenue}
            </p>
            <p className="text-gray-500 text-sm font-medium mt-2">Revenue</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-black text-black uppercase tracking-tight">
              Recent Orders
            </h2>
            <Link
              to="/admin/orders"
              className="text-xs font-black uppercase tracking-widest text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              View All
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="p-8 text-center text-gray-500 font-medium">
              No orders yet
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 hover:bg-gray-50 transition-all duration-300"
                >
                  <div className="flex gap-4">
                    {/* Image Thumbnail */}
                    <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                      {order.parcel_image_url ? (
                        <img
                          src={order.parcel_image_url}
                          alt="Parcel"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs text-center p-1">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-black text-black truncate uppercase text-sm tracking-tight">
                            #{order.id} - {order.parcel_name}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1 font-medium">
                            <span>{order.customer_name || "Unknown"}</span>
                            <span>•</span>
                            <span>KES {order.price}</span>
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-xs border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full font-bold hover:bg-black hover:text-white hover:border-black transition-all"
                        >
                          Details
                        </Link>
                        {order.status === "pending" && (
                          <button
                            onClick={() => {
                              setAssignForm({
                                ...assignForm,
                                orderId: order.id,
                              });
                              setShowAssignModal(true);
                            }}
                            className="text-xs border border-yellow-200 text-yellow-600 px-3 py-1.5 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition-all"
                          >
                            Assign Courier
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleUpdateStatus(order.id, "cancelled")
                          }
                          className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-full font-bold hover:bg-red-50 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Order Map (Sidebar) */}
        <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-black text-black uppercase tracking-tight">
              {selectedOrder
                ? `Order #${selectedOrder.id} Map`
                : "Select Order"}
            </h2>
          </div>
          <div className="p-6">
            {selectedOrder ? (
              <div className="space-y-4">
                <div className="aspect-video bg-gray-50 rounded-2xl overflow-hidden">
                  <OrderMap order={selectedOrder} />
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full text-center text-sm text-gray-500 hover:text-black font-bold mt-2 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-gray-400 text-sm bg-gray-50 rounded-2xl font-medium">
                Select an order to view map
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-sm font-black text-black uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/admin/users"
                className="block w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 hover:text-black rounded-xl font-medium transition-all"
              >
                Manage Users
              </Link>
              <Link
                to="/admin/reports"
                className="block w-full text-left px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 hover:text-black rounded-xl font-medium transition-all"
              >
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Courier Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-6">
              Assign Courier
            </h2>

            <form onSubmit={handleAssignCourier}>
              <div className="mb-6">
                <p className="text-gray-500 font-medium mb-2">
                  Order ID:{" "}
                  <span className="text-black font-black">
                    #{assignForm.orderId}
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                  Select Courier
                </label>
                <select
                  value={assignForm.courierId}
                  onChange={(e) =>
                    setAssignForm({
                      ...assignForm,
                      courierId: e.target.value,
                    })
                  }
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 outline-none transition-all text-sm font-bold"
                  required
                >
                  <option value="">Select courier...</option>
                  {couriers
                    .filter((c) => c.is_active)
                    .map((courier) => (
                      <option key={courier.id} value={courier.id}>
                        {courier.full_name} ({courier.vehicle_type})
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-400 text-black py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
                >
                  Assign
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAssignModal(false);
                    setAssignForm({ orderId: "", courierId: "" });
                  }}
                  className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
