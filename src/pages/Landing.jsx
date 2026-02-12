import { Link } from "react-router-dom";
import { ArrowRight, Package, Shield, MapPin, Zap, Clock, Headphones, Star, ChevronRight, Truck } from "lucide-react";

const Landing = () => {
  return (
    <div className="bg-white text-black selection:bg-yellow-200">

      {/* ================= HERO ================= */}
      <section className="min-h-[90vh] flex flex-col justify-center px-[5%] py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[200px] opacity-10 -z-10" />

        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-[2px] bg-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">Premium Logistics</span>
          </div>

          <h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.9] mb-8">
            Your Parcels<span className="text-yellow-500">,</span><br />
            Delivered <span className="italic">Fast</span><span className="text-yellow-500">.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xl mb-12 leading-relaxed">
            Send and receive parcels across the city with real-time tracking,
            professional couriers, and guaranteed delivery times.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              to="/register?role=customer"
              className="px-12 py-6 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all active:scale-95 shadow-2xl flex items-center gap-3 group"
            >
              Get Started Free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register?role=courier"
              className="px-12 py-6 border-2 border-gray-200 text-black rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:border-black transition-all active:scale-95 flex items-center gap-3"
            >
              <Truck size={16} /> Become a Courier
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              { value: "50K+", label: "Deliveries" },
              { value: "10K+", label: "Active Users" },
              { value: "500+", label: "Couriers" },
              { value: "4.8", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 p-6 rounded-[30px] text-center border border-gray-100">
                <p className="text-3xl font-black tracking-tighter italic">{stat.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section id="why" className="py-24 px-[5%] bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">Why Choose Us</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">
            Built for <span className="italic">reliability</span><span className="text-yellow-500">.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={24} />, title: "Fast Delivery", desc: "Parcels delivered in hours, not days. Our network ensures the fastest routes." },
              { icon: <Shield size={24} />, title: "Secure Parcels", desc: "Every package is handled with care, insured, and tracked end-to-end." },
              { icon: <MapPin size={24} />, title: "Live Tracking", desc: "Real-time GPS tracking so you always know where your parcel is." },
              { icon: <Package size={24} />, title: "Affordable Pricing", desc: "Transparent pricing — you only pay for what you send. No hidden fees." },
              { icon: <Star size={24} />, title: "Earn as Courier", desc: "Join our courier network and earn on your schedule. Be your own boss." },
              { icon: <Headphones size={24} />, title: "24/7 Support", desc: "Our support team is always available to help you, day or night." },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-yellow-500 hover:-translate-y-1 transition-all group"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black tracking-tight mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-24 px-[5%]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">The Process</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">
            How it <span className="italic">works</span><span className="text-yellow-500">.</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Create Order", desc: "Enter pickup & destination locations on the map." },
              { num: "02", title: "Courier Assigned", desc: "System finds the nearest available courier for you." },
              { num: "03", title: "Track Live", desc: "Follow your parcel with real-time GPS tracking." },
              { num: "04", title: "Delivered", desc: "Parcel safely delivered. Rate your experience." },
            ].map((step) => (
              <div key={step.num} className="relative">
                <span className="text-8xl font-black text-gray-100 italic leading-none block mb-4">{step.num}</span>
                <h3 className="text-xl font-black tracking-tight mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="py-24 px-[5%] bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-16">
            What users <span className="italic">say</span><span className="text-yellow-500">.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { text: "Same-day delivery increased my customer satisfaction massively. Will never go back.", name: "Sarah J.", role: "Business Owner" },
              { text: "I earn on my own schedule. Best courier platform I've used in Nairobi.", name: "Michael C.", role: "Courier Partner" },
              { text: "Live tracking gives me peace of mind every time I send a parcel across the city.", name: "Grace W.", role: "Regular User" },
            ].map((t) => (
              <div key={t.name} className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="#eab308" className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-lg font-bold text-gray-700 leading-relaxed mb-8 italic">"{t.text}"</p>
                <div>
                  <p className="font-black text-sm">{t.name}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section id="pricing" className="py-24 px-[5%]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600 mb-4 block">Pricing</span>
            <h2 className="text-5xl font-black tracking-tighter">
              Transparent<span className="text-yellow-500">.</span>
            </h2>
          </div>

          <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
            {[
              { label: "Base Fare", value: "KES 150" },
              { label: "Per Kilometer", value: "KES 50" },
              { label: "Per Kilogram", value: "KES 30" },
            ].map((row, i) => (
              <div key={row.label} className={`flex justify-between items-center py-6 ${i < 2 ? "border-b border-gray-200" : ""}`}>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{row.label}</span>
                <span className="text-2xl font-black tracking-tighter italic">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-[5%]">
        <div className="max-w-[1400px] mx-auto bg-black rounded-[60px] p-16 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-500 rounded-full blur-[150px] opacity-20" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
              Ready to ship<span className="text-yellow-500">?</span>
            </h2>
            <p className="text-gray-500 font-bold uppercase text-[11px] tracking-widest">Join thousands of users who trust Deliveroo.</p>
          </div>

          <Link
            to="/register"
            className="relative z-10 px-12 py-7 bg-yellow-500 text-black rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all active:scale-95 shadow-2xl flex items-center gap-3 group whitespace-nowrap"
          >
            Create Free Account
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
