import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin/dashboard";
    if (user.role === "courier") return "/courier/dashboard";
    return "/customer/dashboard";
  };

  const getInitial = () => {
    if (!user) return "?";
    const name = user.full_name || user.name || "User";
    return name[0].toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 px-[5%] py-4 flex justify-between items-center">
      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform duration-300"
      >
        DELIVEROO<span className="text-yellow-500">.</span>
      </Link>

      <div className="flex items-center gap-4">
        {/* Show navigation links only for authenticated users */}
        {user ? (
          <>
            {/* Customer Links */}
            {user.role === "customer" && (
              <>
                <Link
                  to="/customer/orders"
                  className="text-sm font-semibold text-gray-600 hover:text-brand-orange transition"
                >
                  My Orders
                </Link>
                <Link
                  to="/customer/orders/new"
                  className="bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  New Order
                </Link>
              </>
            )}

            {/* Courier Links */}
            {user.role === "courier" && (
              <Link
                to="/courier/dashboard"
                className="text-sm font-semibold text-gray-600 hover:text-brand-orange transition"
              >
                My Deliveries
              </Link>
            )}

            {/* Admin Links */}
            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="text-sm font-semibold text-gray-600 hover:text-brand-orange transition"
              >
                Admin Panel
              </Link>
            )}

            {/* Account Dropdown */}
            <div className="relative flex items-center gap-3 pl-6 border-l border-gray-100">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="w-9 h-9 bg-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:bg-yellow-500 transition-all shadow-md">
                  {getInitial()}
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-4 w-56 bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[30px] py-4 overflow-hidden">
                  <div className="px-6 py-2">
                    <p className="text-sm font-semibold">
                      {user.full_name || user.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>

                  <hr className="my-2 border-gray-50" />

                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-semibold text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-6 py-3 text-sm font-semibold text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>

                  <hr className="my-2 border-gray-50" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-6 py-3 text-sm font-semibold text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Show login button for unauthenticated users */
          <Link
            to="/login"
            className="border border-brand-grayDark px-4 py-2 rounded-lg font-semibold hover:bg-brand-grayDark hover:text-white transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
