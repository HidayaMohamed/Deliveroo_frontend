import { useState, useEffect } from 'react';
import AssignedOrders from './AssignedOrders';
import LocationTracker from '../../components/courier/LocationTracker';
import '../../styles/AssignedOrders.css';
import '../../styles/LocationTracker.css';

const RiderPortal = () => {
  const [courier, setCourier] = useState(null);
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    completedToday: 0,
    pendingDeliveries: 0,
    earnings: 0
  });

  const fetchCourierData = async () => {
    try {
      const response = await fetch('/api/courier/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCourier(data.courier);
      setStats(data.stats || {
        totalDeliveries: 0,
        completedToday: 0,
        pendingDeliveries: 0,
        earnings: 0
      });
    } catch (error) {
      console.error('Error fetching courier data:', error);
    }
  };

  useEffect(() => {
    fetchCourierData();
    const interval = setInterval(fetchCourierData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="courier-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Rider Portal</h1>
          {courier && (
            <p className="courier-name">
              Welcome, {courier.name || courier.email}
            </p>
          )}
        </div>
        <div className="courier-status">
          <span className={`status-badge ${courier?.isActive ? 'active' : 'inactive'}`}>
            {courier?.isActive ? 'Active' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.totalDeliveries}</h3>
            <p>Total Deliveries</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.completedToday}</h3>
            <p>Completed Today</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <h3>{stats.pendingDeliveries}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>${stats.earnings.toFixed(2)}</h3>
            <p>Today's Earnings</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <AssignedOrders onStatusUpdate={fetchCourierData} />
        </div>

        <div className="content-sidebar">
          <div className="sidebar-section">
            <h3>Location Tracker</h3>
            <LocationTracker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderPortal;