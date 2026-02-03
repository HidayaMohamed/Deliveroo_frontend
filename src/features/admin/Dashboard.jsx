import "./Dashboard.css";

// This 'export default' fixes the SyntaxError!
export default function Dashboard() {
  const stats = [
    { label: "Total Deliveries", value: "1,284", color: "var(--cyber-yellow)" },
    { label: "Active Orders", value: "42", color: "var(--royal-blue)" },
    { label: "Revenue", value: "KSh 840k", color: "var(--stark-white)" }
  ];

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <span className="badge-brown">System Oversight</span>
        <h1>Executive Dashboard</h1>
      </header>

      <section className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <small>{stat.label}</small>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </section>

      <section className="admin-actions">
        <h3>Quick Management</h3>
        <div className="btn-row">
          <button className="admin-btn">Assign Couriers</button>
          <button className="admin-btn secondary">System Settings</button>
        </div>
      </section>
    </div>
  );
}