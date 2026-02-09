import { useState, useEffect } from 'react';
import AssignedOrders from '../features/courier/AssignedOrders';
import UpdateLocation from '../features/courier/UpdateLocation';
import LocationTracker from '../components/courier/LocationTracker';
import '../styles/CourierDashboard.css';

const CourierDashboard = () => {
  const [courier, setCourier] = useState(null);
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    completedToday: 0,
    pendingDeliveries: 0,
    earnings: 0
  });

  useEffect(() => {
    // Fetch courier data
    fetchCourierData();
    // Set up real-time updates
    const interval = setInterval(fetchCourierData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchCourierData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/courier/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCourier(data.courier);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching courier data:', error);
    }
  };

  return (
    <div className="courier-dashboard">
      <div className="dashboard-header">
        <h1>Courier Dashboard</h1>
        <div className="courier-status">
          <span className={`status-badge ${courier?.isActive ? 'active' : 'inactive'}`}>
            {courier?.isActive ? 'Active' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Stats Overview */}
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

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Left Column - Assigned Orders */}
        <div className="content-section">
          <AssignedOrders onStatusUpdate={fetchCourierData} />
        </div>

        {/* Right Column - Location & Tools */}
        <div className="content-sidebar">
          <div className="sidebar-section">
            <h3>Location Tracker</h3>
            <LocationTracker />
          </div>
          
          <div className="sidebar-section">
            <UpdateLocation onLocationUpdate={fetchCourierData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourierDashboard;
