import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import {
  Package, MapPin, Navigation, CheckCircle,
  Truck, Clock, Shield, Phone, Star,
  Zap, Award, Signal, MessageCircle, TrendingUp,
  Wallet, ChevronRight, Bell, User, Loader2
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAuth } from "../features/auth/useAuth";
import { getCourierOrders, updateOrderStatus, getCourierStats } from "../api/courier";

// Fix for Leaflet icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const STATUS_FLOW = {
  ASSIGNED: { next: "PICKED_UP", label: "Pickup" },
  PICKED_UP: { next: "IN_TRANSIT", label: "Dispatch" },
  IN_TRANSIT: { next: "DELIVERED", label: "Arrival" },
};

const STATUS_DISPLAY = {
  ASSIGNED: "Assigned",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  DELIVERED: "Delivered",
};

export default function CourierDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersData, statsData] = await Promise.all([
        getCourierOrders(),
        getCourierStats(),
      ]);
      const orders = ordersData.orders || [];
      setDeliveries(orders);
      setSelectedOrder(orders[0] || null);
      setStats(statsData.summary || null);
    } catch (err) {
      console.error("Error loading courier data:", err);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(`Support, this is Rider ${user?.full_name || user?.email}. I need assistance with Order ${selectedOrder?.tracking_number || selectedOrder?.id}`);
    window.open(`https://wa.me/254700123456?text=${msg}`, "_blank");
  };

  const handleUpdateStatus = async (order) => {
    const flow = STATUS_FLOW[order.status];
    if (!flow) return;

    setUpdating(true);
    try {
      await updateOrderStatus(order.id, flow.next);
      // Update local state
      setDeliveries(prev => prev.map(o => o.id === order.id ? { ...o, status: flow.next } : o));
      if (selectedOrder?.id === order.id) {
        setSelectedOrder(prev => ({ ...prev, status: flow.next }));
      }
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const getMapCenter = () => {
    if (selectedOrder?.pickup_lat && selectedOrder?.pickup_lng) {
      return [selectedOrder.pickup_lat, selectedOrder.pickup_lng];
    }
    return [-1.286389, 36.817223]; // Nairobi default
  };

  const getPickupPos = () => {
    if (selectedOrder?.pickup_lat) return [selectedOrder.pickup_lat, selectedOrder.pickup_lng];
    return null;
  };

  const getDestPos = () => {
    if (selectedOrder?.destination_lat) return [selectedOrder.destination_lat, selectedOrder.destination_lng];
    return null;
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 size={48} className="text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const riderName = user?.full_name || user?.email || "Courier";
  const pickupPos = getPickupPos();
  const destPos = getDestPos();

  return (
    <div className="h-[calc(100vh-76px)] bg-[#F8FAFC] flex flex-col lg:flex-row text-slate-900 font-sans selection:bg-yellow-100 overflow-hidden">

      {/* LEFT SIDEBAR: THE COMMAND CENTER */}
      <div className="w-full lg:w-[480px] bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden shadow-2xl z-20">

        {/* TOP PROFILE HEADER */}
        <div className="p-10 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-5">
              <div
                onClick={() => navigate("/rider/profile")}
                className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center text-yellow-400 font-black text-3xl shadow-xl cursor-pointer hover:scale-105 transition-transform"
              >
                {riderName[0]}
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter italic">{riderName}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="px-2 py-0.5 bg-yellow-400 text-[8px] font-black uppercase rounded-md tracking-widest">Courier</span>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.phone || ""}</p>
                </div>
              </div>
            </div>
            <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-yellow-500 transition-colors">
              <Bell size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900 p-6 rounded-[30px] text-white">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Completed</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black italic tracking-tighter">{stats?.completed_deliveries ?? 0}</span>
                  <span className="text-[10px] font-bold text-yellow-400">deliveries</span>
                </div>
             </div>
             <div className="bg-yellow-400 p-6 rounded-[30px] text-black">
                <p className="text-[9px] font-black uppercase tracking-widest text-black/50 mb-1">Success Rate</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black italic tracking-tighter">{stats?.success_rate ?? "N/A"}%</span>
                  <Star size={12} fill="currentColor" />
                </div>
             </div>
          </div>
        </div>

        {/* ACTIVE MISSIONS LIST */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8">
          <div className="flex items-center justify-between">
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 italic">Live Operations</h3>
             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Tracking Active
             </div>
          </div>

          {deliveries.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-300 font-black uppercase tracking-widest text-xs">No assigned deliveries</p>
            </div>
          )}

          <AnimatePresence>
            {deliveries.map((order) => (
              <motion.div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`p-8 rounded-[40px] border-2 cursor-pointer transition-all ${
                  selectedOrder?.id === order.id ? "border-slate-900 bg-white shadow-2xl scale-[1.02]" : "border-slate-50 bg-slate-50/50 grayscale opacity-60"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{order.tracking_number || `DEL-${order.id}`}</p>
                  <span className="text-[9px] font-black uppercase px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    {STATUS_DISPLAY[order.status] || order.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Package size={20} className="text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{order.parcel_description || "Package"}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{order.weight_kg ? `${order.weight_kg}kg` : ""}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <p className="text-xs font-bold text-slate-600 tracking-tight">{order.pickup_address || "Pickup"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full border-2 border-slate-900" />
                    <p className="text-xs font-bold text-slate-900 tracking-tight">{order.destination_address || "Destination"}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-slate-100">
           <button
             onClick={openWhatsApp}
             className="w-full flex items-center justify-between p-4 bg-[#25D366]/10 text-[#25D366] rounded-3xl hover:bg-[#25D366]/20 transition-all group"
           >
              <div className="flex items-center gap-3">
                <MessageCircle size={20} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Rider Support</span>
              </div>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* RIGHT SECTION: THE MAP */}
      <div className="flex-1 flex flex-col relative">

        {/* FLOATING NAVIGATION OVERLAY */}
        {selectedOrder && (
          <div className="absolute top-10 left-10 z-[1000] flex gap-4 pointer-events-none">
             <div className="bg-white/80 backdrop-blur-md p-6 rounded-[35px] shadow-2xl border border-white pointer-events-auto flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-yellow-400">
                   <Navigation size={22} fill="currentColor"/>
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Next Objective</p>
                   <p className="text-sm font-black italic tracking-tight">Proceed to {selectedOrder.destination_address || "destination"}</p>
                </div>
             </div>
          </div>
        )}

        {/* MAP CONTAINER */}
        <div className="flex-1 z-0 bg-slate-200">
          <MapContainer center={getMapCenter()} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            {pickupPos && destPos && (
              <Polyline positions={[pickupPos, destPos]} color="#1e293b" weight={3} opacity={0.2} dashArray="10, 10" />
            )}
            {pickupPos && (
              <Marker position={pickupPos} icon={DefaultIcon}>
                <Popup>Pickup Location</Popup>
              </Marker>
            )}
            {destPos && (
              <Marker position={destPos} icon={DefaultIcon}>
                <Popup>Drop-off Location</Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        {/* BOTTOM ACTION CONTROL */}
        {selectedOrder && (
          <div className="p-10 bg-white border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-20">
              <div className="flex items-center gap-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Package</span>
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-yellow-500" />
                      <span className="text-xl font-black italic">{selectedOrder.parcel_description || `Order #${selectedOrder.id}`}</span>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-100" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Price</span>
                    <span className="font-black text-slate-900">KES {selectedOrder.total_price || "---"}</span>
                  </div>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                 {STATUS_FLOW[selectedOrder.status] ? (
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUpdateStatus(selectedOrder)}
                      disabled={updating}
                      className="flex-1 md:w-80 py-7 bg-slate-900 text-white rounded-[30px] text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl transition-all disabled:opacity-50"
                    >
                      {updating ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          Confirm {STATUS_FLOW[selectedOrder.status].label}
                          <Zap size={18} className="text-yellow-400" fill="currentColor" />
                        </>
                      )}
                    </motion.button>
                 ) : (
                    <div className="flex-1 md:w-80 py-7 bg-emerald-500 text-white rounded-[30px] text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl">
                      <CheckCircle size={20} /> Delivery Successful
                    </div>
                 )}
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
