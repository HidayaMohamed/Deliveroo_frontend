import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getOrderById } from "./ordersAPI";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch real data from backend
    getOrderById(id).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <div className="h-screen flex items-center justify-center font-black animate-pulse">SATELLITE SYNC...</div>;

  const steps = ["Order Placed", "Rider Assigned", "In Transit", "Arrived"];
  const currentStep = order.status === "Delivered" ? 4 : 2; // Logic based on backend status

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-white">
      
      {/* LEFT: LIVE MAP ENGINE */}
      <div className="flex-1 relative bg-gray-100">
        <MapContainer center={[-1.286389, 36.817223]} zoom={13} className="h-full w-full grayscale-[0.5] contrast-[1.2]">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {/* We would plot coordinates from order.pickup_coords and order.rider_coords here */}
        </MapContainer>

        {/* FLOATING RIDER CARD */}
        <div className="absolute bottom-10 left-10 z-[1000] bg-white p-6 rounded-[40px] shadow-2xl border border-gray-100 flex items-center gap-6 min-w-[350px]">
          <div className="w-16 h-16 bg-yellow-500 rounded-full overflow-hidden border-4 border-white">
            <img src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg" alt="Rider" className="object-cover h-full" />
          </div>
          <div>
            <h4 className="font-black text-xl tracking-tighter">David Maina</h4>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Yamaha FZ • KDM 442X</p>
            <div className="mt-2 flex gap-2">
                <span className="bg-green-100 text-green-600 text-[8px] font-black px-3 py-1 rounded-full uppercase italic">On Time</span>
            </div>
          </div>
          <button className="ml-auto w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </button>
        </div>
      </div>

      {/* RIGHT: TRACKING LOGS */}
      <aside className="w-full lg:w-[450px] p-12 overflow-y-auto border-l border-gray-100">
        <div className="mb-12">
            <span className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.4em]">Tracking ID: #DEL-{order.id}</span>
            <h2 className="text-4xl font-black tracking-tighter mt-2 italic">In Transit.</h2>
        </div>

        {/* VERTICAL STEPPER */}
        <div className="space-y-12 relative">
          {steps.map((step, idx) => (
            <div key={step} className="flex gap-8 relative">
              {idx < steps.length - 1 && (
                <div className={`absolute left-3 top-8 w-[2px] h-12 ${idx < currentStep ? 'bg-yellow-500' : 'bg-gray-100'}`} />
              )}
              <div className={`w-6 h-6 rounded-full border-4 z-10 ${idx <= currentStep ? 'bg-black border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-white border-gray-100'}`} />
              <div>
                <p className={`text-[11px] font-black uppercase tracking-widest ${idx <= currentStep ? 'text-black' : 'text-gray-200'}`}>{step}</p>
                {idx === currentStep && <p className="text-[10px] text-gray-400 font-bold mt-1">Updated 2 mins ago</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-gray-50 rounded-[40px] border border-gray-100">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Route Info</h5>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500">From</span>
                    <span className="text-xs font-black uppercase">{order.pickup_location}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500">To</span>
                    <span className="text-xs font-black uppercase">{order.destination}</span>
                </div>
            </div>
        </div>
      </aside>
    </div>
  );
}