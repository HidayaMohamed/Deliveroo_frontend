import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add shadow to navbar when scrolled
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
            <a href="#why" className="hover:text-brand-orange">
              Why Choose
            </a>
            <a href="#how" className="hover:text-brand-orange">
              How it Works
            </a>
            <a href="#testimonials" className="hover:text-brand-orange">
              Testimonials
            </a>
            <a href="#pricing" className="hover:text-brand-orange">
              Pricing
            </a>
            <Link
              to="/register?role=USER"
              className="bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-brand-grayDark px-4 py-2 rounded-lg font-semibold hover:bg-brand-grayDark hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div>
          <p className="text-lg font-semibold mb-2">Your Parcels,</p>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Delivered <span className="text-brand-orange">Fast</span>
          </h1>
          <p className="text-lg mb-8 max-w-xl">
            Send and receive parcels across the city with real-time tracking,
            professional couriers, and guaranteed delivery times.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link to="/register?role=USER">
              <button className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold">
                Get Started Free
              </button>
            </Link>
            <Link to="/register?role=COURIER">
              <button className="border border-brand-grayDark px-6 py-3 rounded-lg font-semibold">
                Become a Courier
              </button>
            </Link>
          </div>
        </div>

        {/* Right Stats */}
        <div className="grid grid-cols-2 gap-6">
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

      {/* ================= TESTIMONIALS ================= */}
      <section
        id="testimonials"
        className="bg-brand-cream py-20 text-center max-w-7xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-14">What our Users Say</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Testimonial
            text="Same-day delivery increased my customer satisfaction massively."
            name="Sarah J."
          />
          <Testimonial
            text="I earn on my schedule. Best courier platform I've used."
            name="Michael C."
          />
          <Testimonial
            text="Live tracking gives me peace of mind every time."
            name="Grace W."
          />
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section
        id="pricing"
        className="py-20 text-center max-w-4xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-10">Transparent Pricing</h2>

        <div className="bg-brand-cream rounded-xl p-10 shadow space-y-4 text-left">
          <PriceRow label="Base Fare" value="KES 150" />
          <PriceRow label="Distance (km)" value="× 50" />
          <PriceRow label="Weight (kg)" value="× 30" />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-brand-gold py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get Started?</h2>
        <p className="mb-8">Join thousands of users who trust Deliveroo.</p>
        <Link to="/register">
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

const Testimonial = ({ text, name }) => (
  <div className="bg-brand-gold p-8 rounded-xl shadow hover:scale-105 transition-transform">
    <p className="italic mb-4">“{text}”</p>
    <p className="font-semibold">{name}</p>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-brand-grayDark pb-3">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

export default Landing;
