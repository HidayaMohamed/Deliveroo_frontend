import { useState, useEffect } from 'react';
import AllOrders from '../features/admin/AllOrders';
import AssignCourier from '../features/admin/AssignCourier';
import Dashboard from '../features/admin/Dashboard';

const AdminDashboard = () => {
  const [view, setView] = useState('overview');
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
    <div className="min-h-screen bg-white text-black pb-32">
      {/* Progress Indicator */}
      <div className="w-full h-1 bg-gray-100 sticky top-0 z-50">
        <div className="h-full bg-yellow-500 transition-all duration-1000" style={{ width: '100%' }}></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pt-16">
        {/* Header */}
        <header className="mb-20">
          <span className="text-yellow-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
            Control Center
          </span>
          <h1 className="text-8xl font-black tracking-tighter leading-none mb-6">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
              Real-time Operations Overview
            </p>
          </div>
        </header>

        {/* View Tabs */}
        <div className="flex gap-4 mb-16 overflow-x-auto">
          {['overview', 'orders', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className={`px-8 py-4 rounded-[25px] font-black uppercase tracking-[0.2em] text-[10px] transition-all whitespace-nowrap
                ${view === tab 
                  ? 'bg-yellow-500 text-black shadow-xl scale-105' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-20">
          {/* Total Orders Card */}
          <div className="group bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-[120px] opacity-5 group-hover:opacity-10 transition-all">📦</div>
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
                Total Orders
              </span>
              <h3 className="text-5xl font-black italic tracking-tighter mb-2 text-yellow-600">
                {stats.totalOrders}
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-yellow-500"></span>
                <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest">Today</p>
              </div>
            </div>
          </div>

          {/* Active Deliveries Card */}
          <div className="group bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-[120px] opacity-5 group-hover:opacity-10 transition-all">🚚</div>
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
                Active Deliveries
              </span>
              <h3 className="text-5xl font-black italic tracking-tighter mb-2 text-yellow-600">
                {stats.activeDeliveries}
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest">In Progress</p>
              </div>
            </div>
          </div>

          {/* Active Couriers Card */}
          <div className="group bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-[120px] opacity-5 group-hover:opacity-10 transition-all">👥</div>
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
                Active Couriers
              </span>
              <h3 className="text-5xl font-black italic tracking-tighter mb-2 text-yellow-600">
                {stats.activeCouriers}
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-yellow-500"></span>
                <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest">
                  of {stats.totalCouriers} Online
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="group bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-[120px] opacity-5 group-hover:opacity-10 transition-all">💵</div>
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
                Revenue
              </span>
              <h3 className="text-5xl font-black italic tracking-tighter mb-2 text-yellow-600">
                KES {stats.revenue.toFixed(0)}
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-yellow-500"></span>
                <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest">Today</p>
              </div>
            </div>
          </div>

          {/* Avg Delivery Time Card */}
          <div className="group bg-gray-50 p-8 rounded-[40px] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-[120px] opacity-5 group-hover:opacity-10 transition-all">⏱️</div>
            <div className="relative">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-4">
                Avg Time
              </span>
              <h3 className="text-5xl font-black italic tracking-tighter mb-2 text-yellow-600">
                {stats.avgDeliveryTime}
              </h3>
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-yellow-500"></span>
                <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest">Minutes / Last 24h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-50 rounded-[60px] p-12 border border-gray-100 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 underline decoration-yellow-500 decoration-2 underline-offset-8">
              {view === 'overview' && '01. Operations Overview'}
              {view === 'orders' && '02. Order Management'}
              {view === 'analytics' && '03. Analytics Dashboard'}
            </h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {view === 'overview' && <Dashboard stats={stats} />}
          {view === 'orders' && <AllOrders onAssignCourier={handleAssignCourier} />}
          {view === 'analytics' && <Dashboard stats={stats} showDetailedAnalytics={true} />}
        </div>
      </div>

      {/* Assign Courier Modal */}
      {showAssignModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-8 animate-fade-in"
          onClick={() => setShowAssignModal(false)}
        >
          <div 
            className="bg-white rounded-[60px] p-12 max-w-2xl w-full shadow-2xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black tracking-tight italic">Assign Courier</h3>
              <button
                onClick={() => setShowAssignModal(false)}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-black text-gray-600 transition-all hover:rotate-90"
              >
                ✕
              </button>
            </div>
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