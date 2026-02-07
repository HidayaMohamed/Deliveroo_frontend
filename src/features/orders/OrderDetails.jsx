import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, cancelOrder } from "./ordersAPI";
import LiveTrackingMap from "../../components/maps/LiveTrackingMap";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrderById(id)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to terminate this consignment?")) {
      await cancelOrder(id);
      navigate("/orders");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-amber-500 animate-pulse font-black tracking-widest">SYNCHRONIZING WITH SATELLITE...</div>
    </div>
  );

  if (!order) return <div className="text-white p-20">Consignment not found.</div>;

  // Status mapping for the vertical timeline
  const stages = [
    { label: "Order Placed", key: "Pending" },
    { label: "Courier Assigned", key: "Assigned" },
    { label: "In Transit", key: "In Transit" },
    { label: "Delivered", key: "Delivered" }
  ];

  const currentIdx = stages.findIndex(s => s.key === order.status);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#050505] text-white overflow-hidden">
      
      {/* LEFT SIDE: THE LIVE MAP ENGINE */}
      <div className="flex-1 relative bg-zinc-900">
        <LiveTrackingMap 
          pickup={order.pickup_location}
          destination={order.destination}
          courierPos={order.courier_location} 
        />
        {/* Floating Badge */}
        <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl">
          <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest block mb-1">Live Status</span>
          <span className="text-xl font-bold">{order.status}</span>
        </div>
      </div>

      {/* RIGHT SIDE: LUXURY TRACKING PANEL */}
      <aside className="w-[450px] border-l border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl p-8 overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">Consignment Details</h2>
          <h1 className="text-3xl font-bold tracking-tighter">#{id.slice(0, 8)}</h1>
        </header>

        {/* VERTICAL STEPPER (TIMELINE) */}
        <div className="space-y-8 mb-12">
          {stages.map((stage, idx) => (
            <div key={idx} className="flex gap-6 items-start relative">
              {/* Connector Line */}
              {idx !== stages.length - 1 && (
                <div className={`absolute left-[11px] top-6 w-[2px] h-full ${idx < currentIdx ? 'bg-amber-500' : 'bg-zinc-800'}`} />
              )}
              
              {/* Node */}
              <div className={`w-6 h-6 rounded-full border-4 z-10 transition-all duration-700 ${
                idx <= currentIdx ? 'bg-amber-500 border-amber-900 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-zinc-900 border-zinc-800'
              }`} />
              
              <div className="flex flex-col">
                <span className={`font-bold tracking-tight ${idx <= currentIdx ? 'text-white' : 'text-zinc-600'}`}>
                  {stage.label}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase">{idx < currentIdx ? "Completed" : idx === currentIdx ? "In Progress" : "Upcoming"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* PARCEL SPECS */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-6">
          <div>
            <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest block mb-2">Collection Point</label>
            <p className="text-sm font-medium">{order.pickup_location}</p>
          </div>
          <div className="pt-6 border-t border-white/5">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Final Destination</label>
            <p className="text-sm font-medium">{order.destination}</p>
          </div>
        </div>

        {/* ACTION AREA */}
        <div className="mt-12">
          {order.status === "Pending" ? (
            <button 
              onClick={handleCancel}
              className="w-full py-4 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              Terminate Request
            </button>
          ) : (
            <p className="text-center text-zinc-500 text-[10px] uppercase font-bold tracking-widest italic">
              Order is locked for transit
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}