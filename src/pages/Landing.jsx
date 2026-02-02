import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <header style={{ marginBottom: "4rem" }}>
        <h1>Deliveroo</h1>
      </header>

      <main style={{ maxWidth: "500px" }}>
        <h2>Fast & Reliable Parcel Delivery</h2>
        <p>
          Create delivery orders, track parcels in real time, and get your
          packages delivered safely.
        </p>

        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Create Account</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Landing;
