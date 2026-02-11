import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white text-slate-900 selection:bg-amber-500 selection:text-white">
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl py-4 shadow-sm"
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-[6%] flex items-center justify-between">
          <Link to="/" className="group">
            <h1 className="font-black text-3xl tracking-tight transition-colors group-hover:text-amber-600">
              DELIVEROO<span className="text-amber-500">.</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[3px] font-black">
            {["Intelligence", "Process", "Tariffs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-500 hover:after:w-full after:transition-all"
              >
                {item}
              </a>
            ))}
            <Link to="/login" className="text-slate-400 hover:text-slate-900">
              Login
            </Link>
            <Link
              to="/register?role=USER"
              className="rounded-full bg-slate-900 px-8 py-3 text-white transition-all hover:bg-amber-500 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center px-[6%] pt-32">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />

        <div className="max-w-5xl">
          <span className="block mb-6 text-xs font-black uppercase tracking-[6px] text-amber-700">
            Premium Logistics Network
          </span>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight mb-8">
            Global Motion
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
              Redefined.
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-slate-500 font-medium mb-12">
            Real-time tracking, elite couriers, and precision logistics built
            for speed, safety, and scale.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link to="/register?role=customer">
              <button className="rounded-2xl bg-slate-900 px-12 py-5 font-black uppercase tracking-widest text-white transition-all hover:bg-amber-600 hover:-translate-y-1 hover:shadow-2xl">
                Create Shipment
              </button>
            </Link>
            <Link to="/register?role=courier">
              <button className="rounded-2xl border-2 border-slate-200 bg-white px-12 py-5 font-black uppercase tracking-widest transition-all hover:border-amber-500 hover:-translate-y-1">
                Join the Fleet
              </button>
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
            <Stat value="50K+" label="Dispatches" />
            <Stat value="10K+" label="Partners" />
            <Stat value="500+" label="Fleet Units" />
            <Stat value="4.8★" label="Rating" />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="why" className="py-32 px-[6%] bg-slate-50">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-20">
            <h2 className="text-4xl font-black mb-4">Core Intelligence</h2>
            <div className="h-1 w-24 bg-amber-500 rounded-full" />
          </header>

          <div className="grid md:grid-cols-3 gap-10">
            <Feature
              title="Priority Velocity"
              description="Immediate dispatch with optimized express routing."
            />
            <Feature
              title="Secure Custody"
              description="Insurance-backed, encrypted chain-of-custody handling."
            />
            <Feature
              title="Live Telemetry"
              description="Minute-by-minute GPS tracking with live courier updates."
            />
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-32 px-[6%] bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[4px] text-amber-500">
            Transparent Tariffs
          </span>
          <h2 className="text-5xl font-black my-12">Standard Rates</h2>

          <div className="rounded-[32px] bg-white/5 border border-white/10 p-12 backdrop-blur">
            <PriceRow label="Base Fare" value="KSh 150" />
            <PriceRow label="Per Kilometer" value="KSh 50" />
            <PriceRow label="Weight Fee" value="KSh 30 / kg" />

            <div className="mt-10 pt-8 border-t border-white/10 flex justify-between items-center">
              <span className="uppercase tracking-widest text-slate-400 text-sm">
                Starting From
              </span>
              <span className="text-4xl font-black text-amber-500">
                KSh 150*
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

/* ================= COMPONENTS ================= */

const Stat = ({ value, label }) => (
  <div className="rounded-3xl bg-white p-8 border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
    <p className="text-3xl font-black mb-1">{value}</p>
    <p className="text-[10px] uppercase tracking-widest text-slate-400">
      {label}
    </p>
  </div>
);

const Feature = ({ title, description }) => (
  <div className="rounded-[32px] bg-white p-10 border transition-all hover:-translate-y-2 hover:shadow-2xl">
    <div className="mb-6 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center font-black text-amber-600">
      ✓
    </div>
    <h3 className="font-black text-xl mb-4">{title}</h3>
    <p className="text-slate-500 font-medium">{description}</p>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex justify-between py-6 border-b border-white/10">
    <span className="uppercase tracking-[2px] text-xs text-slate-400">
      {label}
    </span>
    <span className="font-black text-xl">{value}</span>
  </div>
);

export default Landing;
