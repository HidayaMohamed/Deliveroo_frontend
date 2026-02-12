import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8f5f0] border-t border-[#e8e2d8] pt-12 pb-8 px-[5%] relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* BRAND SECTION */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-3xl font-black tracking-tighter mb-4 block text-[#2d2a26]"
            >
              DELIVEROO<span className="text-yellow-600">.</span>
            </Link>
            <p className="text-[10px] font-black text-[#8c857d] uppercase tracking-[0.2em] leading-relaxed max-w-xs">
              The Gold Standard in Kenyan Logistics.
              <span className="block text-[#4a453e] italic mt-1">
                Reliability crafted for Nairobi.
              </span>
            </p>

            {/* COMPACT SYSTEM STATUS */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 rounded-full border border-[#e8e2d8]">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[#5e5850]">
                Network Online
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b5ada3] mb-1">
              Navigation
            </h4>
            <Link
              to="/orders"
              className="text-[10px] font-black uppercase tracking-widest text-[#4a453e] hover:text-yellow-600 transition-colors"
            >
              Fleet tracking
            </Link>
            <Link
              to="/orders/new"
              className="text-[10px] font-black uppercase tracking-widest text-[#4a453e] hover:text-yellow-600 transition-colors"
            >
              Request Transit
            </Link>
          </div>

          {/* SUPPORT & LEGAL */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b5ada3] mb-1">
              Legal
            </h4>
            <a
              href="https://deliveroo.co.uk/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-black uppercase tracking-widest text-[#4a453e] hover:text-yellow-600 transition-colors"
            >
              Privacy Charter
            </a>
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-[#4a453e] hover:text-yellow-600 transition-colors"
            >
              Compliance
            </a>
          </div>
        </div>

        {/* BOTTOM BAR - Tighter padding */}
        <div className="pt-8 border-t border-[#e8e2d8] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 text-xl">
            <a
              href="https://instagram.com/deliveroo"
              target="_blank"
              rel="noreferrer"
              className="text-[#b5ada3] hover:text-[#E1306C] transition-colors"
            >
              📷
            </a>
            <a
              href="https://twitter.com/deliveroo"
              target="_blank"
              rel="noreferrer"
              className="text-[#b5ada3] hover:text-[#1DA1F2] transition-colors"
            >
              🐦
            </a>
            <a
              href="https://linkedin.com/company/deliveroo"
              target="_blank"
              rel="noreferrer"
              className="text-[#b5ada3] hover:text-[#0077B5] transition-colors"
            >
              💼
            </a>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-black text-[#b5ada3] uppercase tracking-[0.3em]">
            <span>🌍 Nairobi HQ • {currentYear}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2d2a26] rounded-md shadow-sm">
            <span className="text-yellow-500">✅</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-white">
              Certified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
