import { useState, useEffect } from 'react';
import '../../styles/AllOrders.css';

const AllOrders = ({ onAssignCourier }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, active, completed
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/admin/orders?filter=${filter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const classes = {
      'pending': 'status-pending',
      'assigned': 'status-assigned',
      'picked_up': 'status-picked-up',
      'out_for_delivery': 'status-in-transit',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return classes[status] || 'status-default';
  };

  const formatStatus = (status) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchTerm) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deliveryAddress?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="all-orders">
      <div className="orders-header">
        <h2>Order Management</h2>
        <div className="orders-controls">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="filter-buttons">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Courier</th>
              <th>Status</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-row">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id}</td>
                  <td>
                    <div className="customer-info">
                      <strong>{order.customerName}</strong>
                      <span className="phone">{order.customerPhone}</span>
                    </div>
                  </td>
                  <td className="address">{order.pickupAddress}</td>
                  <td className="address">{order.deliveryAddress}</td>
                  <td>
                    {order.courierName ? (
                      <span className="courier-name">{order.courierName}</span>
                    ) : (
                      <span className="no-courier">Unassigned</span>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {formatStatus(order.status)}
                    </span>
                  </td>
                  <td className="time">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="actions">
                    {!order.courierId && order.status === 'pending' && (
                      <button
                        className="assign-btn"
                        onClick={() => onAssignCourier(order)}
                      >
                        Assign
                      </button>
                    )}
                    {order.courierId && order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <button
                        className="reassign-btn"
                        onClick={() => onAssignCourier(order)}
                      >
                        Reassign
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="orders-summary">
        <p>Showing {filteredOrders.length} of {orders.length} orders</p>
      </div>
    </div>
  );
};

export default AllOrders;