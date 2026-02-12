import { useState, useEffect } from 'react';
import { getAdminUsers, assignCourier } from '../../api/admin';
import '../../styles/AssignCourier.css';

const AssignCourier = ({ order, onClose, onAssignComplete }) => {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAvailableCouriers();
  }, []);

  const fetchAvailableCouriers = async () => {
    try {
      const data = await getAdminUsers({ role: 'courier', is_active: true });
      setCouriers(data.users || []);
    } catch (error) {
      console.error('Error fetching couriers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedCourier) {
      alert('Please select a courier');
      return;
    }

    setAssigning(true);
    try {
      await assignCourier(order.id, selectedCourier.id);
      onAssignComplete();
    } catch (error) {
      alert(`Failed to assign courier: ${error.message}`);
    } finally {
      setAssigning(false);
    }
  };

  const filteredCouriers = couriers.filter(courier =>
    courier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    courier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="assign-courier-modal">
      <div className="modal-header">
        <h2>Assign Courier</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="order-info">
        <h3>Order Details</h3>
        <div className="order-detail-row">
          <span className="label">Order ID:</span>
          <span className="value">#{order.id}</span>
        </div>
        <div className="order-detail-row">
          <span className="label">Customer:</span>
          <span className="value">{order.customerName}</span>
        </div>
        <div className="order-detail-row">
          <span className="label">Pickup:</span>
          <span className="value">{order.pickupAddress}</span>
        </div>
        <div className="order-detail-row">
          <span className="label">Delivery:</span>
          <span className="value">{order.deliveryAddress}</span>
        </div>
      </div>

      <div className="courier-selection">
        <h3>Select Courier</h3>
        <input
          type="text"
          placeholder="Search couriers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {loading ? (
          <div className="loading">Loading couriers...</div>
        ) : (
          <div className="couriers-list">
            {filteredCouriers.length === 0 ? (
              <div className="no-couriers">No available couriers found</div>
            ) : (
              filteredCouriers.map((courier) => (
                <div
                  key={courier.id}
                  className={`courier-card ${selectedCourier?.id === courier.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCourier(courier)}
                >
                  <div className="courier-avatar">
                    {courier.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="courier-info">
                    <h4>{courier.name}</h4>
                    <p className="courier-email">{courier.email}</p>
                    <div className="courier-stats">
                      <span className="stat">
                        📦 {courier.totalDeliveries || 0} deliveries
                      </span>
                      <span className="stat">
                        ⭐ {courier.rating || 5}/5
                      </span>
                    </div>
                  </div>
                  <div className="courier-status">
                    <span className={`status-indicator ${courier.isActive ? 'active' : 'inactive'}`}>
                      {courier.isActive ? 'Active' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="modal-actions">
        <button className="cancel-btn" onClick={onClose} disabled={assigning}>
          Cancel
        </button>
        <button
          className="assign-btn"
          onClick={handleAssign}
          disabled={!selectedCourier || assigning}
        >
          {assigning ? 'Assigning...' : 'Assign Courier'}
        </button>
      </div>
    </div>
  );
};

export default AssignCourier;