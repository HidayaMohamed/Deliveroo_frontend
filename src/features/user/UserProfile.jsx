import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, ShieldCheck, 
  MessageCircle, Star, TrendingUp, Calendar, 
  ArrowUpRight, Zap, Bell, Lock, Globe
} from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Member",
    email: "loading...",
    phone: "---",
    ordersThisMonth: 0,
    rating: 5.0,
    memberSince: "2026"
  });

  useEffect(() => {
    // DATA SYNC: Pulling from local storage or defaults
    const storedName = localStorage.getItem("userName") || "Valued Member";
    const storedPhone = localStorage.getItem("userPhone") || "+254 7-- --- ---";
    const storedEmail = localStorage.getItem("userEmail") || "hello@deliveroo.ke";
    const savedFleet = JSON.parse(localStorage.getItem("my_fleet") || "[]");
    
    setUserData({
      name: storedName,
      email: storedEmail,
      phone: storedPhone,
      ordersThisMonth: savedFleet.length, 
      rating: 5.0, 
      memberSince: "February 2026"
    });
  }, []);

  const openWhatsApp = () => {
    const message = `Hi Deliveroo Support, this is ${userData.name}. I'm reaching out from my Profile Portal.`;
    window.open(`https://wa.me/254700123456?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-[5%] selection:bg-yellow-200">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: IDENTITY & STATUS */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-8 w-full">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-28 h-28 bg-[#111] rounded-[40px] flex items-center justify-center text-yellow-500 text-5xl font-black shadow-2xl relative"
            >
              {userData.name[0]}
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                <ShieldCheck size={16} className="text-white" />
              </div>
            </motion.div>
            
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-6xl font-black tracking-tighter text-[#111] italic">
                  Logistician<span className="text-yellow-500">.</span>
                </h1>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400 mt-2">
                Active Session: <span className="text-black font-black">{userData.name}</span>
              </p>
            </div>
          </div>

          {/* VANTAGE SECURITY COMPONENT */}
          <div className="w-full lg:w-auto">
             <motion.div 
               animate={{ borderColor: ["#f3f4f6", "#eab308", "#f3f4f6"] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="flex items-center gap-6 px-10 py-5 bg-white border-2 rounded-[35px] shadow-sm cursor-default"
             >
               <div className="relative">
                 <Lock size={20} className="text-black" />
                 <motion.div 
                   animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute inset-0 bg-yellow-400 rounded-full -z-10"
                 />
               </div>
               <div>
                 <p className="text-[9px] font-black uppercase tracking-[0.3em] text-black">Vantage Shield Active</p>
                 <p className="text-[8px] font-bold uppercase text-gray-400 tracking-tighter">Verified Secure Portal Connection</p>
               </div>
             </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-10">
            {/* VITAL STATISTICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ y: -5 }} className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm group border-b-4 border-b-transparent hover:border-b-yellow-500 transition-all">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-yellow-400 transition-colors">
                     <TrendingUp size={24} className="text-gray-900"/>
                   </div>
                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Real-time Data</span>
                </div>
                <p className="text-6xl font-black tracking-tighter italic">{userData.ordersThisMonth}</p>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Shipments Dispatched</p>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-sm group border-b-4 border-b-transparent hover:border-b-yellow-500 transition-all">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-yellow-400 transition-colors">
                     <Star size={24} className="text-gray-900" fill="currentColor"/>
                   </div>
                   <Globe size={20} className="text-gray-200" />
                </div>
                <p className="text-6xl font-black tracking-tighter italic">{userData.rating.toFixed(1)}</p>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Trust Rating Score</p>
              </motion.div>
            </div>

            {/* CORE DETAILS CARD */}
            <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300 italic">User Credentials</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12">
                {[
                  { label: "Mobile Line", val: userData.phone, icon: <Phone size={14}/> },
                  { label: "Digital Mail", val: userData.email, icon: <Mail size={14}/> },
                  { label: "Fleet ID", val: "LGT-" + (2000 + userData.ordersThisMonth), icon: <Zap size={14}/> },
                  { label: "Registration", val: userData.memberSince, icon: <Calendar size={14}/> }
                ].map((item, i) => (
                  <div key={i} className="relative z-10">
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                      {item.icon} {item.label}
                    </p>
                    <p className="text-lg font-bold text-[#111]">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BANNER */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="bg-yellow-400 p-12 rounded-[60px] flex flex-col md:flex-row items-center gap-8 justify-between shadow-2xl shadow-yellow-400/20"
            >
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-2 italic uppercase">Dispatch New Parcel</h3>
                <p className="text-xs font-bold text-black/60 uppercase tracking-widest">Instant connection to our premium courier network.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => navigate("/orders/new")} 
                className="px-12 py-6 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 group"
              >
                Start Shipping <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
              </motion.button>
            </motion.div>
          </div>

          {/* SIDEBAR: HELP CENTER */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-10 italic">Intelligence Center</h3>
                <div className="space-y-6">
                  <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 text-center group hover:bg-black transition-all">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 italic">Priority Support Line</p>
                    <p className="text-2xl font-black tracking-tighter italic text-[#111] group-hover:text-white transition-colors">+254 700 123 456</p>
                  </div>
                  
                  <button 
                    onClick={openWhatsApp} 
                    className="w-full flex items-center justify-center gap-4 py-6 bg-[#25D366] text-white rounded-[30px] font-black uppercase text-[10px] tracking-[0.2em] hover:shadow-2xl hover:shadow-green-200 transition-all active:scale-95"
                  >
                    <MessageCircle size={20} fill="currentColor" /> Live WhatsApp
                  </button>

                  <button className="w-full flex items-center justify-center gap-4 py-6 bg-white border border-gray-100 text-black rounded-[30px] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-50 transition-all">
                    <Bell size={18} /> Update Logs
                  </button>

                  <p className="text-[8px] font-black text-center text-gray-300 uppercase tracking-[0.4em] leading-relaxed">
                    Account protected by <br /> Vantage crypto-shield v2.6
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
