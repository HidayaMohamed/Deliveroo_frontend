import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  LogOut,
  Package,
  PlusCircle,
  Bell,
  X,
  BellOff,
} from "lucide-react";
import { useAuth } from "../features/auth/useAuth";

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [initial, setInitial] = useState("S");

  // State is now empty to reflect "no current notifications"
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem("userName") || user?.full_name || "User"; 
    setInitial(name[0].toUpperCase());
    setDropdownOpen(false); 
    setNotifOpen(false);
  }, [location, user]);

  return (
    <nav className="sticky top-0 z-[100] bg-white/70 backdrop-blur-md border-b border-gray-100/50 px-[5%] py-3 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity">
        DELIVEROO<span className="text-yellow-500">.</span>
      </Link>

      <div className="flex items-center gap-8">
        {/* 1. SHIP PARCEL */}
        <Link to="/orders/new" className="flex items-center gap-2 bg-[#111] text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-500 transition-all active:scale-95 shadow-sm">
          <PlusCircle size={14} strokeWidth={2.5} /> Ship Parcel
        </Link>

        {/* 2. MY DELIVERIES */}
        <Link
          to="/orders"
          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            location.pathname === "/orders"
              ? "text-black"
              : "text-gray-400 hover:text-black"
          }`}
        >
          <Package size={14} /> My Deliveries
        </Link>

        {/* 3. ADMIN CONSOLE (Option B: always visible entry point) */}
        <Link
          to="/admin/control-center"
          className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
            location.pathname.startsWith("/admin")
              ? "text-black"
              : "text-gray-400 hover:text-black"
          }`}
        >
          Admin
        </Link>

        {/* 4. FANCY NOTIFICATIONS */}
        <div className="relative">
          <button 
            onClick={() => { setNotifOpen(!notifOpen); setDropdownOpen(false); }}
            className={`group relative p-2.5 rounded-xl transition-all duration-300 ${notifOpen ? 'bg-gray-100 text-black' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
          >
            {/* The Bell Icon with a subtle tilt animation on hover */}
            <Bell 
              size={20} 
              strokeWidth={1.5} 
              className={`transition-transform duration-500 ${notifOpen ? 'scale-110' : 'group-hover:rotate-[15deg]'}`} 
            />
            
            {/* Elegant "Quiet" Indicator - Only shows a tiny dot if there were notifications */}
            {notifications.length > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-yellow-500 rounded-full border-2 border-white" />
            )}
          </button>

          {/* ELEGANT DROPDOWN */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-4 w-80 bg-white border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[32px] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
              <div className="px-7 py-5 flex justify-between items-center border-b border-gray-50">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900">Inbox</h3>
                <button 
                  onClick={() => setNotifOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
              
              <div className="min-h-[200px] flex flex-col items-center justify-center p-8 text-center">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className="w-full text-left py-3 border-b border-gray-50 last:border-0">
                        {/* Notification content mapping would go here */}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <BellOff size={20} className="text-gray-300" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-900 uppercase tracking-tight">All caught up</p>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium">No new notifications to show.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* ACCOUNT DROPDOWN */}
        <div className="relative flex items-center gap-3 pl-8 border-l border-gray-100">
          <button 
            onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 bg-[#111] text-white rounded-full flex items-center justify-center text-[10px] font-black transition-all group-hover:ring-4 group-hover:ring-gray-100 group-active:scale-90">
              {initial}
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-4 w-60 bg-white border border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-[28px] py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <Link to="/profile" className="flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-all">
                <User size={15} strokeWidth={2} /> View Profile
              </Link>
              <div className="mx-4 border-t border-gray-50" />
              <button 
                onClick={() => { localStorage.clear(); window.location.href="/login"; }}
                className="w-full flex items-center gap-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-500 hover:bg-red-50/50 transition-all"
              >
                <LogOut size={15} strokeWidth={2} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
