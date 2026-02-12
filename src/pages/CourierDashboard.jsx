import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { 
  Package, MapPin, Navigation, CheckCircle, 
  Truck, Clock, Shield, Phone, Star, 
  Zap, Award, Signal, MessageCircle, TrendingUp, 
  Wallet, ChevronRight, Bell, User
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet icons - Ensures markers show up in Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({ 
  iconUrl: markerIcon, 
  shadowUrl: markerShadow, 
  iconSize: [25, 41], 
  iconAnchor: [12, 41] 
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function CourierDashboard() {
  const navigate = useNavigate();
  const [riderData] = useState({
    name: "Derrick 'Flash' Omondi",
    id: "RID-8821",
    rating: 4.9,
    tripsMonth: 142,
    todayEarnings: "4,250",
    phone: "+254 712 345 678",
  });

  const [deliveries, setDeliveries] = useState([
    {
      id: "DX-992",
      customer: "Millicent Wanjiku", // Name changed here
      pickup: [-1.286389, 36.817223],
      destination: [-1.2647, 36.8021],
      pickupAddr: "City Hall Way, CBD",
      destAddr: "Waiyaki Way, Westlands",
      status: "Assigned",
      weight: "Medium (5-10kg)",
      customerPhone: "+254 700 123 456"
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(deliveries[0]);

  const openWhatsApp = () => {
    const msg = encodeURIComponent(`Support, this is Rider ${riderData.id}. I need assistance with Order ${selectedOrder.id}`);
    window.open(`https://wa.me/254700123456?text=${msg}`, "_blank");
  };

  const updateStatus = (id, currentStatus) => {
    const statusMap = { "Assigned": "Picked Up", "Picked Up": "In Transit", "In Transit": "Delivered" };
    const nextStatus = statusMap[currentStatus];
    
    if (!nextStatus) return;

    setDeliveries(prev => prev.map(order => order.id === id ? { ...order, status: nextStatus } : order));
    if(selectedOrder.id === id) setSelectedOrder(prev => ({...prev, status: nextStatus}));
  };

  return (
    /* h-[calc(100vh-76px)] accounts for the RiderNavbar height */
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
                {riderData.name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tighter italic">{riderData.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="px-2 py-0.5 bg-yellow-400 text-[8px] font-black uppercase rounded-md tracking-widest">Elite</span>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{riderData.id}</p>
                </div>
              </div>
            </div>
            <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-yellow-500 transition-colors">
              <Bell size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-slate-900 p-6 rounded-[30px] text-white">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Today's Revenue</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-bold text-yellow-400">KES</span>
                  <span className="text-2xl font-black italic tracking-tighter">{riderData.todayEarnings}</span>
                </div>
             </div>
             <div className="bg-yellow-400 p-6 rounded-[30px] text-black">
                <p className="text-[9px] font-black uppercase tracking-widest text-black/50 mb-1">Trip Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black italic tracking-tighter">{riderData.rating}</span>
                  <div className="flex gap-0.5 text-black">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
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
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket #{order.id}</p>
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Package size={20} className="text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg">{order.customer}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{order.weight}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <p className="text-xs font-bold text-slate-600 tracking-tight">{order.pickupAddr}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full border-2 border-slate-900" />
                    <p className="text-xs font-bold text-slate-900 tracking-tight">{order.destAddr}</p>
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
        <div className="absolute top-10 left-10 z-[1000] flex gap-4 pointer-events-none">
           <div className="bg-white/80 backdrop-blur-md p-6 rounded-[35px] shadow-2xl border border-white pointer-events-auto flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-yellow-400">
                 <Navigation size={22} fill="currentColor"/>
              </div>
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Next Objective</p>
                 <p className="text-sm font-black italic tracking-tight">Proceed to {selectedOrder.destAddr}</p>
              </div>
           </div>
        </div>

        {/* MAP CONTAINER */}
        <div className="flex-1 z-0 bg-slate-200">
          <MapContainer center={selectedOrder.pickup} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
            <Polyline positions={[selectedOrder.pickup, selectedOrder.destination]} color="#1e293b" weight={3} opacity={0.2} dashArray="10, 10" />
            <Marker position={selectedOrder.pickup} icon={DefaultIcon}>
                <Popup>Pickup Location</Popup>
            </Marker>
            <Marker position={selectedOrder.destination} icon={DefaultIcon}>
                <Popup>Drop-off Location</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* BOTTOM ACTION CONTROL */}
        <div className="p-10 bg-white border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-20">
            <div className="flex items-center gap-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Recipient</span>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-yellow-500" />
                    <span className="text-xl font-black italic">{selectedOrder.customer}</span>
                  </div>
                </div>
                <div className="w-[1px] h-10 bg-slate-100" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Direct Line</span>
                  <button className="flex items-center gap-2 font-black text-slate-900 hover:text-yellow-600 transition-colors">
                    <Phone size={14} /> {selectedOrder.customerPhone}
                  </button>
                </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
               {selectedOrder.status !== "Delivered" ? (
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "#000" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateStatus(selectedOrder.id, selectedOrder.status)}
                    className="flex-1 md:w-80 py-7 bg-slate-900 text-white rounded-[30px] text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-2xl transition-all"
                  >
                    Confirm {selectedOrder.status === "Assigned" ? "Pickup" : selectedOrder.status === "Picked Up" ? "Dispatch" : "Arrival"}
                    <Zap size={18} className="text-yellow-400" fill="currentColor" />
                  </motion.button>
               ) : (
                  <div className="flex-1 md:w-80 py-7 bg-emerald-500 text-white rounded-[30px] text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl">
                    <CheckCircle size={20} /> Delivery Successful
                  </div>
               )}
            </div>
        </div>
      </div>
    </div>
  );
}
