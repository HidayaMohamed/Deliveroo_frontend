import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinkClass = (path) => `
    text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300
    ${location.pathname === path ? 'text-yellow-500' : 'text-black'}
    hover:text-yellow-500 hover:-translate-y-0.5
  `;

  return (
    <nav className="h-20 bg-white border-b border-gray-100 flex items-center sticky top-0 z-[1000] shadow-sm">
      <div className="w-[92%] max-w-[1400px] mx-auto flex justify-between items-center">
        
        {/* Brand Identity */}
        <Link to="/" className="text-2xl font-black tracking-[0.2em] text-black">
          DELIVEROO<span className="text-yellow-500">.</span>
        </Link>
        
        <div className="flex items-center gap-12">
          {/* Customer Navigation Only */}
          <Link to="/orders/new" className={navLinkClass("/orders/new")}>
            Ship Parcel
          </Link>
          
          <Link to="/orders" className={navLinkClass("/orders")}>
            My Deliveries
          </Link>
          
          {/* Account Section */}
          <Link to="/profile" className="flex items-center gap-3 group border-l border-gray-100 pl-10">
            <span className={`text-[11px] font-black tracking-[0.2em] transition-colors duration-300 ${
              location.pathname === "/profile" ? 'text-yellow-500' : 'text-black'
            } group-hover:text-yellow-500`}>
              MY ACCOUNT
            </span>
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
          </Link>
        </div>
      </div>
    </nav>
  );
}