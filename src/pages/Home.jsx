import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";

const Home = () => {
  const { isAuthenticated, isCustomer, isCourier, isAdmin, user } = useAuth();

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Hero Section - Deep Charcoal & Yellow */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-black text-white overflow-hidden">
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left space-y-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 font-bold text-yellow-400 text-xs tracking-widest uppercase border border-yellow-400/20">
                  #1 Parcel Delivery Service
              </span>

              <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                Delivery <br />
                <span className="text-yellow-400 italic font-light">
                  Simple & Fast.
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
                Send packages anywhere, anytime. Real-time tracking,{" "}
                <span className="text-white">transparent pricing</span>, and
                trusted couriers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/register"
                      className="px-8 py-4 bg-yellow-400 text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-yellow-300 hover:scale-105 transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] flex items-center justify-center gap-2 group"
                    >
                      Get Started{" "}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      to="/login"
                      className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <div className="text-left w-full">
                      <p className="text-gray-400 mb-4 text-center md:text-left italic">
                        Welcome back,{" "}
                        <span className="font-bold text-yellow-400 not-italic">
                          {user?.full_name}
                        </span>
                        !
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {isCustomer && (
                          <Link
                            to="/create-order"
                            className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 shadow-lg flex items-center justify-center gap-2"
                          >
                            <Package size={20} /> New Order
                          </Link>
                        )}
                        {isCourier && (
                          <Link
                            to="/courier/orders"
                            className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 shadow-lg flex items-center justify-center gap-2"
                          >
                            <Package size={20} /> Go to Dashboard
                          </Link>
                        )}
                        {isAdmin && (
                          <Link
                            to="/admin/dashboard"
                            className="px-8 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 shadow-lg flex items-center justify-center gap-2"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          to="/orders"
                          className="px-8 py-3 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10"
                        >
                          My Orders
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Visual element / Illustration placeholder */}
            <div className="md:w-1/2 relative hidden md:block">
              <div className="relative z-10 w-full h-[500px] bg-yellow-400/5 rounded-[40px] backdrop-blur-md border border-white/10 p-6 flex flex-col justify-center items-center shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                {/* Abstract UI representation */}
                <div className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl p-4 mb-4 max-w-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="h-2 w-24 bg-white/20 rounded mb-1"></div>
                      <div className="h-2 w-16 bg-white/10 rounded"></div>
                    </div>
                    <div className="ml-auto text-yellow-400 text-[10px] font-black bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20 tracking-tighter">
                      IN TRANSIT
                    </div>
                  </div>
                  <div className="h-32 bg-black/50 rounded-lg w-full relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 flex items-center justify-center text-white/10">
                      <MapPin size={32} />
                    </div>
                    <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none">
                      <path
                        d="M 20 80 Q 150 20 280 80"
                        stroke="#facc15"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="6,4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full bg-white text-black rounded-2xl shadow-xl p-4 max-w-sm transform translate-x-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                      <div>
                        <div className="h-2 w-20 bg-gray-200 rounded mb-1"></div>
                        <div className="h-2 w-12 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="h-8 w-24 bg-black rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L1440 120L1440 60C1440 60 1120 0 720 0C320 0 0 60 0 60L0 120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Stats/Trust Bar */}
      <div className="container mx-auto px-4 -mt-8 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100 border border-gray-50">
          <div className="text-center">
            <p className="text-4xl font-black text-black tracking-tighter">
              10k+
            </p>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">
              Delivered
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-black tracking-tighter">
              99%
            </p>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">
              On-Time
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-black tracking-tighter">
              24/7
            </p>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">
              Available
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black text-black tracking-tighter">
              4.9/5
            </p>
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">
              Rating
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 mb-20">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-yellow-500 font-black uppercase tracking-[0.3em] text-[10px]">
            Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-black mt-4 mb-6 tracking-tighter uppercase">
            Logistics{" "}
            <span className="italic font-light text-gray-400 normal-case">
              Redefined.
            </span>
          </h2>
          <p className="text-gray-500 text-lg font-medium">
            We handle the heavy lifting so you can focus on what matters most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Clock className="w-6 h-6" />}
            title="Instant Delivery"
            description="Our smart algorithms match you with the nearest courier instantly for pickup within minutes."
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6" />}
            title="Real-time Tracking"
            description="Follow your package every step of the way with our live GPS tracking interface."
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6" />}
            title="Safe & Secure"
            description="Verified couriers and a secure delivery code system ensure your package reaches safely."
          />
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
              The{" "}
              <span className="italic font-light text-yellow-500 normal-case tracking-normal">
                Four Step
              </span>{" "}
              Standard
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gray-200 -z-10"></div>
            <StepCard
              number="01"
              title="Create Order"
              desc="Enter pickup & drop-off details."
            />
            <StepCard
              number="02"
              title="Get Matched"
              desc="Driver assigned in seconds."
            />
            <StepCard
              number="03"
              title="Track Live"
              desc="Watch your delivery in real-time."
            />
            <StepCard
              number="04"
              title="Delivery"
              desc="Secure handover with PIN code."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="container mx-auto px-4 py-24">
          <div className="bg-black rounded-[40px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[120px] opacity-10 -mr-32 -mt-32"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
                Ready to ship <br />{" "}
                <span className="text-yellow-400 italic font-light normal-case tracking-normal">
                  your package?
                </span>
              </h2>
              <p className="text-gray-400 text-xl mb-12 font-light">
                Join thousands of happy customers using Deliveroo today.
              </p>

              <Link
                to="/register"
                className="inline-block bg-yellow-400 text-black px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-yellow-300 transition-all"
              >
                Sign Up Now
              </Link>
              <p className="mt-8 text-gray-600 text-[10px] uppercase tracking-widest font-bold">
                No credit card required.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-10 rounded-[32px] border border-gray-100 hover:border-yellow-400/50 transition-all duration-500 hover:-translate-y-2 group">
    <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-yellow-400 group-hover:text-black transition-colors duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tight">
      {title}
    </h3>
    <p className="text-gray-500 leading-relaxed font-medium text-sm">
      {description}
    </p>
  </div>
);

const StepCard = ({ number, title, desc }) => (
  <div className="flex flex-col items-center text-center relative p-6">
    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl border border-gray-50 relative z-10 group-hover:scale-110 transition-transform">
      <span className="text-2xl font-black text-black italic">{number}</span>
    </div>
    <h3 className="text-lg font-bold text-black uppercase tracking-tight mb-2">
      {title}
    </h3>
    <p className="text-gray-500 text-sm font-medium">{desc}</p>
  </div>
);

export default Home;
