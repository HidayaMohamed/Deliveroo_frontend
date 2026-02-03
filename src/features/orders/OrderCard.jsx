import React from "react";
import "./OrderCard.css";

export default function OrderCard({ order }) {
  // Logic to handle missing data gracefully
  const status = order.status || "Pending";
  const pickup = order.pickup_location || "Not specified";
  const destination = order.destination || "Not specified";

  return (
    <div className="order-card">
      <div className="card-top">
        <span className="order-number">Order #{order.id?.slice(0, 8)}</span>
        <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>
      </div>
      
      <div className="card-middle">
        <div className="location-row">
          <span className="dot pickup"></span>
          <p>{pickup}</p>
        </div>
        <div className="location-connector"></div>
        <div className="location-row">
          <span className="dot destination"></span>
          <p>{destination}</p>
        </div>
      </div>
      
      <div className="card-bottom">
        <span className="parcel-weight">📦 {order.weight_category}</span>
        <button className="details-btn">View Tracking</button>
      </div>
    </div>
  );
}