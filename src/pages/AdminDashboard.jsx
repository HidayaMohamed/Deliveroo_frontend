import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Truck, Users, TrendingUp, Clock, X, Globe, 
  ShieldCheck, Zap, Database, Activity, Monitor
} from 'lucide-react';
import AllOrders from '../features/admin/AllOrders';
import AssignCourier from '../features/admin/AssignCourier';
import Dashboard from '../features/admin/Dashboard';
import { getAdminStats } from '../api/admin';

const AdminDashboard = () => {
  const [view, setView] = useState('overview');
  const [stats, setStats] = useState({
    totalOrders: 0, activeDeliveries: 0, totalCouriers: 0, 
    activeCouriers: 0, revenue: 0, avgDeliveryTime: 0
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const refreshStats = async () => {
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    const timeout = setTimeout(refreshStats, 0);
    const interval = setInterval(refreshStats, 60000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 pb-24 font-sans selection:bg-amber-100">
      
      {/* EXECUTIVE TOP ACCENT LINE */}
      <div className="h-2 w-full bg-stone-100">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: "100%" }} 
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-full bg-amber-500" 
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 pt-16">
        
        {/* LARGE FORMAT HEADER */}
        <header className="mb-20 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-stone-900 rounded-lg">
                <Database size={18} className="text-amber-400" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-stone-400">
                DELIVEROO // GLOBAL OPERATIONS
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-stone-900 uppercase">
              Admin <span className="text-amber-500 italic">Dashboard.</span>
            </h1>
          </div>

          <div className="flex items-center gap-8 bg-white p-8 rounded-[32px] border border-stone-200 shadow-2xl shadow-stone-200/40">
             <div className="text-right border-r border-stone-100 pr-8">
                <p className="text-xs text-stone-400 uppercase font-black tracking-widest mb-1">Network Integrity</p>
                <p className="text-xl font-black text-emerald-600 flex items-center justify-end gap-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  STABLE
                </p>
             </div>
             <ShieldCheck size={40} className="text-stone-900" />
          </div>
        </header>

        {/* HERO STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
          <StatCard icon={<Globe size={24}/>} label="Global Nodes" value={stats.totalOrders} trend="+4.1%" />
          <StatCard icon={<Truck size={24}/>} label="In Transit" value={stats.activeDeliveries} active />
          <StatCard icon={<Users size={24}/>} label="Fleet Size" value={stats.activeCouriers} />
          <StatCard icon={<Zap size={24}/>} label="Latency" value="18ms" />
          <StatCard icon={<TrendingUp size={24}/>} label="Net Yield" value={`$${(stats.revenue/1000).toFixed(1)}k`} trend="+14%" />
          <StatCard icon={<Clock size={24}/>} label="Avg Delay" value={`${stats.avgDeliveryTime}m`} />
        </div>

        {/* PREMIUM NAVIGATION */}
        <div className="mb-12 border-b-2 border-stone-100">
          <nav className="flex gap-16">
            {['overview', 'orders', 'analytics'].map((t) => (
              <button
                key={t}
                onClick={() => setView(t)}
                className={`pb-6 text-lg font-black uppercase tracking-[0.3em] transition-all relative
                ${view === t ? 'text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
              >
                {t}
                {view === t && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-[-2px] left-0 right-0 h-1 bg-amber-500" 
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* MAIN CANVAS */}
        <motion.main 
          key={view}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[48px] border border-stone-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <div className="p-10 md:p-20">
            {view === 'overview' && <Dashboard stats={stats} />}
            {view === 'orders' && <AllOrders onAssignCourier={(o) => { setSelectedOrder(o); setShowAssignModal(true); }} />}
            {view === 'analytics' && <Dashboard stats={stats} showDetailedAnalytics={true} />}
          </div>
        </motion.main>
      </div>

      {/* REFINED MODAL */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAssignModal(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-stone-200 rounded-[40px] w-full max-w-4xl relative z-10 shadow-[0_100px_150px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              <div className="px-12 py-10 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
                <h3 className="text-4xl font-black uppercase tracking-tighter italic text-stone-900">
                  Assign <span className="text-amber-500">Personnel.</span>
                </h3>
                <button 
                  onClick={() => setShowAssignModal(false)} 
                  className="p-3 hover:bg-white hover:shadow-md rounded-full transition-all text-stone-300 hover:text-stone-900"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="p-12">
                <AssignCourier order={selectedOrder} onClose={() => setShowAssignModal(false)} onAssignComplete={() => {setShowAssignModal(false); refreshStats();}} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* STAT CARD COMPONENT */
const StatCard = ({ icon, label, value, trend, active }) => (
  <div className={`bg-white border p-8 rounded-[32px] transition-all duration-500 group hover:-translate-y-2
    ${active ? 'border-amber-500 shadow-xl shadow-amber-500/10' : 'border-stone-100 hover:border-stone-300 shadow-sm'}`}>
    <div className="flex justify-between items-start mb-8">
      <div className={`p-4 rounded-2xl transition-colors ${active ? 'bg-amber-500 text-white' : 'bg-stone-50 text-stone-400 group-hover:bg-stone-900 group-hover:text-white'}`}>
        {icon}
      </div>
      {trend && (
        <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          {trend}
        </span>
      )}
    </div>
    <p className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] mb-2">{label}</p>
    <h4 className="text-4xl font-black text-stone-900 tracking-tighter">{value}</h4>
  </div>
);

export default AdminDashboard;