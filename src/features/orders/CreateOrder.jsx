import { useState } from "react";
import { createOrder } from "./ordersAPI";
import PriceSummary from "./PriceSummary.jsx"; 
import "./CreateOrder.css"; 

export default function CreateOrder() {
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const weightPrices = { LIGHT: 500, MEDIUM: 1000, HEAVY: 2000 };

  const handleWeightChange = (e) => {
    const selectedWeight = e.target.value;
    setWeight(selectedWeight);
    setPrice(weightPrices[selectedWeight] || null);
  };

  const handleSubmit = async () => {
    if (!weight) return alert("Please choose a weight category.");
    setLoading(true);
    try {
      await createOrder({
        pickup_location: "Nairobi Central",
        destination: "Westlands",
        weight_category: weight,
      });
      alert("Order created successfully! 🚚");
    } catch (error) {
      alert("Error: Check if your Flask backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-order-page">
      <div className="order-container">
        <header className="order-header">
          <span className="badge">Premium Logistics</span>
          <h1>Request a Delivery</h1>
          <p>Classy, swift, and secure transport for your valuables.</p>
        </header>

        <main className="order-content">
          {/* Magnificent Map Placeholder */}
          <section className="map-wrapper-magnificent">
            <div className="glass-overlay">
              <div className="location-pulse"></div>
              <h3>Route Optimization</h3>
              <p>GPS Engine connecting...</p>
            </div>
          </section>

          {/* Elegant Form Side */}
          <section className="form-wrapper">
            <div className="form-card">
              <div className="step-indicator">Step 1 of 2: Parcel Details</div>
              
              <div className="input-group">
                <label className="input-label">Select Parcel Size</label>
                <div className="select-wrapper">
                  <select
                    className="magnificent-select"
                    value={weight}
                    onChange={handleWeightChange}
                  >
                    <option value="">Choose category</option>
                    <option value="LIGHT">Light — Documents & Small Parcels</option>
                    <option value="MEDIUM">Medium — Boxes & Electronics</option>
                    <option value="HEAVY">Heavy — Furniture & Large Cargo</option>
                  </select>
                </div>
              </div>

              {price && (
                <div className="summary-reveal">
                  <PriceSummary price={price} />
                </div>
              )}

              <button 
                className="magnificent-button" 
                onClick={handleSubmit}
                disabled={!price || loading}
              >
                {loading ? (
                  <span className="loader-text">Securing Courier...</span>
                ) : (
                  "Confirm Delivery Order"
                )}
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}