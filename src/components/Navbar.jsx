import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  Package,
  ChevronDown,
  UserCircle,
  Zap,
} from "lucide-react";

const Navbar = () => {
  const { user, isCustomer, isCourier, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isAdmin) return null;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-5">
          {/* Logo - Minimalist Yellow & Black */}
          <Link
            to="/"
            className="text-xl font-black text-black flex items-center gap-2 tracking-tighter uppercase"
          >
            <div className="bg-yellow-400 p-1.5 rounded-lg text-black">
              <Zap size={20} fill="currentColor" />
            </div>
            Deliveroo
          </Link>

          <div className="flex items-center gap-8">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-6">
                  {isCustomer && (
                    <Link
                      to="/create-order"
                      className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg shadow-black/5"
                    >
                      <Package size={14} /> New Order
                    </Link>
                  )}

                  {isCourier && (
                    <Link
                      to="/courier/orders"
                      className="bg-yellow-400 text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10"
                    >
                      Scanner Dashboard
                    </Link>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-gray-100"
                  >
                    <div className="w-9 h-9 bg-black text-yellow-400 rounded-full flex items-center justify-center font-black text-sm border-2 border-yellow-400/20">
                      {user.full_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-black text-sm hidden sm:block uppercase tracking-tight">
                      {user.full_name}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 py-3 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-5 py-3 border-b border-gray-50 mb-2">
                        <p className="text-xs font-black text-black uppercase tracking-widest">
                          {user.full_name}
                        </p>
                        <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-[0.2em] mt-1 italic">
                          {user.role}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-5 py-2.5 text-gray-600 hover:bg-yellow-400/10 hover:text-black font-bold text-xs uppercase tracking-widest transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserCircle size={16} /> Profile
                      </Link>

                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-5 py-2.5 text-gray-600 hover:bg-yellow-400/10 hover:text-black font-bold text-xs uppercase tracking-widest transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Package size={16} /> My Orders
                      </Link>

                      <div className="border-t border-gray-50 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-3 px-5 py-2.5 text-red-500 hover:bg-red-50 font-bold text-xs uppercase tracking-widest transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-black hover:text-yellow-500 text-xs font-black uppercase tracking-[0.2em] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-400/10"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
