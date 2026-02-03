import { useState } from "react";
import { createOrder } from "./ordersAPI";
import "./CreateOrder.css";

export default function CreateOrder() {
  const [weight, setWeight] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  const pricing = { LIGHT: 500, MEDIUM: 1000, HEAVY: 2000 };
  const vehicles = { LIGHT: "🏍️", MEDIUM: "🚗", HEAVY: "🚛" };
  const courierName = "John Doe"; // Mock courier assigned for UX

  const handleOrder = async () => {
    if (!weight) return;
    setLoading(true);
    try {
      await createOrder({
        pickup_location: "Nairobi Central",
        destination: "Westlands",
        weight_category: weight,
      });
      setIsOrdered(true);
    } catch (error) {
      alert("Error: Check if your Flask backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setWeight("");
    setIsOrdered(false);
  };

  // SUCCESS STATE: Notification of receipt
  if (isOrdered) {
    return (
      <div className="success-view-container">
        <div className="success-glass-card">
          <div className="success-check">✅</div>
          <h2>Request Received!</h2>
          <p>Your luxury shipment is being handled by <strong>{courierName}</strong>.</p>
          <div className="status-badge-blue">Order received and being worked on...</div>
          <button onClick={resetForm} className="btn-return">New Shipment</button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-order-page luxury-theme">
      {/* 1. Personalized Greeting */}
      <header className="user-greeting">
        <span className="eyebrow">Excellence in Motion</span>
        <h1>Welcome, <span className="gold-text">Sharon Njoroge</span></h1>
        <p>Select your parcel details to get started.</p>
      </header>

      <div className="order-main-grid">
        {/* 2. Visual Vehicle Selection */}
        <section className="selection-card">
          <h3 className="section-title">Select Package Weight</h3>
          <div className="weight-grid">
            {Object.keys(pricing).map((cat) => (
              <div 
                key={cat} 
                className={`vehicle-card ${weight === cat ? 'active' : ''}`}
                onClick={() => setWeight(cat)}
              >
                <div className="vehicle-circle">{vehicles[cat]}</div>
                <span className="cat-name">{cat}</span>
                <span className="cat-price">KSh {pricing[cat]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Interactive Receipt & Actions */}
        {weight && (
          <section className="receipt-container fade-in">
            <div className="luxury-receipt">
              <div className="receipt-header">Shipment Summary</div>
              <div className="receipt-line">
                <span>Weight Category</span>
                <span>{weight}</span>
              </div>
              <div className="receipt-line">
                <span>Carrier Type</span>
                <span>{weight === 'HEAVY' ? 'Lorry' : 'Biker'}</span>
              </div>
              <hr className="receipt-divider" />
              <div className="receipt-total">
                <span>TOTAL PRICE</span>
                <span className="green-text">KSh {pricing[weight]}</span>
              </div>

              <div className="action-row">
                <button className="btn-deny" onClick={() => setWeight("")}>Deny Order</button>
                <button className="btn-accept" onClick={handleOrder} disabled={loading}>
                  {loading ? "Processing..." : "Accept & Make Order"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}