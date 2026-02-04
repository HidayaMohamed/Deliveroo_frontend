import { Link } from "react-router-dom";

export default function RiderPortal() {
  const rider = {
    name: "John Doe",
    status: "On Duty",
    vehicle: "Express Motorbike",
    vehicleReg: "KDH 123X",
    rating: 4.9,
    todayEarnings: 4200,
    activeOrder: { id: "ORD-9901", from: "Kilimani", to: "Westlands", deadline: "14:20" }
  };

  // Luxury Gold Accent Color
  const gold = "text-amber-500";
  const goldBg = "bg-amber-500";

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <div className="max-w-[1000px] mx-auto">
        
        {/* 1. Slim Header */}
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-5">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${goldBg} rounded-full text-black flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(245,158,11,0.4)]`}>
              JD
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{rider.name}</h1>
              <span className="text-xs text-green-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="text-[8px]">●</span> {rider.status}
              </span>
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/50 px-4 py-2 rounded-full text-right">
            <small className="block text-[10px] uppercase font-bold text-amber-500/70">Today</small>
            <span className="font-black text-amber-500 tracking-tighter">KSh {rider.todayEarnings}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* 2. Compact Vehicle Section */}
          <section className="bg-[#141414] rounded-2xl p-5 border border-white/5 hover:border-amber-500/30 transition-colors">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fleet Status</h3>
              <span className="text-[10px] px-2 py-1 bg-white/10 rounded font-mono">{rider.vehicleReg}</span>
            </div>
            <div className="w-full h-[140px] rounded-xl overflow-hidden my-4 relative border border-white/5">
              <img src="https://images.pexels.com/photos/16100083/pexels-photo-16100083.jpeg" 
                   alt="Vehicle" 
                   className="w-full h-full object-cover brightness-75" />
            </div>
            <p className="text-sm font-semibold text-slate-200">{rider.vehicle}</p>
          </section>

          {/* 3. Tactical Map Section */}
          <section className="bg-[#141414] rounded-2xl p-5 border-2 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest">Active Route</h3>
              <span className="text-[10px] px-2 py-1 bg-amber-500/20 text-amber-500 rounded font-bold">ETA {rider.activeOrder.deadline}</span>
            </div>
            
            {/* Map Frame */}
            <div className="w-full h-[140px] rounded-xl overflow-hidden my-4 relative border border-white/5">
              <img src="https://images.pexels.com/photos/2800119/pexels-photo-2800119.jpeg" 
                   alt="Map" 
                   className="w-full h-full object-cover brightness-[0.4] contrast-125" />
              {/* Map Pins */}
              <div className="absolute inset-0 flex justify-around items-center">
                <div className="w-3 h-3 rounded-full border-2 border-white bg-amber-500 shadow-[0_0_10px_white]"></div>
                <div className="w-3 h-3 rounded-full border-2 border-white bg-blue-500 shadow-[0_0_10px_white]"></div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-bold mb-4 px-1">
              <span className="text-slate-200">{rider.activeOrder.from}</span>
              <span className="text-amber-500">→</span>
              <span className="text-slate-200">{rider.activeOrder.to}</span>
            </div>
            <Link to="/courier/tasks" className={`block w-full text-center py-3 ${goldBg} text-black rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform active:scale-95`}>
              Open Tasks
            </Link>
          </section>

          {/* 4. Score Card */}
          <section className="bg-[#141414] rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performance</h3>
            <div className="flex items-center gap-2 py-6">
              <span className="text-5xl font-black tracking-tighter">{rider.rating}</span>
              <span className="text-3xl text-amber-500">★</span>
            </div>
            <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
              Trip History
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}