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
    <div className="rider-portal-container luxury-theme">
      {/* 1. Identity & Status */}
      <header className="rider-header">
        <div className="rider-info">
          <div className="rider-avatar">JD</div>
          <div>
            <h1>{rider.name}</h1>
            <span className="badge-online">● {rider.status}</span>
          </div>
        </div>
        <div className="earnings-card">
          <small>Today's Revenue</small>
          <h2>KSh {rider.todayEarnings}</h2>
        </div>
      </header>

      <div className="portal-grid">
        {/* 2. My Mean of Transport (The Picture Section) */}
        <section className="portal-card vehicle-specs">
          <h3>Assigned Transport</h3>
          <div className="vehicle-display">
            <img src="https://images.pexels.com/photos/16100083/pexels-photo-16100083.jpeg" alt="Vehicle" />
          </div>
          <div className="spec-row">
            <span>Type: <strong>{rider.vehicle}</strong></span>
            <span>Reg: <strong>{rider.vehicleReg}</strong></span>
          </div>
        </section>

        {/* 3. Live Order / Task */}
        <section className="portal-card active-task">
          <h3>Active Assignment</h3>
          <div className="task-content">
            <div className="route-info">
              <p><strong>From:</strong> {rider.activeOrder.from}</p>
              <p><strong>To:</strong> {rider.activeOrder.to}</p>
            </div>
            <div className="timer-blob">ETA: {rider.activeOrder.deadline}</div>
            <button className="btn-update">Update Location</button>
          </div>
        </section>

        {/* 4. Quick Actions */}
        <section className="portal-card stats-card">
          <h3>Performance</h3>
          <div className="stats-circle">
            <span>{rider.rating}</span>
            <small>Rating</small>
          </div>
          <button className="btn-history">View Trip History</button>
        </section>
      </div>
    </div>
  );
}