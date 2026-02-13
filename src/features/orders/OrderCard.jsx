import React from "react";
import LiveTrackingMap from "../../components/maps/LiveTrackingMap";

export default function OrderCard({ order }) {
  const status = order.status || "Pending";
  const pickup = order.pickup_location || "Not specified";
  const destination = order.destination || "Not specified";

  const pickupPoint =
    order.pickup_lat != null && order.pickup_lng != null
      ? [Number(order.pickup_lat), Number(order.pickup_lng)]
      : undefined;

  const destinationPoint =
    order.destination_lat != null && order.destination_lng != null
      ? [Number(order.destination_lat), Number(order.destination_lng)]
      : undefined;

  // Tailwind mapping for status colors
  const statusStyles = {
    "Pending": "bg-amber-100 text-amber-600",
    "In Transit": "bg-sky-100 text-sky-600",
    "Delivered": "bg-green-100 text-green-600",
  };

  // Default to Pending style if status isn't matched
  const currentStatusStyle = statusStyles[status] || statusStyles["Pending"];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      
      {/* .card-top */}
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold text-slate-500 text-sm">
          Order #{order.id?.toString().slice(0, 8)}
        </span>
        <span className={`text-[0.75rem] font-bold px-3 py-1 rounded-full uppercase ${currentStatusStyle}`}>
          {status}
        </span>
      </div>
      
      {/* .card-map-wrapper */}
      <div className="w-full h-[180px] rounded-xl overflow-hidden mb-6 border border-slate-100 relative z-10">
        <LiveTrackingMap
          orderId={order.id}
          pickup={pickupPoint}
          destination={destinationPoint}
        />
      </div>

      {/* .card-middle */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full shrink-0 bg-[#00ccbc]"></span>
          <p className="m-0 text-slate-800 text-sm">
            <strong className="font-semibold">From:</strong> {pickup}
          </p>
        </div>
        
        {/* .location-connector */}
        <div className="w-[2px] h-[15px] bg-slate-200 ml-[3px] my-[2px]"></div>
        
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full shrink-0 bg-red-500"></span>
          <p className="m-0 text-slate-800 text-sm">
            <strong className="font-semibold">To:</strong> {destination}
          </p>
        </div>
      </div>
      
      {/* .card-bottom */}
      <div className="flex justify-between items-center border-t border-slate-100 pt-4">
        <span className="text-[0.85rem] text-slate-500 font-medium">
           {order.weight_category}
        </span>
        <button className="bg-transparent border border-[#00ccbc] text-[#00ccbc] px-4 py-2 rounded-lg cursor-pointer font-semibold transition-all duration-200 hover:bg-[#00ccbc] hover:text-white">
          View Full Logistics
        </button>
      </div>
    </div>
  );
}