import { useState, useEffect } from 'react';
import AllOrders from '../features/admin/AllOrders';
import AssignCourier from '../features/admin/AssignCourier';
import Dashboard from '../features/admin/Dashboard';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [view, setView] = useState('overview'); // overview, orders, analytics
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeDeliveries: 0,
    totalCouriers: 0,
    activeCouriers: 0,
    revenue: 0,
    avgDeliveryTime: 0
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    // Refresh stats every minute
    const interval = setInterval(fetchDashboardStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const handleAssignCourier = (order) => {
    setSelectedOrder(order);
    setShowAssignModal(true);
  };

  const handleAssignComplete = () => {
    setShowAssignModal(false);
    setSelectedOrder(null);
    fetchDashboardStats();
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="view-tabs">
          <button 
            className={`tab ${view === 'overview' ? 'active' : ''}`}
            onClick={() => setView('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${view === 'orders' ? 'active' : ''}`}
            onClick={() => setView('orders')}
          >
            Orders
          </button>
          <button 
            className={`tab ${view === 'analytics' ? 'active' : ''}`}
            onClick={() => setView('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
            <span className="stat-trend">Today</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚚</div>
          <div className="stat-content">
            <h3>{stats.activeDeliveries}</h3>
            <p>Active Deliveries</p>
            <span className="stat-trend">In Progress</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.activeCouriers} / {stats.totalCouriers}</h3>
            <p>Active Couriers</p>
            <span className="stat-trend">Online Now</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-content">
            <h3>${stats.revenue.toFixed(2)}</h3>
            <p>Revenue</p>
            <span className="stat-trend">Today</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>{stats.avgDeliveryTime} min</h3>
            <p>Avg Delivery Time</p>
            <span className="stat-trend">Last 24h</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        {view === 'overview' && (
          <Dashboard stats={stats} />
        )}
        
        {view === 'orders' && (
          <AllOrders onAssignCourier={handleAssignCourier} />
        )}
        
        {view === 'analytics' && (
          <Dashboard stats={stats} showDetailedAnalytics={true} />
        )}
      </div>

      {/* Assign Courier Modal */}
      {showAssignModal && (
        <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AssignCourier 
              order={selectedOrder}
              onClose={() => setShowAssignModal(false)}
              onAssignComplete={handleAssignComplete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;