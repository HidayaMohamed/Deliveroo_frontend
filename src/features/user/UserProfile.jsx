import "./UserProfile.css";

export default function UserProfile() {
  const user = {
    name: "Sharon Njoroge",
    age: 24,
    idNumber: "38920110",
    email: "sharon.n@luxury.com",
    memberSince: "February 2026",
    rating: 4.98,
    points: 1250,
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" // High-end portrait
  };

  return (
    <div className="profile-container luxury-theme">
      <div className="profile-card-main">
        
        {/* Left Side: Identity Card */}
        <section className="identity-section">
          <div className="profile-photo-wrapper">
            <img src={user.img} alt="Sharon" className="main-profile-img" />
            <button className="btn-edit-photo">Update Photo</button>
          </div>
          <h1 className="profile-name">{user.name}</h1>
          <span className="premium-tag">Platinum Client</span>
        </section>

        {/* Right Side: Data & Settings */}
        <section className="details-section">
          <div className="details-grid">
            <div className="detail-item">
              <label>Official Identification</label>
              <p>ID: {user.idNumber}</p>
            </div>
            <div className="detail-item">
              <label>Age</label>
              <p>{user.age} Years</p>
            </div>
            <div className="detail-item">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
            <div className="detail-item">
              <label>Membership</label>
              <p>{user.memberSince}</p>
            </div>
          </div>

          <div className="performance-banner">
            <div className="banner-stat">
              <span>{user.rating} ★</span>
              <small>Trust Rating</small>
            </div>
            <div className="banner-stat">
              <span>{user.points}</span>
              <small>Available Points</small>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-save">Edit Information</button>
            <button className="btn-logout">Logout Account</button>
          </div>
        </section>

      </div>
    </div>
  );
}