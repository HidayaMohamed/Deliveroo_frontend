import { useState, useEffect, useCallback } from 'react';
import '../../styles/AssignedOrders.css';

const AssignedOrders = ({ onStatusUpdate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchAssignedOrders = useCallback(async () => {
    try {
      const response = await fetch('/api/courier/assigned-orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`  // Fixed: Added backticks
        }
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching assigned orders:', error);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback to prevent unnecessary re-renders

  useEffect(() => {
    fetchAssignedOrders();
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchAssignedOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchAssignedOrders]); // Fixed: Added dependency

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const response = await fetch(`/api/courier/orders/${orderId}/status`, {  // Fixed: Added backticks
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`  // Fixed: Added backticks
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchAssignedOrders();
        if (onStatusUpdate) onStatusUpdate();
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusButtons = (order) => {
    const buttons = {
      'pending': [
        { label: 'Pick Up', status: 'picked_up', icon: '📦' },
      ],
      'picked_up': [
        { label: 'Out for Delivery', status: 'out_for_delivery', icon: '🚚' },
      ],
      'out_for_delivery': [
        { label: 'Delivered', status: 'delivered', icon: '✅' },
      ],
      'delivered': []
    };

    return buttons[order.status] || [];
  };

  const getStatusBadgeClass = (status) => {
    const statusClasses = {
      'pending': 'status-pending',
      'picked_up': 'status-picked-up',
      'out_for_delivery': 'status-in-transit',
      'delivered': 'status-delivered'
    };
    return statusClasses[status] || 'status-default';
  };

  if (loading) {
    return <div className="loading">Loading assigned orders...</div>;
  }

  return (
    <div className="assigned-orders">
      <div className="section-header">
        <h2>Assigned Deliveries</h2>
        <span className="order-count">{orders.length} orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No assigned orders at the moment</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <strong>Order #{order.id}</strong>
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                    {/* Fixed: Added backticks for template literal */}
                    {order.status.replace(/_/g, ' ')}  {/* Fixed: Added 'g' flag to replace all underscores */}
                  </span>
                </div>
                <div className="order-time">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </div>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="label">📍 Pickup:</span>
                  <span className="value">{order.pickupAddress}</span>
                </div>
                <div className="detail-row">
                  <span className="label">🏠 Delivery:</span>
                  <span className="value">{order.deliveryAddress}</span>
                </div>
                <div className="detail-row">
                  <span className="label">👤 Customer:</span>
                  <span className="value">{order.customerName}</span>
                </div>
                <div className="detail-row">
                  <span className="label">📞 Phone:</span>
                  <span className="value">{order.customerPhone}</span>
                </div>
                {order.distance && (
                  <div className="detail-row">
                    <span className="label">📏 Distance:</span>
                    <span className="value">{order.distance} km</span>
                  </div>
                )}
              </div>

              {/* Status Update Buttons */}
              <div className="order-actions">
                {getStatusButtons(order).map((button) => (
                  <button
                    key={button.status}
                    className="status-button"
                    onClick={() => updateOrderStatus(order.id, button.status)}
                    disabled={updatingOrderId === order.id}
                  >
                    <span className="button-icon">{button.icon}</span>
                    {updatingOrderId === order.id ? 'Updating...' : button.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedOrders;