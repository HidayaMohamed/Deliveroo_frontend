import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { User, LogOut, Package, PlusCircle } from "lucide-react"; // Classy icons

export default function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [initial, setInitial] = useState("S");

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Sharon"; 
    setInitial(name[0].toUpperCase());
    setDropdownOpen(false); 
  }, [location]);

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 px-[5%] py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform duration-300">
        DELIVEROO<span className="text-yellow-500">.</span>
      </Link>

      <div className="flex items-center gap-8">
        {/* 1. SHIP PARCEL */}
        <Link to="/orders/new" className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-100 active:scale-95">
          <PlusCircle size={14} /> Ship Parcel
        </Link>

        {/* 2. MY DELIVERIES */}
        <Link to="/orders" className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${location.pathname === '/orders' ? 'text-yellow-600' : 'text-gray-400 hover:text-black'}`}>
          <Package size={14} /> My Deliveries
        </Link>
        
        {/* ACCOUNT DROPDOWN */}
        <div className="relative flex items-center gap-3 pl-6 border-l border-gray-100">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-black group-hover:bg-yellow-500 transition-all shadow-md">
              {initial}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block group-hover:text-yellow-600 transition-colors">
              MY ACCOUNT
            </span>
          </button>

          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-4 w-56 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[30px] py-4 overflow-hidden">
              <Link to="/profile" className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-colors">
                <User size={14} /> View Profile
              </Link>
              
              <hr className="my-2 border-gray-50" />
              
              <button 
                onClick={() => { localStorage.clear(); window.location.href="/login"; }}
                className="w-full flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}