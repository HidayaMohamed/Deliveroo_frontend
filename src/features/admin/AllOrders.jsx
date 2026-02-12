import { useState, useEffect } from 'react';


const AllOrders = ({ onAssignCourier }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, active, completed
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const status = filter === 'all' ? undefined : filter;
      const data = await getAdminOrders({ status });
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Demo data fallback
      setOrders([
        {
          id: 'ORD-1234',
          customer: 'Sharon Njoroge',
          pickup: 'Westlands, Nairobi',
          destination: 'Karen, Nairobi',
          weight: 'MEDIUM',
          price: 2000,
          status: 'Pending',
          time: '10 mins ago',
          courier: null
        },
        {
          id: 'ORD-1235',
          customer: 'John Kamau',
          pickup: 'CBD, Nairobi',
          destination: 'Kilimani, Nairobi',
          weight: 'LIGHT',
          price: 500,
          status: 'In Transit',
          time: '25 mins ago',
          courier: 'Peter Omondi'
        },
        {
          id: 'ORD-1236',
          customer: 'Mary Wanjiku',
          pickup: 'Parklands, Nairobi',
          destination: 'Runda, Nairobi',
          weight: 'HEAVY',
          price: 3000,
          status: 'Completed',
          time: '1 hr ago',
          courier: 'James Mwangi'
        },
        {
          id: 'ORD-1237',
          customer: 'David Otieno',
          pickup: 'Ngong Road, Nairobi',
          destination: 'Langata, Nairobi',
          weight: 'MEDIUM',
          price: 2000,
          status: 'Pending',
          time: '5 mins ago',
          courier: null
        },
      ]);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-500',
      'In Transit': 'bg-blue-500',
      'Completed': 'bg-green-500',
      'Cancelled': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getWeightBadgeColor = (weight) => {
    const colors = {
      'LIGHT': 'bg-green-100 text-green-700',
      'MEDIUM': 'bg-yellow-100 text-yellow-700',
      'HEAVY': 'bg-orange-100 text-orange-700'
    };
    return colors[weight] || 'bg-gray-100 text-gray-700';
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex gap-3 flex-wrap">
          {['all', 'pending', 'active', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-[20px] font-black uppercase text-[9px] tracking-[0.2em] transition-all
                ${filter === status 
                  ? 'bg-yellow-500 text-black shadow-lg scale-105' 
                  : 'bg-white text-gray-400 hover:bg-gray-50'
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 px-6 py-3 bg-white rounded-[20px] border border-gray-100 outline-none font-bold text-sm focus:ring-4 focus:ring-yellow-100 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Orders Count */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          Showing {filteredOrders.length} {filter !== 'all' ? filter : ''} orders
        </span>
        <div className="h-[2px] w-12 bg-yellow-500"></div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Order ID
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Customer
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Route
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Weight
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Price
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Status
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Courier
                </th>
                <th className="px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-gray-50 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)} animate-pulse`}></div>
                      <span className="font-black text-sm">{order.id}</span>
                    </div>
                    <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest mt-1">
                      {order.time}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        👤
                      </div>
                      <div>
                        <p className="font-bold text-sm">{order.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold flex items-center gap-2">
                        <span className="text-green-500">📍</span>
                        {order.pickup}
                      </p>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-xs">↓</span>
                      </div>
                      <p className="text-sm font-bold flex items-center gap-2">
                        <span className="text-red-500">📍</span>
                        {order.destination}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-[0.2em] ${getWeightBadgeColor(order.weight)}`}>
                      {order.weight}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-xl italic text-yellow-600">
                      KES {order.price}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}></div>
                      <span className="font-bold text-sm">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {order.courier ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm">
                          ✓
                        </div>
                        <span className="text-sm font-bold">{order.courier}</span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {!order.courier && order.status === 'Pending' && (
                      <button
                        onClick={() => onAssignCourier(order)}
                        className="px-6 py-3 bg-yellow-500 text-black rounded-[15px] font-black text-[9px] uppercase tracking-[0.2em] hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-lg transition-all active:scale-95"
                      >
                        Assign
                      </button>
                    )}
                    {order.courier && (
                      <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-[15px] font-black text-[9px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-all">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl font-black text-gray-400 mb-2">No Orders Found</p>
            <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;