import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure you create this CSS file in the same folder

export default function Navbar() {
  return (
    <nav className="luxury-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">DELIVEROO<span className="gold">.</span></Link>
        
        <div className="nav-links">
          {/* User Links */}
          <Link to="/orders/new">Ship Parcel</Link>
          <Link to="/orders">My Deliveries</Link>
          
          {/* Courier/Rider Link */}
          <Link to="/courier/assigned" className="rider-portal">Rider Portal</Link>
          
          <div className="user-profile-circle">SN</div>
        </div>
      </div>
    </nav>
  );
}