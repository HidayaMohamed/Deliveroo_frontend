import { useState } from "react";
import { TrendingUp, MapPin, BarChart3, Star, ChevronRight } from "lucide-react";


const Dashboard = ({ stats, showDetailedAnalytics = false }) => {
  const [performanceData] = useState({
    deliverySuccess: 98.5,
    customerSatisfaction: 4.8,
    avgResponseTime: 12,
    peakHours: "12:00 PM - 2:00 PM",
  });
  const [timeRange, setTimeRange] = useState("daily");

  // Simple static chart data so detailed view always renders without errors
  const chartData = {
    daily: [
      { label: "Mon", value: 12 },
      { label: "Tue", value: 18 },
      { label: "Wed", value: 9 },
      { label: "Thu", value: 20 },
      { label: "Fri", value: 15 },
    ],
    weekly: [
      { label: "Week 1", value: 120 },
      { label: "Week 2", value: 180 },
      { label: "Week 3", value: 160 },
      { label: "Week 4", value: 210 },
    ],
    performance: [
      {
        name: "Courier A",
        deliveries: 45,
        avgTime: 18,
        rating: 4.8,
        isActive: true,
      },
      {
        name: "Courier B",
        deliveries: 38,
        avgTime: 22,
        rating: 4.6,
        isActive: false,
      },
    ],
  };

  const renderSimpleChart = (data, label) => {
    if (!data || data.length === 0) return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-stone-200 rounded-2xl text-stone-400 text-sm uppercase tracking-[0.2em] font-bold">
        Data Stream Offline
      </div>
    );
    
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="py-6">
        <h4 className="text-sm font-black uppercase tracking-[0.25em] text-stone-400 mb-10 border-b border-stone-100 pb-4">{label}</h4>
        <div className="flex items-end gap-4 h-64 px-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 group relative">
              <div 
                className="w-full bg-stone-900 group-hover:bg-amber-500 transition-all duration-500 rounded-t-md relative" 
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-black text-stone-900 bg-amber-400 px-2 py-1 rounded shadow-xl">
                  {item.value}
                </div>
              </div>
              <div className="mt-5 text-[11px] font-black text-stone-500 uppercase text-center tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-16 py-4">
      {!showDetailedAnalytics ? (
        /* --- ENHANCED OVERVIEW MODE --- */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LOGISTICS COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-stone-400 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-amber-500" /> Live Terminal
            </h3>
            <div className="space-y-6">
              {[
                { label: 'New Orders', val: stats.totalOrders, sub: 'Today', icon: <TrendingUp size={20}/> },
                { label: 'In Delivery', val: stats.activeDeliveries, sub: 'Active', icon: <MapPin size={20}/> },
                { label: 'Completed', val: stats.completedOrders || 0, sub: 'Finalized', icon: <BarChart3 size={20}/> }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-8 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="text-amber-600 bg-amber-50 p-3 rounded-xl">{item.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.15em] mb-1">{item.label}</p>
                      <p className="text-3xl font-black text-stone-900 tracking-tighter leading-none">{item.val}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-stone-200" />
                </div>
              ))}
            </div>
          </div>

          {/* CENTRAL FLEET CARD */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-stone-400 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-stone-900" /> Fleet Status
            </h3>
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-stone-900 rounded-[40px] text-white p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full -mr-32 -mt-32 opacity-20" />
              
              <div className="space-y-12 text-center relative z-10 w-full">
                <div>
                  <div className="text-7xl font-black text-amber-500 mb-2 tracking-tighter">{stats.activeCouriers}</div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-400 font-bold">Active Personnel</p>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
                <div>
                  <div className="text-5xl font-black text-stone-200 mb-2 tracking-tighter">{stats.totalCouriers - stats.activeCouriers}</div>
                  <p className="text-sm uppercase tracking-[0.3em] text-stone-500 font-bold">In Reserve</p>
                </div>
              </div>
            </div>
          </div>

          {/* EFFICIENCY COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-stone-400 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-stone-200" /> Performance
            </h3>
            <div className="grid grid-cols-1 gap-6">
               <BigStatBar label="Avg Delivery Time" value={`${stats.avgDeliveryTime}m`} />
               <BigStatBar label="Success Rate" value={`${stats.successRate || 95}%`} color="text-emerald-600" />
               <BigStatBar label="Satisfaction" value={`${stats.satisfaction || 4.5}/5`} icon={<Star size={16} fill="currentColor" className="text-amber-500" />} />
            </div>
          </div>
        </div>
      ) : (
        /* --- DETAILED ANALYTICS MODE --- */
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-stone-200 pb-10">
            <div>
              <h3 className="text-4xl font-black text-stone-900 tracking-tight">Intelligence Report</h3>
              <p className="text-sm text-stone-400 uppercase tracking-[0.4em] font-bold mt-2 italic">Metrics Overview</p>
            </div>
            
            <div className="inline-flex bg-stone-100 p-2 rounded-2xl border border-stone-200 shadow-inner">
              {['daily', 'weekly', 'monthly'].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-10 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300
                  ${timeRange === r ? 'bg-stone-900 text-white shadow-lg shadow-stone-300' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
              {renderSimpleChart(chartData.daily, `${timeRange} Order volume`)}
            </div>
            <div className="bg-white p-10 rounded-3xl border border-stone-100 shadow-sm">
              {renderSimpleChart(chartData.weekly, 'Revenue Intelligence')}
            </div>
          </div>

          {/* TABLE SECTION */}
          <div className="bg-white rounded-[40px] border border-stone-200 shadow-2xl overflow-hidden">
            <div className="px-10 py-8 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-lg font-black uppercase tracking-[0.2em] text-stone-900">Personnel Performance Index</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 bg-stone-50/50">
                    <th className="px-10 py-6">Operator</th>
                    <th className="px-10 py-6">Units Dispatched</th>
                    <th className="px-10 py-6">Average Latency</th>
                    <th className="px-10 py-6">Merit Rating</th>
                    <th className="px-10 py-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {chartData.performance?.map((courier, index) => (
                    <tr key={index} className="hover:bg-stone-50/50 transition-colors group">
                      <td className="px-10 py-8 text-lg font-bold text-stone-900">{courier.name}</td>
                      <td className="px-10 py-8 text-lg text-stone-600 font-mono tracking-tighter">{courier.deliveries}</td>
                      <td className="px-10 py-8 text-lg text-stone-600 italic">{courier.avgTime} min</td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-2 text-stone-900 font-black text-lg">
                           <Star size={18} fill="#f59e0b" className="text-amber-500" /> {courier.rating}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${courier.isActive ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-stone-100 text-stone-400'}`}>
                          {courier.isActive ? 'Optimal' : 'Offline'}
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

/* Higher-legibility Stat Bar */
const BigStatBar = ({ label, value, color = "text-stone-900", icon }) => (
  <div className="p-8 bg-stone-50 border border-stone-200 rounded-3xl flex justify-between items-center hover:bg-white transition-all shadow-sm">
    <div>
      <span className="text-xs font-black text-stone-400 uppercase tracking-[0.2em] block mb-2">{label}</span>
      <div className="flex items-center gap-3">
        {icon}
        <span className={`text-3xl font-black tracking-tighter ${color}`}>{value}</span>
      </div>
    </div>
  </div>
);

export default Dashboard;