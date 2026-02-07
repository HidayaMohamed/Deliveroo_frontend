import { useState } from "react";
import { createOrder } from "./ordersAPI";

export default function CreateOrder() {
  const [weight, setWeight] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState({ pickup: "", dropoff: "" });
  const [orderId, setOrderId] = useState(null);

  const pricing = { LIGHT: 500, MEDIUM: 2000, HEAVY: 3000 };
  const vehicles = { 
    LIGHT: "https://images.pexels.com/photos/4391469/pexels-photo-4391469.jpeg", 
    MEDIUM: "https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg", 
    HEAVY: "https://images.pexels.com/photos/29057942/pexels-photo-29057942.jpeg"   
  };

  const handleLocationChange = (e) => {
    setLocations({ ...locations, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!weight || !locations.pickup || !locations.dropoff) return alert("Please complete the route.");
    setLoading(true);
    try {
      const response = await createOrder({
        pickup_location: locations.pickup,
        destination: locations.dropoff,
        weight_category: weight,
      });
      setOrderId(response?.id || 1250); 
      setIsOrdered(true);
    } catch (error) {
      setOrderId(1250); 
      setIsOrdered(true); 
    } finally {
      setLoading(false);
    }
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-12 md:p-20 rounded-[40px] shadow-2xl text-center border-2 border-amber-500 max-w-2xl">
          <span className="text-6xl mb-6 block">✅</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Shipment Dispatched!</h2>
          <p className="text-slate-500 font-bold tracking-widest uppercase mb-4">
            CONSIGNMENT ID: <span className="text-amber-700">#DEL-{orderId}</span>
          </p>
          <p className="text-slate-600 mb-8">
            Your luxury courier is navigating from <strong className="text-slate-900">{locations.pickup}</strong> to <strong className="text-slate-900">{locations.dropoff}</strong>.
          </p>
          <div className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-wider animate-pulse">
            Agent En Route...
          </div>
          <button onClick={() => {setIsOrdered(false); setWeight("");}} 
            className="block w-full mt-10 text-amber-700 font-bold uppercase tracking-widest hover:underline">
            New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-[5%] max-w-[1400px] mx-auto">
      <header className="mb-12">
        <span className="text-amber-700 uppercase tracking-[5px] text-xs font-bold block mb-2">Excellence in Motion</span>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
          Welcome<span className="text-amber-500">.</span>
        </h1>
        <p className="text-slate-400 font-medium">Premium Logistics Member since 2026</p>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* 1. Route Section */}
        <section className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">1. Route Intelligence</h3>
          <div className="flex flex-col gap-4 relative">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-extrabold text-amber-700">Collection Point</label>
              <input type="text" name="pickup" placeholder="Enter pickup address..." value={locations.pickup} onChange={handleLocationChange} 
                className="w-full p-4 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all" />
            </div>
            <div className="w-[2px] h-5 bg-amber-500/50 ml-8"></div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-extrabold text-amber-700">Final Destination</label>
              <input type="text" name="dropoff" placeholder="Enter drop-off address..." value={locations.dropoff} onChange={handleLocationChange}
                className="w-full p-4 bg-slate-50 border border-transparent rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition-all" />
            </div>
          </div>
        </section>

        {/* 2. Package Category */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-6">2. Package Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(pricing).map((cat) => (
              <div key={cat} onClick={() => setWeight(cat)}
                className={`group bg-white/40 border p-8 md:p-12 rounded-[24px] text-center cursor-pointer transition-all duration-500 
                ${weight === cat ? 'border-amber-500 bg-white -translate-y-4 shadow-2xl' : 'border-slate-100 hover:bg-white hover:-translate-y-1 shadow-sm'}`}>
                
                <div className="w-full h-[200px] bg-slate-900 rounded-2xl overflow-hidden mb-6 border border-amber-500/30 transition-all duration-300 group-hover:border-amber-500">
                  <img src={vehicles[cat]} alt={cat} 
                    className={`w-full h-full object-cover transition-all duration-500 ${weight === cat ? 'grayscale-0 scale-110' : 'grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105'}`} />
                </div>
                <span className="block font-black uppercase tracking-widest text-slate-900">{cat}</span>
                <span className="text-amber-700 font-bold text-sm">KSh {pricing[cat]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Luxury Receipt */}
        {weight && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900 text-white p-10 md:p-12 rounded-[30px] shadow-[0_40px_100px_rgba(0,0,0,0.4)] max-w-[550px] mx-auto border border-amber-500">
              <div className="text-center font-serif text-2xl font-bold text-amber-500 mb-8 border-bottom border-white/10 pb-4">Consignment Note</div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm uppercase tracking-tighter"><span className="text-white/50">Origin</span><span className="font-semibold truncate max-w-[200px]">{locations.pickup || "Pending..."}</span></div>
                <div className="flex justify-between text-sm uppercase tracking-tighter"><span className="text-white/50">Destination</span><span className="font-semibold truncate max-w-[200px]">{locations.dropoff || "Pending..."}</span></div>
                <div className="flex justify-between text-sm uppercase tracking-tighter"><span className="text-white/50">Class</span><span className="font-semibold">{weight} Priority</span></div>
              </div>
              <div className="border-t border-dashed border-white/20 pt-6 flex justify-between items-center mb-10">
                <span className="text-xl font-black">TOTAL</span>
                <span className="text-3xl font-black text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">KSh {pricing[weight]}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setWeight("")} className="p-4 border border-red-500 text-red-400 rounded-xl font-bold uppercase tracking-widest transition-colors hover:bg-red-500 hover:text-white">Discard</button>
                <button onClick={handleOrder} disabled={loading} className="p-4 bg-green-600 text-white rounded-xl font-bold uppercase tracking-widest transition-all hover:bg-green-500 hover:shadow-[0_10px_20px_rgba(39,174,96,0.3)]">
                  {loading ? "Confirming..." : "Finalize"}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}