import { useState } from "react";
import { Link, useLocation, Navigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  User,
  LogOut,
  Menu,
  X,
  Truck,
} from "lucide-react";

const CourierLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const navItems = [
    { path: "/courier/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/courier/orders", icon: Package, label: "My Deliveries" },
    { path: "/courier/profile", icon: User, label: "Profile" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out border-r border-gray-100 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100 flex-shrink-0">
            <Link
              to="/courier/dashboard"
              className="text-xl font-black text-black flex items-center gap-2 tracking-tighter uppercase"
            >
              <div className="bg-yellow-400 p-1.5 rounded-lg text-black">
                <Truck size={18} fill="currentColor" />
              </div>
              Deliveroo
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400/10 text-yellow-600 font-bold"
                      : "text-gray-500 hover:bg-gray-50 hover:text-black font-medium"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs uppercase tracking-wider">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
            >
              <LogOut size={20} />
              <span className="text-xs uppercase tracking-wider">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64 transition-all duration-300">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm h-16 flex items-center px-4 flex-shrink-0 sticky top-0 z-10 border-b border-gray-100">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-black"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-black text-black uppercase tracking-tight text-sm">
            {navItems.find((i) => i.path === location.pathname)?.label ||
              "Courier"}
          </span>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CourierLayout;
