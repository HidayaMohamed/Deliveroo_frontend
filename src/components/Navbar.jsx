import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="luxury-nav">
      <div className="nav-container">
        {/* Brand Identity */}
        <Link to="/" className="nav-logo">
          DELIVEROO<span className="gold">.</span>
        </Link>
        
        <div className="nav-links">
          {/* Main Navigation */}
          <Link to="/orders/new" className="nav-item">Ship Parcel</Link>
          <Link to="/orders" className="nav-item">My Deliveries</Link>
          
          {/* Action Button */}
          <Link to="/rider-portal" className="rider-btn">
            Rider Portal
          </Link>
          
          {/* Admin Toggle */}
          <div className="admin-shortcut">
            <Link to="/admin/dashboard" title="Admin View">My Account</Link>
          </div>

          {/* New Text-Based User Identity */}
          <div className="nav-profile-group">
            <div className="profile-text-wrapper">
              <span className="user-label">Premium.</span>
            
            </div>
            <div className="status-indicator">
              <div className="status-dot"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}