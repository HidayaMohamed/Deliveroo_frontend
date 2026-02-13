import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Truck,
  Users,
  TrendingUp,
  Clock,
  X,
  Shield,
  Activity,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";
import { getToken, removeToken } from "../utils/token";
import { get } from "../api/fetchWrapper";

import AllOrders from "../features/admin/AllOrders";
import AssignCourier from "../features/admin/AssignCourier";
import Dashboard from "../features/admin/Dashboard";
import AllUsers from "../features/admin/AllUsers";

const NAV_TABS = [
  { id: "overview",  icon: <Activity size={16} />,   label: "Overview"  },
  { id: "orders",    icon: <Package size={16} />,    label: "Orders"    },
  { id: "users",     icon: <Users size={16} />,      label: "Users"     },
  { id: "analytics", icon: <TrendingUp size={16} />, label: "Analytics" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("overview");
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeDeliveries: 0,
    totalCouriers: 0,
    activeCouriers: 0,
    revenue: 0,
    avgDeliveryTime: 0,
    completedOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    fetchAdminData();
    fetchDashboardStats();
    const interval = setInterval(fetchDashboardStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchAdminData = async () => {
    try {
      const token = getToken();
      if (!token) {
        setAdminUser({ full_name: "Admin" });
        setLoading(false);
        return;
      }
      const data = await get("/auth/me");
      setAdminUser(data || { full_name: "Admin" });
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const data = await get("/admin/stats");
      if (!data) return;
      setStats({
        totalOrders:      data.summary?.total_orders || 0,
        activeDeliveries: (data.orders_by_status?.assigned   || 0) +
                          (data.orders_by_status?.in_transit || 0) +
                          (data.orders_by_status?.picked_up  || 0),
        totalCouriers:    data.summary?.active_couriers || 0,
        activeCouriers:   data.summary?.active_couriers || 0,
        revenue:          data.summary?.total_revenue   || 0,
        avgDeliveryTime:  data.summary?.average_delivery_time_minutes || 0,
        completedOrders:  data.orders_by_status?.delivered || 0,
        pendingOrders:    data.orders_by_status?.pending    || 0,
        cancelledOrders:  data.orders_by_status?.cancelled  || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const handleAssignCourier = (order) => {
    setSelectedOrder(order);
    setShowAssignModal(true);
  };

  const handleAssignComplete = () => {
    setShowAssignModal(false);
    setSelectedOrder(null);
    fetchDashboardStats();
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 flex flex-col lg:flex-row text-slate-900 font-sans selection:bg-yellow-100 overflow-hidden">

      {/* ── LEFT SIDEBAR ── */}
      <div className="w-full lg:w-[480px] bg-white border-r border-slate-200 flex flex-col overflow-hidden shadow-2xl z-20">

        {/* Profile header */}
        <div className="p-10 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center text-yellow-400 font-black text-3xl shadow-xl">
                {adminUser?.full_name?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter">
                  {adminUser?.full_name || "Admin"}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-yellow-400 text-[8px] font-black uppercase rounded-md tracking-widest">
                    Admin
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Control Center
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-2xl">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <Shield size={14} />
              </div>
              <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-yellow-500 transition-colors">
                <Bell size={20} />
              </button>
            </div>
          </div>

          {/* Top stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-6 rounded-[30px] text-white">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">
                Total Orders
              </p>
              <span className="text-2xl font-black tracking-tighter">
                {stats.totalOrders}
              </span>
            </div>
            <div className="bg-yellow-400 p-6 rounded-[30px] text-black">
              <p className="text-[9px] font-black uppercase tracking-widest text-black/50 mb-1">
                Revenue
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] font-bold">KES</span>
                <span className="text-2xl font-black tracking-tighter">
                  {stats.revenue?.toLocaleString() || "0"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav + live stats */}
        <div className="flex-1 overflow-y-auto p-10 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-6">
            Navigation
          </h3>

          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`w-full flex items-center justify-between p-5 rounded-[24px] border-2 transition-all ${
                view === tab.id
                  ? "border-slate-900 bg-white shadow-lg"
                  : "border-slate-50 bg-slate-50/50 text-slate-400 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    view === tab.id
                      ? "bg-slate-900 text-yellow-400"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {tab.icon}
                </div>
                <span className="text-sm font-black uppercase tracking-widest">
                  {tab.label}
                </span>
              </div>
              <ChevronRight
                size={16}
                className={`transition-transform ${
                  view === tab.id ? "translate-x-1 text-slate-900" : "text-slate-300"
                }`}
              />
            </button>
          ))}

          <div className="pt-6 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 pb-2">
              Live Stats
            </h3>
            <StatRow icon={<Truck size={16} />}   label="In Transit"      value={stats.activeDeliveries} />
            <StatRow icon={<Users size={16} />}   label="Active Couriers" value={stats.activeCouriers}  />
            <StatRow icon={<Clock size={16} />}   label="Avg Delivery"    value={`${stats.avgDeliveryTime}m`} />
            <StatRow icon={<Package size={16} />} label="Pending"         value={stats.pendingOrders}   />
          </div>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 bg-red-50 text-red-500 rounded-3xl hover:bg-red-100 transition-all group"
          >
            <div className="flex items-center gap-3">
              <LogOut size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Logout
              </span>
            </div>
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* ── RIGHT CONTENT AREA ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div className="bg-white border-b border-slate-100 px-10 py-6 flex items-center justify-between shadow-sm z-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
              Viewing
            </p>
            <h3 className="text-xl font-black tracking-tight capitalize">
              {NAV_TABS.find((t) => t.id === view)?.label}
            </h3>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Live
          </div>
        </div>

        {/* Content panel */}
        <div className="flex-1 overflow-y-auto p-10">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 min-h-full"
          >
            {view === "overview"  && <Dashboard stats={stats} />}
            {view === "orders"    && <AllOrders onAssignCourier={handleAssignCourier} />}
            {view === "users"     && <AllUsers />}
            {view === "analytics" && <Dashboard stats={stats} showDetailedAnalytics={true} />}
          </motion.div>
        </div>
      </div>

      {/* ── ASSIGN MODAL ── */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAssignModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white rounded-[40px] p-10 lg:p-16 max-w-3xl w-full shadow-2xl relative z-10 border border-slate-100"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1">
                    Assignment
                  </p>
                  <h3 className="text-3xl font-black tracking-tight">
                    Assign Courier
                  </h3>
                </div>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex items-center gap-3 bg-slate-100 px-5 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 hover:text-white transition-all"
                >
                  Close <X size={14} />
                </button>
              </div>
              <AssignCourier
                order={selectedOrder}
                onClose={() => setShowAssignModal(false)}
                onAssignComplete={handleAssignComplete}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Sidebar stat row */
const StatRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[20px]">
    <div className="flex items-center gap-3 text-slate-500">
      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <span className="text-sm font-black text-slate-900">{value}</span>
  </div>
);

export default AdminDashboard;