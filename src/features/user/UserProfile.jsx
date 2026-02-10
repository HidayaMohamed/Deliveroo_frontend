import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Package, Clock, ShieldCheck, Edit3, CreditCard, ChevronRight, Zap } from "lucide-react";

export default function UserProfile() {
  // Tomorrow's Backend Task: const { user } = useAuth();
  const user = {
    name: "Sharon Njoroge",
    email: "sharon.n@deliveroo.ke",
    phone: "+254 712 345 678",
    location: "Kileleshwa, Nairobi",
    memberSince: "March 2024",
    totalOrders: 142,
    activeShipments: 3
  };

  const handleEdit = () => alert("Connecting to Backend API tomorrow...");
  const handleTopUp = () => alert("Initiating M-Pesa STK Push...");

  return (
    <div className="min-h-screen bg-[#f8f5f0]/50 py-20 px-[5%]">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION - Back to Bold */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-black rounded-[40px] border-4 border-white shadow-2xl flex items-center justify-center text-yellow-500 text-5xl font-black italic"
          >
            {user.name[0]}
          </motion.div>
          
          <div className="text-center md:text-left">
            <h1 className="text-6xl font-black tracking-tighter italic text-[#2d2a26]">
              Profile Portal<span className="text-yellow-500">.</span>
            </h1>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 mt-2 flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck size={14} className="text-green-500" /> Verified Premium Member
            </p>
          </div>

          <button 
            onClick={handleEdit}
            className="md:ml-auto flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm active:scale-95"
          >
            <Edit3 size={14} /> Edit Profile
          </button>
        </div>

        {/* QUICK STATS - Brought back the Big Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: "Total Shipments", val: user.totalOrders, icon: <Package className="text-yellow-600" /> },
            { label: "Active Now", val: user.activeShipments, icon: <Zap className="text-yellow-600" fill="currentColor" /> },
            { label: "Reward Points", val: "4,250", icon: <CreditCard className="text-yellow-600" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[50px] border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.02)] hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6">{stat.icon}</div>
              <p className="text-4xl font-black tracking-tighter italic text-[#2d2a26]">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* MAIN DATA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-10">
            {/* ACCOUNT DETAILS CARD */}
            <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300 mb-10">Personal Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { label: "Full Name", val: user.name, icon: <User size={14}/> },
                  { label: "Email Address", val: user.email, icon: <Mail size={14}/> },
                  { label: "Phone Number", val: user.phone, icon: <Phone size={14}/> },
                  { label: "Home Base", val: user.location, icon: <MapPin size={14}/> }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-2">
                      {item.icon} {item.label}
                    </p>
                    <p className="text-lg font-bold text-[#2d2a26]">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY - Re-added for familiarity */}
            <div className="bg-white p-12 rounded-[60px] border border-gray-100 shadow-sm">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-300">Transit History</h3>
                  <button className="text-[9px] font-black uppercase text-yellow-600 border-b-2 border-yellow-500">View Archive</button>
               </div>
               <div className="space-y-4">
                  {[
                    { id: "#8842", route: "Westlands → Kilimani", status: "In Transit" },
                    { id: "#8839", route: "CBD → Karen", status: "Delivered" }
                  ].map((order, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 bg-gray-50 rounded-[30px] group hover:bg-yellow-50 transition-all">
                      <div className="flex items-center gap-6">
                        <span className="text-xs font-black text-gray-300">{order.id}</span>
                        <p className="text-sm font-black uppercase">{order.route}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-black text-white'}`}>
                          {order.status}
                        </span>
                        <ChevronRight size={16} className="text-gray-300" />
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* SIDEBAR - WALLET & HELPLINE */}
          <div className="space-y-8">
            <div className="bg-[#2d2a26] p-12 rounded-[60px] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tighter italic mb-4 text-yellow-500">Wallet Balance.</h3>
                <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 mb-8">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Available Credits</p>
                  <p className="text-4xl font-black italic">KES 2,400</p>
                </div>
                <button 
                  onClick={handleTopUp}
                  className="w-full py-5 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white transition-all active:scale-95"
                >
                  Top Up M-Pesa
                </button>
              </div>
            </div>

            {/* HELPLINE - Now with Number & Bold Style */}
            <div className="bg-yellow-500 p-10 rounded-[60px] shadow-xl shadow-yellow-500/20">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-yellow-500 shadow-lg">
                     <Phone size={18} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-black tracking-widest">Priority Helpline</p>
                    <p className="text-[8px] font-bold text-black/50 uppercase">Instant 24/7 Access</p>
                  </div>
               </div>
               
               <h4 className="text-2xl font-black tracking-tight text-black mb-8 italic">
                 +254 700 123 456
               </h4>
               
               <button className="w-full bg-black text-white py-4 rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-black/80 transition-all shadow-lg">
                  Speak to Agent
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}