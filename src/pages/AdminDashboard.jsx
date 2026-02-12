import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Package, Truck, Users, 
  TrendingUp, Clock, ChevronRight, X, 
  Layers, Zap, Shield, Globe, Activity
} from 'lucide-react';

// Make sure these paths match your actual folder structure!
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
    <div className="min-h-screen bg-[#F8F7F4] text-[#0A0A0A] pb-32 font-sans selection:bg-[#EA580C]/20">
      {/* Precision Progress Indicator */}
      <div className="w-full h-[3px] bg-neutral-200 sticky top-0 z-[100] overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-black shadow-[0_0_15px_rgba(234,88,12,0.5)]" 
        />
      </div>

      <div className="max-w-[1700px] mx-auto px-8 md:px-16 pt-24">
        
        {/* EXECUTIVE HEADER */}
        <header className="mb-28 flex flex-col xl:flex-row xl:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="flex -space-x-1">
                 <div className="w-2 h-2 rounded-full bg-black"></div>
                 <div className="w-2 h-2 rounded-full bg-[#EA580C]"></div>
               </div>
               <span className="text-black font-black uppercase tracking-[0.8em] text-[10px]">
                 Global Operations Terminal
               </span>
            </div>
            <h1 className="text-[clamp(4rem,12vw,11rem)] font-black tracking-[-0.06em] leading-[0.75] uppercase italic">
              Volt <br /> <span className="text-[#EA580C] not-italic">Core.</span>
            </h1>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="bg-white border-l-4 border-black p-8 rounded-tr-[40px] rounded-br-[40px] shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.05)] min-w-[300px]">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Security Status</p>
                <Shield size={14} className="text-[#EA580C]" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-black text-xs font-black uppercase tracking-tighter">Encrypted Node 042</span>
              </div>
            </div>
          </div>
        </header>

        {/* BRUTALIST NAVIGATION */}
        <nav className="flex gap-2 mb-20 p-2 bg-neutral-200/50 backdrop-blur-md rounded-full w-fit mx-auto border border-neutral-200">
          {[
            { id: 'overview', icon: <Activity size={16}/>, label: 'Systems' },
            { id: 'orders', icon: <Package size={16}/>, label: 'Logistics' },
            { id: 'analytics', icon: <TrendingUp size={16}/>, label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex items-center gap-3 px-10 py-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500
                ${view === tab.id 
                  ? 'bg-black text-white shadow-2xl translate-y-[-2px]' 
                  : 'text-neutral-500 hover:text-black hover:bg-white/50'
                }`}
            >
              {tab.icon}
              <span className={view === tab.id ? 'block' : 'hidden md:block'}>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* THE "COMMAND" STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-24">
          <StatCard label="Inbound Orders" value={stats.totalOrders} icon={<Globe size={28}/>} trend="Global" color="white" />
          <StatCard label="In Transit" value={stats.activeDeliveries} icon={<Truck size={28}/>} trend="Active" color="orange" pulse />
          <StatCard label="Active Fleet" value={stats.activeCouriers} total={stats.totalCouriers} icon={<Users size={28}/>} trend="Deployment" color="black" />
          <StatCard label="Gross Yield" value={`KES ${stats.revenue.toLocaleString()}`} icon={<Zap size={28}/>} trend="Yield" color="white" />
          <StatCard label="Avg Turnaround" value={`${stats.avgDeliveryTime}m`} icon={<Clock size={28}/>} trend="Velocity" color="orange" />
        </div>

        {/* CINEMATIC CONTENT CANVAS */}
        <div className="relative group">
          <div className="absolute -top-10 left-0 flex items-center gap-4">
            <div className="h-[1px] w-20 bg-black/10"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-neutral-400">
              {view} execution window
            </span>
          </div>

          <motion.div 
            key={view}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="bg-white rounded-[80px] p-12 md:p-20 shadow-[0_100px_150px_-50px_rgba(0,0,0,0.08)] border border-neutral-100"
          >
            {view === 'overview' && <Dashboard stats={stats} />}
            {view === 'orders' && <AllOrders onAssignCourier={handleAssignCourier} />}
            {view === 'analytics' && <Dashboard stats={stats} showDetailedAnalytics={true} />}
          </motion.div>
        </div>
      </div>

      {/* OVERLAY: ASSIGN PROTOCOL */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAssignModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 100, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 100, rotateX: 15 }}
              className="bg-white rounded-[60px] p-12 lg:p-24 max-w-5xl w-full shadow-2xl relative z-10 overflow-hidden border border-neutral-200"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EA580C]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 relative gap-8">
                <div>
                   <span className="text-[#EA580C] font-black uppercase tracking-[1em] text-[10px] block mb-4">Protocol Alpha</span>
                   <h3 className="text-7xl font-black tracking-tighter uppercase italic leading-none">
                     Assign <br /><span className="text-[#EA580C] not-italic">Operator.</span>
                   </h3>
                </div>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="group flex items-center gap-4 bg-neutral-100 px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Close <X size={16} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="relative">
                <AssignCourier 
                  order={selectedOrder}
                  onClose={() => setShowAssignModal(false)}
                  onAssignComplete={handleAssignComplete}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* REUSABLE STAT CARD */
const StatCard = ({ label, value, icon, trend, color, pulse, total }) => {
  const themes = {
    black: "bg-[#0A0A0A] text-white shadow-[0_40px_60px_-15px_rgba(0,0,0,0.3)]",
    orange: "bg-[#EA580C] text-white shadow-[0_40px_60px_-15px_rgba(234,88,12,0.3)]",
    white: "bg-white text-black border border-neutral-100 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.03)]"
  };

  return (
    <motion.div 
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`${themes[color]} p-12 rounded-[50px] relative overflow-hidden group h-[300px] flex flex-col justify-between`}
    >
      <div className={`absolute -right-6 -top-6 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-125`}>
        {icon}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <span className={`w-8 h-[1px] ${color === 'white' ? 'bg-[#EA580C]' : 'bg-white/40'}`}></span>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
            {label}
          </span>
        </div>
        <h3 className="text-6xl font-black tracking-tighter italic uppercase leading-none">
          {value}
        </h3>
      </div>

      <div className="flex items-center justify-between mt-8 relative z-10">
        <div className="flex items-center gap-3">
          {pulse ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest">Live</span>
            </div>
          ) : (
            <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">{trend}</span>
          )}
        </div>
        {total && (
          <span className="text-[9px] font-black uppercase bg-white/10 px-3 py-1 rounded-md">
            Deploy: {total}
          </span>
        )}
      </div>
    </motion.div>
  );
};

// THIS IS THE LINE THAT FIXES YOUR ERROR
export default AdminDashboard;