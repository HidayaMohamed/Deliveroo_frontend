import { Link } from "react-router-dom";
import { ShieldOff, ArrowLeft } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-[5%] bg-white selection:bg-yellow-200">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 rounded-[30px] flex items-center justify-center mx-auto mb-8">
          <ShieldOff size={32} className="text-red-400" />
        </div>

        <h1 className="text-6xl font-black tracking-tighter mb-4">
          Access <span className="italic">denied</span><span className="text-yellow-500">.</span>
        </h1>

        <p className="text-gray-400 font-bold text-sm mb-10 leading-relaxed">
          You don't have permission to view this page. Please sign in with the correct account or contact support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-10 py-5 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Sign In
          </Link>
          <Link
            to="/"
            className="px-10 py-5 border-2 border-gray-200 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:border-black transition-all active:scale-95 flex items-center justify-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
