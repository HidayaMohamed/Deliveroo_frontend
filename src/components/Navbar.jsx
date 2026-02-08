import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [initial, setInitial] = useState("S");

  useEffect(() => {
    // Extract initial for the avatar
    const name = localStorage.getItem("userName") || "Sharon"; 
    setInitial(name[0].toUpperCase());
    setDropdownOpen(false); 
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-[5%] py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-black tracking-tighter">
        DELIVEROO<span className="text-yellow-500">.</span>
      </Link>

      <div className="flex items-center gap-8">
        {/* 1. SHIP PARCEL (Now First) */}
        <Link to="/create-order" className="bg-black text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-colors">
          Ship Parcel
        </Link>

        {/* 2. MY DELIVERIES (Now Second) */}
        <Link to="/orders" className={`text-[10px] font-black uppercase tracking-widest ${location.pathname === '/orders' ? 'text-yellow-600' : 'text-gray-400'} hover:text-black transition-colors`}>
          My Deliveries
        </Link>
        
        {/* ACCOUNT DROPDOWN */}
        <div className="relative flex items-center gap-3 pl-4 border-l border-gray-100">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black group-hover:bg-yellow-500 transition-colors">
              {initial}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block group-hover:text-yellow-600 transition-colors text-black">
              MY ACCOUNT
            </span>
          </button>

          {/* DROPDOWN MENU (Cleaned up) */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-4 w-48 bg-white border border-gray-100 shadow-2xl rounded-3xl py-4 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <Link to="/profile" className="block px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black hover:bg-gray-50">
                View Profile
              </Link>
              
              <hr className="my-2 border-gray-50" />
              
              <button 
                onClick={() => { localStorage.clear(); window.location.href="/login"; }}
                className="w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}