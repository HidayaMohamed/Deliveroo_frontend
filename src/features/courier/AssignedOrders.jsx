import "./AssignedOrders.css";

// This "export default" is what fixes your SyntaxError!
export default function AssignedOrders() {
  const mockOrders = [
    { id: "DEL-9901", customer: "Sharon N.", status: "In Transit", weight: "Light" },
    { id: "DEL-9902", customer: "Alex K.", status: "Pending", weight: "Heavy" },
  ];

  return (
    <div className="assigned-orders-container">
      <header className="page-header">
        <span className="badge-gold">Courier Workspace</span>
        
        <h1>Assigned Deliveries</h1>
      </header>

      <div className="orders-grid">
        {mockOrders.map((order) => (
          <div key={order.id} className="luxury-card">
            <div className="card-top">
              <span className="order-id">{order.id}</span>
              <span className={`status-pill ${order.status.replace(/\s+/g, '-').toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="card-body">
              <p><strong>Client:</strong> {order.customer}</p>
              <p><strong>Parcel:</strong> {order.weight} Category</p>
            </div>
            <button className="action-btn">Update Location</button>
          </div>
        ))}
      </div>
    </div>
  );
}