import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, User, Bell, LogOut } from "lucide-react";
import { useAuth } from "../auth/useAuth";

export default function RiderNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full bg-slate-900 text-white px-[5%] py-4 flex items-center justify-between sticky top-0 z-[2000] border-b border-white/10 shadow-2xl">
      {/* Branding */}
      <div className="flex items-center gap-4">
        <Link to="/rider/profile" className="text-xl font-black italic tracking-tighter flex items-center gap-2">
          <div className="p-2 bg-yellow-400 rounded-lg">
            <Zap size={18} className="text-black" fill="currentColor" />
          </div>
          <span className="text-yellow-400">RIDER</span>
        </Link>
        <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
        <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
          Nairobi Sector-4
        </span>
      </div>

      {/* Rider Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="p-3 hover:bg-white/5 rounded-2xl relative text-slate-400 transition-all">
          <Bell size={18} />
          <span className="absolute top-3 right-3 w-2 h-2 bg-yellow-500 rounded-full border-2 border-slate-900" />
        </button>

        {/* Profile Link */}
        <Link 
          to="/rider/profile"
          className="flex items-center gap-3 pl-3 pr-5 py-2 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group"
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center text-black font-black text-xs">
            D
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[10px] font-black uppercase leading-none tracking-widest text-white">Derrick</p>
            <p className="text-[8px] font-bold text-slate-500 mt-1">4.9 ★ Elite</p>
          </div>
        </Link>

        {/* Sign out */}
        <button 
          onClick={handleSignOut}
          className="p-3 text-slate-500 hover:text-red-400 transition-colors"
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
}