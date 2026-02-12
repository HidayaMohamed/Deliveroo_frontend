import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Phone, ShieldCheck, Mail,
  MessageCircle, Star, TrendingUp, Calendar, 
  Zap, Bell, Lock, Fuel, Map,
  Clock, Award, BarChart3, ChevronRight,
  Wallet, Smartphone
} from "lucide-react";

export default function RiderProfile() {
  const navigate = useNavigate();
  
  const [riderData] = useState({
    name: "Derrick 'Flash' Omondi",
    id: "RID-8821",
    email: "flash.omondi@deliveroo.ke",
    phone: "+254 712 345 678",
    rating: 4.9,
    tripsTotal: 1248,
    tripsThisMonth: 142,
    todayEarnings: 4250,
    walletBalance: 12840,
    rank: "Elite Gold",
    memberSince: "Jan 2025"
  });

  const openWhatsApp = () => {
    const msg = encodeURIComponent(`Rider Support, this is ${riderData.name} (${riderData.id}). I need assistance.`);
    window.open(`https://wa.me/254700123456?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] py-12 px-[5%] font-sans selection:bg-yellow-200">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: RIDER IDENTITY */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-6 w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-slate-900 rounded-[32px] flex items-center justify-center text-yellow-400 text-4xl font-black shadow-2xl relative border-4 border-white"
            >
              {riderData.name[0]}
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <Zap size={14} className="text-black" fill="currentColor" />
              </div>
            </motion.div>
            
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic uppercase">
                  Rider<span className="text-yellow-500">Core</span>
                </h1>
                <span className="px-4 py-1 bg-slate-900 text-yellow-400 text-[10px] font-black rounded-full tracking-widest uppercase shadow-lg">
                  {riderData.rank}
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-400 mt-2">
                Operator ID: <span className="text-slate-900 font-black">{riderData.id}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="px-8 py-4 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
               <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">On Duty</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* PERFORMANCE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Daily Revenue", val: `KES ${riderData.todayEarnings}`, sub: "+12% vs Yesterday", icon: <Wallet className="text-emerald-500" />, color: "emerald" },
                { label: "Trip Success", val: "99.2%", sub: "Top 5% in Region", icon: <TrendingUp className="text-blue-500" />, color: "blue" },
                { label: "Trust Score", val: riderData.rating, sub: "Elite Rating", icon: <Star className="text-yellow-500" fill="currentColor" />, color: "yellow" }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  whileHover={{ y: -5 }} 
                  className={`${stat.color === 'yellow' ? 'bg-white border-slate-100' : 'bg-slate-900 border-transparent'} p-8 rounded-[40px] shadow-sm border`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`${stat.color === 'yellow' ? 'bg-slate-50' : 'bg-white/10'} p-3 rounded-xl`}>{stat.icon}</div>
                    <BarChart3 size={16} className={stat.color === 'yellow' ? "text-slate-200" : "text-white/20"} />
                  </div>
                  <p className={`text-4xl font-black italic tracking-tighter ${stat.color === 'yellow' ? 'text-slate-900' : 'text-white'}`}>{stat.val}</p>
                  <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${stat.color === 'yellow' ? 'text-slate-400' : 'text-white/40'}`}>{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* CONTACT & REGISTRY CARD */}
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-8 italic">Operator Credentials</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-slate-50 rounded-2xl text-slate-900 shadow-inner"><User size={20}/></div>
                      <div>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Full Name</p>
                        <p className="text-sm font-black text-slate-900">{riderData.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-slate-50 rounded-2xl text-slate-900 shadow-inner"><Mail size={20}/></div>
                      <div>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Official Email</p>
                        <p className="text-sm font-black text-slate-900">{riderData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-slate-50 rounded-2xl text-slate-900 shadow-inner"><Smartphone size={20}/></div>
                      <div>
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Phone Number</p>
                        <p className="text-sm font-black text-slate-900">{riderData.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-[40px] p-8 flex flex-col justify-center border border-slate-100 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="text-yellow-500" size={24} />
                        <p className="text-xs font-black uppercase tracking-widest italic text-yellow-500">Fleet Verified</p>
                      </div>
                      <p className="text-sm font-bold text-slate-400 leading-relaxed italic">
                        Account verified for <span className="text-white">Commercial Logistics</span> in Nairobi County.
                      </p>
                    </div>
                    <Lock className="absolute -bottom-4 -right-4 text-white/5" size={120} />
                  </div>
               </div>
            </div>

            {/* ACTION BANNER */}
            <motion.div 
              className="bg-yellow-400 p-10 rounded-[50px] flex flex-col md:flex-row items-center gap-8 justify-between shadow-2xl shadow-yellow-400/20"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-2xl">
                    <Map className="text-yellow-400" size={28} />
                </div>
                <div>
                    <h3 className="text-3xl font-black tracking-tighter italic uppercase leading-none">Enter Shift</h3>
                    <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest mt-2">Activate GPS tracking & Mission Feed</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#fff" }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => navigate("/courier/dashboard")} 
                className="px-10 py-5 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all"
              >
                Go Online
              </motion.button>
            </motion.div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* WALLET DISPLAY */}
            <div className="bg-slate-900 p-10 rounded-[50px] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full blur-[80px] opacity-10" />
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Balance</p>
               <h4 className="text-5xl font-black text-white tracking-tighter italic">
                  <span className="text-yellow-400 text-xl mr-2">KES</span>{riderData.walletBalance.toLocaleString()}
               </h4>
            </div>

            {/* SUPPORT HUB */}
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-slate-100">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 mb-8 italic">Support Node</h3>
                <div className="space-y-4">
                  <button 
                    onClick={openWhatsApp} 
                    className="w-full flex items-center justify-center gap-4 py-5 bg-[#25D366]/10 text-[#25D366] rounded-[25px] font-black uppercase text-[10px] tracking-widest hover:bg-[#25D366]/20 transition-all"
                  >
                    <MessageCircle size={18} fill="currentColor" /> Rider WhatsApp
                  </button>
                  <button className="w-full py-5 bg-slate-50 text-slate-400 rounded-[25px] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                    <ShieldCheck size={18} /> Insurance Docs
                  </button>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
