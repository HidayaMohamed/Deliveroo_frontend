import { Link } from "react-router-dom";
import "./RiderPortal.css";

export default function RiderPortal() {
  const rider = {
    name: "John Doe",
    status: "On Duty",
    vehicle: "Express Motorbike",
    vehicleReg: "KDH 123X",
    rating: 4.9,
    todayEarnings: 4200,
    activeOrder: { id: "ORD-9901", from: "Kilimani", to: "Westlands", deadline: "14:20" }
  };

  return (
    <div className="rider-portal-page luxury-theme">
      <div className="rider-portal-container">
        
        {/* 1. Slim Header */}
        <header className="rider-header-slim">
          <div className="rider-profile-mini">
            <div className="mini-avatar">JD</div>
            <div className="name-meta">
              <h1>{rider.name}</h1>
              <span className="status-indicator">● {rider.status}</span>
            </div>
          </div>
          <div className="revenue-pill">
            <small>Today</small>
            <span>KSh {rider.todayEarnings}</span>
          </div>
        </header>

        <div className="portal-main-grid">
          {/* 2. Compact Vehicle Section */}
          <section className="portal-card-compact">
            <div className="card-inner-header">
              <h3>Fleet Status</h3>
              <span className="reg-tag">{rider.vehicleReg}</span>
            </div>
            <div className="vehicle-frame">
              <img src="https://images.pexels.com/photos/16100083/pexels-photo-16100083.jpeg" alt="Vehicle" />
            </div>
            <p className="vehicle-desc">{rider.vehicle}</p>
          </section>

          {/* 3. Tactical Map Section */}
          <section className="portal-card-compact active-highlight">
            <div className="card-inner-header">
              <h3>Active Route</h3>
              <span className="eta-tag">{rider.activeOrder.deadline}</span>
            </div>
            <div className="map-frame">
              <img src="https://images.pexels.com/photos/2800119/pexels-photo-2800119.jpeg" alt="Map" />
              <div className="map-pins">
                <div className="dot-pin start"></div>
                <div className="dot-pin end"></div>
              </div>
            </div>
            <div className="route-text-mini">
              <span>{rider.activeOrder.from}</span>
              <span className="separator">→</span>
              <span>{rider.activeOrder.to}</span>
            </div>
            <Link to="/courier/tasks" className="btn-manifest">Open Tasks</Link>
          </section>

          {/* 4. Score Card */}
          <section className="portal-card-compact score-card">
            <h3>Rating</h3>
            <div className="score-display">
              <span className="big-num">{rider.rating}</span>
              <span className="star-icon">★</span>
            </div>
            <button className="btn-history-slim">Trip History</button>
          </section>
        </div>
      </div>
    </div>
  );
}