import { useState, useEffect } from 'react';

const AssignedOrders = ({ onStatusUpdate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    fetchAssignedOrders();
    const interval = setInterval(fetchAssignedOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAssignedOrders = async () => {
    try {
      const response = await fetch('/api/courier/assigned-orders', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching assigned orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const response = await fetch(`/api/courier/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchAssignedOrders();
        if (onStatusUpdate) onStatusUpdate();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // TAILWIND MAPPINGS
  const getStatusConfig = (status) => {
    const configs = {
      'pending': { pill: 'bg-amber-100 text-amber-700', label: 'Pending' },
      'picked_up': { pill: 'bg-blue-100 text-blue-700', label: 'Picked Up' },
      'out_for_delivery': { pill: 'bg-purple-100 text-purple-700', label: 'In Transit' },
      'delivered': { pill: 'bg-green-100 text-green-700', label: 'Delivered' }
    };
    return configs[status] || { pill: 'bg-slate-100 text-slate-600', label: status };
  };

  const getActionButtons = (status) => {
    const buttons = {
      'pending': [{ label: 'Pick Up', status: 'picked_up', icon: '📦' }],
      'picked_up': [{ label: 'Out for Delivery', status: 'out_for_delivery', icon: '🚚' }],
      'out_for_delivery': [{ label: 'Mark Delivered', status: 'delivered', icon: '✅' }],
    };
    return buttons[status] || [];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20 text-slate-400 animate-pulse font-bold tracking-widest">
        INITIALIZING LOGISTICS...
      </div>
    );
  }

  return (
    <div className="py-10 px-[5%] max-w-[1200px] mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-6">
        <div>
          <span className="text-amber-600 font-black uppercase tracking-[3px] text-xs">Courier Portal</span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">Assigned Deliveries</h2>
        </div>
        <span className="bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold">
          {orders.length} ACTIVE
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[30px] p-20 text-center">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-slate-500 font-medium italic">No assigned orders at the moment</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => {
            const config = getStatusConfig(order.status);
            return (
              <div key={order.id} className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300 flex flex-col">
                
                {/* Order Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <strong className="block text-slate-900">Order #{order.id}</strong>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${config.pill}`}>
                    {config.label}
                  </span>
                </div>

                {/* Details Section */}
                <div className="space-y-4 flex-grow">
                  <div className="flex gap-3 text-sm">
                    <span className="text-lg">📍</span>
                    <p className="text-slate-600 leading-tight">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Pickup</span>
                      {order.pickupAddress}
                    </p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="text-lg">🏠</span>
                    <p className="text-slate-600 leading-tight">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Delivery</span>
                      {order.deliveryAddress}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest">Customer</span>
                    <span className="text-slate-900 font-black">{order.customerName}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  {getActionButtons(order.status).map((button) => (
                    <button
                      key={button.status}
                      onClick={() => updateOrderStatus(order.id, button.status)}
                      disabled={updatingOrderId === order.id}
                      className="w-full bg-transparent border-2 border-amber-500 text-amber-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                    >
                      <span className="text-lg">{button.icon}</span>
                      {updatingOrderId === order.id ? 'SYNCHRONIZING...' : button.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignedOrders;