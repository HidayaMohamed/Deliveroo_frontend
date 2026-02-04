import { useState } from "react";
import { createOrder } from "./ordersAPI";
import "./CreateOrder.css";

export default function CreateOrder() {
  const [weight, setWeight] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState({ pickup: "", dropoff: "" });

  const pricing = { LIGHT: 1000, MEDIUM: 2000, HEAVY: 3000 };
  
  const vehicles = { 
    LIGHT: "https://images.pexels.com/photos/4391469/pexels-photo-4391469.jpeg", 
    MEDIUM: "https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg", 
    HEAVY: "https://images.pexels.com/photos/29057942/pexels-photo-29057942.jpeg"   
  };

  const handleLocationChange = (e) => {
    setLocations({ ...locations, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!weight || !locations.pickup || !locations.dropoff) {
      return alert("Please complete the route and package details.");
    }
    setLoading(true);
    try {
      await createOrder({
        pickup_location: locations.pickup,
        destination: locations.dropoff,
        weight_category: weight,
      });
      setIsOrdered(true);
    } catch (error) {
      alert("Error: Check if your Flask backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (isOrdered) {
    return (
      <div className="success-view-container">
        <div className="success-glass-card">
          <div className="success-check">✅</div>
          <h2>Shipment Dispatched!</h2>
          <p>Your luxury courier is navigating from <strong>{locations.pickup}</strong> to <strong>{locations.dropoff}</strong>.</p>
          <div className="status-badge-blue">Agent En Route...</div>
          <button onClick={() => setIsOrdered(false)} className="btn-return">New Request</button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-order-page luxury-theme">
      {/* 1. Minimalist Greeting */}
      <header className="user-greeting">
        <span className="eyebrow">Excellence in Motion</span>
        <h1>Welcome<span className="gold-dot">.</span></h1>
        <p className="membership-status">Premium Logistics Member since 2026</p>
      </header>

      {/* The Stats Strip is now GONE - Logic jumps straight to the Grid */}

      <div className="order-main-grid">
        {/* 2. Route Intelligence (Now the first section) */}
        <section className="route-section card-elevated">
          <h3 className="section-title">1. Route Intelligence</h3>
          <div className="location-inputs">
            <div className="input-field">
              <label>Collection Point</label>
              <input 
                type="text" 
                name="pickup"
                placeholder="Enter pickup address..." 
                value={locations.pickup}
                onChange={handleLocationChange}
                className="luxury-input"
              />
            </div>
            <div className="route-connector"></div>
            <div className="input-field">
              <label>Final Destination</label>
              <input 
                type="text" 
                name="dropoff"
                placeholder="Enter drop-off address..." 
                value={locations.dropoff}
                onChange={handleLocationChange}
                className="luxury-input"
              />
            </div>
          </div>
        </section>

        {/* 3. Package Category */}
        <section className="selection-card">
          <h3 className="section-title">2. Package Category</h3>
          <div className="weight-grid">
            {Object.keys(pricing).map((cat) => (
              <div 
                key={cat} 
                className={`vehicle-card ${weight === cat ? 'active' : ''}`}
                onClick={() => setWeight(cat)}
              >
                <div className="vehicle-image-container">
                  <img src={vehicles[cat]} alt={cat} className="vehicle-img" />
                </div>
                <span className="cat-name">{cat}</span>
                <span className="cat-price">KSh {pricing[cat]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Dynamic Consignment Note */}
        {weight && (
          <section className="receipt-container fade-in">
            <div className="luxury-receipt">
              <div className="receipt-header">Consignment Note</div>
              <div className="receipt-details">
                <div className="receipt-line">
                  <span className="label">Origin</span>
                  <span className="value">{locations.pickup || "Pending..."}</span>
                </div>
                <div className="receipt-line">
                  <span className="label">Destination</span>
                  <span className="value">{locations.dropoff || "Pending..."}</span>
                </div>
                <div className="receipt-line">
                  <span className="label">Class</span>
                  <span className="value">{weight} Priority</span>
                </div>
              </div>
              <hr className="receipt-divider" />
              <div className="receipt-total">
                <span>TOTAL</span>
                <span className="green-text">KSh {pricing[weight]}</span>
              </div>

              <div className="action-row">
                <button className="btn-deny" onClick={() => setWeight("")}>Discard</button>
                <button className="btn-accept" onClick={handleOrder} disabled={loading}>
                  {loading ? "Confirming..." : "Finalize Order"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}