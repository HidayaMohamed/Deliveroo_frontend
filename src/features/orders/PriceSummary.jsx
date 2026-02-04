import React from "react";
import "./PriceSummary.css"; // This links your CSS to this component

export default function PriceSummary({ price }) {
  const deliveryFee = 150; 
  const total = (price || 0) + deliveryFee;

  return (
    <div className="price-card">
      <h3 className="price-title">Price Summary</h3>
      <div className="price-row">
        <span>Subtotal</span>
        <span>KES {price || 0}</span>
      </div>
      <div className="price-row">
        <span>Delivery Fee</span>
        <span>KES {deliveryFee}</span>
      </div>
      <div className="price-divider"></div>
      <div className="price-row total">
        <strong>Total</strong>
        <strong>KES {total}</strong>
      </div>
    </div>
  );
}