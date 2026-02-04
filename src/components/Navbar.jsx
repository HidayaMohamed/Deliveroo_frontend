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
          {/* 1. Customer Navigation */}
          <Link to="/orders/new" className="nav-item">Ship Parcel</Link>
          <Link to="/orders" className="nav-item">My Deliveries</Link>
          
          {/* 2. Rider Portal Link */}
          <Link to="/rider-portal" className="rider-btn">
            Rider Portal
          </Link>
          
          {/* 3. Account Settings (Replaces Admin) */}
          <Link to="/profile" className="nav-profile-link" title="Account Settings">
            <div className="nav-profile-group">
              <div className="profile-text-wrapper">
                <span className="user-label">MY ACCOUNT</span>
                
              </div>
              <div className="status-indicator">
                <div className="status-dot"></div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}