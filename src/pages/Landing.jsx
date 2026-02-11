import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-brand-white text-brand-grayDark scroll-smooth">
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed w-full top-0 left-0 z-50 transition-shadow ${
          scrolled ? "shadow-md bg-brand-white" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <h1 className="font-bold text-2xl text-brand-orange">Deliveroo</h1>
          </Link>

          {/* Nav Links */}
          <div className="space-x-6 hidden md:flex font-semibold">
            <Link
              to="/login?role=customer"
              className="border border-brand-grayDark px-4 py-2 rounded-lg hover:bg-brand-grayDark hover:text-white transition"
            >
              Customer Login
            </Link>
            <Link
              to="/register?role=customer"
              className="bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-white px-6 py-32">
        <div className="text-center max-w-5xl">
          <p className="text-lg font-semibold mb-2 text-brand-grayDark">
            Your Parcels,
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Delivered <span className="text-brand-orange">Fast</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-700">
            Send and receive parcels across the city with real-time tracking,
            professional couriers, and guaranteed delivery times.
          </p>

          {/* Auth CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Link to="/register?role=customer">
              <button className="bg-brand-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition w-full sm:w-auto">
                Customer Register
              </button>
            </Link>
            <Link to="/register?role=courier">
              <button className="border border-brand-grayDark px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition w-full sm:w-auto">
                Become a Courier
              </button>
            </Link>
          </div>

          {/* Login Options */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              to="/login?role=customer"
              className="text-brand-orange font-semibold hover:underline px-4 py-2"
            >
              Customer Login
            </Link>
            <Link
              to="/login?role=courier"
              className="text-brand-orange font-semibold hover:underline px-4 py-2"
            >
              Courier Login
            </Link>
            <Link
              to="/login?role=admin"
              className="text-brand-orange font-semibold hover:underline px-4 py-2"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-5xl mt-10">
          <Stat value="50K+" label="Deliveries" />
          <Stat value="10K+" label="Active Users" />
          <Stat value="500+" label="Couriers" />
          <Stat value="4.8 ★" label="Rating" />
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section
        id="why"
        className="bg-brand-cream py-20 text-center max-w-7xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-14">Why Choose Deliveroo?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            title="Fast Delivery"
            description="Parcels delivered in hours, not days."
          />
          <Feature
            title="Secure Parcels"
            description="Handled with care and insured."
          />
          <Feature
            title="Live Tracking"
            description="Track your delivery in real-time."
          />
          <Feature
            title="Affordable Pricing"
            description="Pay only for what you send."
          />
          <Feature
            title="Earn as Courier"
            description="Join our courier network and earn."
          />
          <Feature
            title="24/7 Support"
            description="Always available to help you."
          />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-20 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-14">How it Works</h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">
          <Step
            number="1"
            title="Create Order"
            description="Enter pickup & destination."
          />
          <Step
            number="2"
            title="Courier Assigned"
            description="System finds nearest courier."
          />
          <Step
            number="3"
            title="Track Live"
            description="GPS tracking in real-time."
          />
          <Step
            number="4"
            title="Delivered"
            description="Parcel safely delivered & rated."
          />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-brand-gold py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get Started?</h2>
        <p className="mb-8">Join thousands of users who trust Deliveroo.</p>
        <Link to="/register?role=customer">
          <button className="bg-brand-black text-white px-10 py-4 rounded-lg font-semibold">
            Create Free Account
          </button>
        </Link>
      </section>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Stat = ({ value, label }) => (
  <div className="bg-brand-cream rounded-xl p-8 text-center shadow hover:scale-105 transition-transform">
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className="text-sm font-medium">{label}</p>
  </div>
);

const Feature = ({ title, description }) => (
  <div className="bg-brand-gold p-8 rounded-xl shadow font-semibold text-center hover:shadow-lg transition">
    <h3 className="text-xl mb-2">{title}</h3>
    <p className="text-sm font-normal">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="space-y-4">
    <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-brand-orange font-bold text-white text-lg">
      {number}
    </div>
    <p className="font-semibold">{title}</p>
    {description && <p className="text-sm">{description}</p>}
  </div>
);

export default Landing;
