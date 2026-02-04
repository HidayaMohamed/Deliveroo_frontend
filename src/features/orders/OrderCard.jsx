import React from "react";
import LiveTrackingMap from "../../components/maps/LiveTrackingMap"; // Ensure this file exists!
import "./OrderCard.css";

export default function OrderCard({ order }) {
  // Logic to handle missing data gracefully
  const status = order.status || "Pending";
  const pickup = order.pickup_location || "Not specified";
  const destination = order.destination || "Not specified";

  return (
    <div className="order-card luxury-theme">
      <div className="card-top">
        <span className="order-number">Order #{order.id?.toString().slice(0, 8)}</span>
        <span className={`status-pill ${status.toLowerCase().replace(/\s+/g, '-')}`}>
          {status}
        </span>
      </div>
      
      {/* MAP INTEGRATION: Only show map if status is 'In Transit' or 'Pending' */}
      <div className="card-map-wrapper">
        <LiveTrackingMap />
      </div>

      <div className="card-middle">
        <div className="location-row">
          <span className="dot pickup"></span>
          <p><strong>From:</strong> {pickup}</p>
        </div>
        <div className="location-connector"></div>
        <div className="location-row">
          <span className="dot destination"></span>
          <p><strong>To:</strong> {destination}</p>
        </div>
      </div>
      
      <div className="card-bottom">
        <span className="parcel-weight">📦 {order.weight_category}</span>
        <button className="details-btn">View Full Logistics</button>
      </div>
    </div>
  );
}