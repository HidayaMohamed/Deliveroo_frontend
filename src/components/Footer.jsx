import "./Footer.css"; 

export default function Footer() {
  return (
    <footer className="magnificent-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>DELIVEROO<span>.</span></h3>
          <p>The Gold Standard in Logistics.</p>
        </div>
        <div className="footer-links">
          <span>Support</span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 Deliveroo Premium. All rights reserved.
      </div>
    </footer>
  );
}