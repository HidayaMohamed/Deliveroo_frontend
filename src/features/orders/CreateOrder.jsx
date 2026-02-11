import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#F8FAFC] text-slate-900 selection:bg-orange-500 selection:text-white font-sans">
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/70 backdrop-blur-2xl py-4 shadow-sm border-b border-slate-200/50"
            : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-[6%] flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
              <span className="font-black text-xl">D</span>
            </div>
            <h1 className="font-black text-2xl tracking-tighter transition-colors text-slate-800">
              DELIVEROO<span className="text-orange-500">.</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[12px] font-bold text-slate-500">
            {["Intelligence", "Process", "Tariffs"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-orange-600 transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
            <div className="h-4 w-[1px] bg-slate-200 mx-2" />
            <Link
              to="/login"
              className="hover:text-slate-900 uppercase tracking-widest"
            >
              Login
            </Link>
            <Link
              to="/register?role=USER"
              className="rounded-2xl bg-slate-900 px-6 py-3 text-white transition-all hover:bg-orange-600 hover:shadow-lg active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center px-[6%] pt-20 overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-slate-200 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-10 left-[-5%] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[100px] opacity-30" />

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-[1400px] mx-auto w-full relative z-10">
          <div>
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[3px] text-slate-500 border border-slate-200">
              Reliable Logistics
            </span>

            <h1 className="text-6xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight mb-8 text-slate-900">
              Global Motion <br />
              <span className="text-slate-400">Redefined.</span>
            </h1>

            <p className="max-w-lg text-lg text-slate-500 font-medium mb-10 leading-relaxed">
              Precision delivery for the modern era. Real-time telemetry, secure
              custody, and instant M-Pesa integration.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/register?role=customer" className="w-full sm:w-auto">
                <button className="w-full rounded-2xl bg-orange-600 px-10 py-5 font-bold text-white transition-all hover:bg-orange-700 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0">
                  Create Shipment
                </button>
              </Link>
              <Link to="/register?role=courier" className="w-full sm:w-auto">
                <button className="w-full rounded-2xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-10 py-5 font-bold text-slate-700 transition-all hover:border-slate-400 hover:bg-white active:scale-95">
                  Join the Fleet
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="aspect-square bg-slate-200/50 rounded-[60px] relative overflow-hidden group border border-slate-300/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-transparent opacity-60"></div>
              {/* Visual Placeholder for Image */}
              <div className="absolute inset-0 flex items-center justify-center italic text-slate-400 font-medium">
                [Interactive Delivery Visualization]
              </div>
              {/* Floating Micro-Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 tracking-tight">
                      Package Delivered
                    </p>
                    <p className="text-sm text-slate-500">
                      Mombasa, Kenya • 2m ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="intelligence" className="py-32 px-[6%] relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Core Intelligence
              </h2>
              <p className="text-slate-500 mt-2 font-medium">
                Engineered for reliability and scale.
              </p>
            </div>
            <div className="h-[2px] flex-grow mx-8 bg-slate-200 hidden md:block mb-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon="⚡"
              title="Priority Velocity"
              description="Immediate dispatch with optimized express routing algorithms."
            />
            <Feature
              icon="🛡️"
              title="Secure Custody"
              description="Insurance-backed, encrypted chain-of-custody handling for every parcel."
            />
            <Feature
              icon="📡"
              title="Live Telemetry"
              description="Minute-by-minute GPS tracking with live courier updates and SMS."
            />
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="tariffs" className="py-24 px-[6%]">
        <div className="max-w-5xl mx-auto rounded-[48px] bg-slate-900 p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px]" />

          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
                Transparent Tariffs
              </span>
              <h2 className="text-5xl font-black mt-4 mb-6 leading-tight">
                Simple Rates. <br /> No Hidden Fees.
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                We believe in fair pricing. Calculate your costs upfront with
                our integrated M-Pesa payment gateway.
              </p>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-colors">
                View Detailed Pricing
              </button>
            </div>

            <div className="space-y-2 bg-white/5 backdrop-blur-lg p-8 rounded-[32px] border border-white/10">
              <PriceRow label="Base Dispatch" value="KSh 150" />
              <PriceRow label="Distance (per km)" value="KSh 50" />
              <PriceRow label="Weight (per kg)" value="KSh 30" />
              <div className="pt-6 mt-4 flex justify-between items-center">
                <span className="font-bold text-slate-400 italic">
                  Starting Total
                </span>
                <span className="text-4xl font-black text-orange-500">
                  KSh 150
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ================= SUB-COMPONENTS ================= */

const Feature = ({ icon, title, description }) => (
  <div className="group bg-white p-10 rounded-[40px] border border-slate-200 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2">
    <div className="mb-8 w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl group-hover:bg-orange-50 group-hover:scale-110 transition-all duration-500">
      {icon}
    </div>
    <h3 className="font-black text-2xl mb-4 text-slate-800 tracking-tight">
      {title}
    </h3>
    <p className="text-slate-500 font-medium leading-relaxed">{description}</p>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex justify-between py-5 border-b border-white/5 group">
    <span className="text-slate-400 group-hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold">
      {label}
    </span>
    <span className="font-bold text-xl">{value}</span>
  </div>
);

export default Landing;
