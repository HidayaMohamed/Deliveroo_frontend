import React from "react";

export default function PriceSummary({ price }) {
  const deliveryFee = 150; 
  const total = (price || 0) + deliveryFee;

  return (
    // .price-card
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
      {/* .price-title */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">Price Summary</h3>
      
      {/* .price-row */}
      <div className="flex justify-between text-slate-600 mb-2">
        <span>Subtotal</span>
        <span>KES {price || 0}</span>
      </div>
      
      <div className="flex justify-between text-slate-600 mb-2">
        <span>Delivery Fee</span>
        <span>KES {deliveryFee}</span>
      </div>
      
      {/* .price-divider */}
      <div className="border-t border-slate-200 my-4"></div>
      
      {/* .price-row .total */}
      <div className="flex justify-between text-lg text-slate-900">
        <strong className="font-bold">Total</strong>
        <strong className="font-bold text-[#00ccbc]">KES {total}</strong>
      </div>
    </div>
  );
}