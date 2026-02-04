import { useState, useEffect } from 'react';
import '../../styles/AdminDashboardComponent.css';

const Dashboard = ({ stats, showDetailedAnalytics = false }) => {
  const [chartData, setChartData] = useState({
    daily: [],
    weekly: [],
    performance: []
  });
  const [timeRange, setTimeRange] = useState('daily'); // daily, weekly, monthly

  useEffect(() => {
    fetchChartData();
  }, [timeRange]);

  const fetchChartData = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const renderSimpleChart = (data, label) => {
    if (!data || data.length === 0) return null;
    
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="simple-chart">
        <h4>{label}</h4>
        <div className="chart-bars">
          {data.map((item, index) => (
            <div key={index} className="bar-container">
              <div className="bar-label">{item.label}</div>
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                >
                  <span className="bar-value">{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-analytics">
      {!showDetailedAnalytics ? (
        /* Overview Mode */
        <div className="overview-grid">
          <div className="overview-section">
            <h3>Recent Activity</h3>
            <div className="activity-summary">
              <div className="activity-item">
                <span className="activity-icon">📦</span>
                <div className="activity-content">
                  <p className="activity-title">New Orders</p>
                  <p className="activity-value">{stats.totalOrders} today</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🚚</span>
                <div className="activity-content">
                  <p className="activity-title">In Delivery</p>
                  <p className="activity-value">{stats.activeDeliveries} active</p>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-content">
                  <p className="activity-title">Completed</p>
                  <p className="activity-value">{stats.completedOrders || 0} orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-section">
            <h3>Courier Status</h3>
            <div className="courier-summary">
              <div className="courier-stat">
                <div className="stat-circle active">
                  {stats.activeCouriers}
                </div>
                <p>Active</p>
              </div>
              <div className="courier-stat">
                <div className="stat-circle inactive">
                  {stats.totalCouriers - stats.activeCouriers}
                </div>
                <p>Offline</p>
              </div>
            </div>
          </div>

          <div className="overview-section full-width">
            <h3>Quick Stats</h3>
            <div className="quick-stats">
              <div className="quick-stat-item">
                <span className="stat-label">Avg Delivery Time</span>
                <span className="stat-value">{stats.avgDeliveryTime} min</span>
              </div>
              <div className="quick-stat-item">
                <span className="stat-label">Success Rate</span>
                <span className="stat-value">{stats.successRate || 95}%</span>
              </div>
              <div className="quick-stat-item">
                <span className="stat-label">Customer Satisfaction</span>
                <span className="stat-value">{stats.satisfaction || 4.5}/5</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Analytics Mode */
        <div className="analytics-detailed">
          <div className="analytics-header">
            <h3>Detailed Analytics</h3>
            <div className="time-range-selector">
              <button
                className={timeRange === 'daily' ? 'active' : ''}
                onClick={() => setTimeRange('daily')}
              >
                Daily
              </button>
              <button
                className={timeRange === 'weekly' ? 'active' : ''}
                onClick={() => setTimeRange('weekly')}
              >
                Weekly
              </button>
              <button
                className={timeRange === 'monthly' ? 'active' : ''}
                onClick={() => setTimeRange('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-section">
              {renderSimpleChart(
                chartData.daily,
                `${timeRange === 'daily' ? 'Today\'s' : timeRange === 'weekly' ? 'This Week\'s' : 'This Month\'s'} Orders`
              )}
            </div>

            <div className="chart-section">
              {renderSimpleChart(
                chartData.weekly,
                'Revenue Trend'
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="performance-section">
            <h3>Courier Performance</h3>
            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>Courier</th>
                    <th>Deliveries</th>
                    <th>Avg Time</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.performance && chartData.performance.map((courier, index) => (
                    <tr key={index}>
                      <td>{courier.name}</td>
                      <td>{courier.deliveries}</td>
                      <td>{courier.avgTime} min</td>
                      <td>{courier.rating}/5</td>
                      <td>
                        <span className={`status-badge ${courier.isActive ? 'active' : 'inactive'}`}>
                          {courier.isActive ? 'Active' : 'Offline'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;