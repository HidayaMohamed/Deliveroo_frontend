import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, createOrder, initiateMpesa } from "./ordersAPI";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [weight, setWeight] = useState("LIGHT");
  const [locations, setLocations] = useState({ pickup: "", dropoff: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. BACKEND SYNC: Get user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
        // Fallback for demo if backend isn't ready
        setUser({ full_name: "Sharon Njoroge", phone: "254712345678" });
      }
    };
    fetchData();
  }, []);

  const pricing = { LIGHT: 500, MEDIUM: 2000, HEAVY: 3000 };
  const vehicles = {
    LIGHT: "https://images.pexels.com/photos/4391469/pexels-photo-4391469.jpeg",
    MEDIUM: "https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg",
    HEAVY: "https://images.pexels.com/photos/29057942/pexels-photo-29057942.jpeg"
  };

  // 2. LOGIC: Handle M-Pesa & Order Creation
  const handleMpesaCheckout = async () => {
    if (!locations.pickup || !locations.dropoff) {
      return alert("Please specify both pickup and destination points.");
    }

    setIsProcessing(true);
    try {
      // Step A: STK Push
      await initiateMpesa({
        phone: user.phone,
        amount: pricing[weight]
      });

      // Step B: Create Order Record
      const orderRes = await createOrder({
        pickup_location: locations.pickup,
        destination: locations.dropoff,
        weight_category: weight,
        status: "Pending Payment"
      });

      alert("M-PESA: STK Push sent. Check your handset.");
      
      // Redirect to the specific order tracking page
      navigate(`/orders/${orderRes.data.id || ''}`);
      
    } catch (err) {
      alert("System Busy: Please try the checkout again shortly.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Securing Session...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black pb-32">
      {/* 3. TOP PROGRESS NAV (Visual 'Better' Factor) */}
      <div className="w-full h-1 bg-gray-100 sticky top-0 z-50">
        <div 
          className="h-full bg-yellow-500 transition-all duration-1000" 
          style={{ width: locations.pickup && locations.dropoff ? '100%' : '50%' }}
        ></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pt-16">
        <header className="mb-20">
          <span className="text-yellow-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">New Shipment</span>
          <h1 className="text-8xl font-black tracking-tighter leading-none mb-6">
            Ready to ship, <br />
            <span className="text-gray-200 hover:text-yellow-500 transition-colors duration-500 cursor-default">
              {user.full_name.split(' ')[0]}?
            </span>
          </h1>
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-gray-200"></span>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Billing to: {user.phone}</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* LEFT: VEHICLES */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex justify-between items-end">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 underline decoration-yellow-500 decoration-2 underline-offset-8">01. Fleet Selection</h3>
              <p className="text-[10px] font-black text-gray-300 italic">Select your freight class below</p>
            </div>

            <div className="grid gap-10">
              {Object.keys(pricing).map((cat) => (
                <div key={cat} onClick={() => setWeight(cat)}
                  className={`group relative h-[500px] rounded-[60px] overflow-hidden cursor-pointer transition-all duration-700 
                  ${weight === cat ? 'ring-[15px] ring-yellow-500 scale-[1.02] shadow-2xl' : 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}>
                  <img src={vehicles[cat]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt={cat} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-12 left-12 text-white">
                    <div className="flex items-center gap-3 mb-4">
                       <span className="w-8 h-[2px] bg-yellow-500"></span>
                       <span className="text-yellow-500 font-black text-xs uppercase tracking-widest">Premium {cat} Service</span>
                    </div>
                    <h2 className="text-6xl font-black italic tracking-tighter mb-2">{cat} PRIORITY</h2>
                    <p className="text-gray-300 font-medium text-lg">Guaranteed delivery within 24 hours.</p>
                  </div>

                  <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full">
                    <span className="text-white font-black text-2xl tracking-tighter">KES {pricing[cat]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE STICKY CONSIGNMENT NOTE */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-gray-50 p-12 rounded-[70px] border border-gray-100 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black tracking-tight italic">Shipment Summary</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-8 mb-12">
                <div className="relative group">
                   <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all"></div>
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Pickup Location</label>
                   <input 
                    type="text" 
                    placeholder="Search collection point..." 
                    className="w-full bg-white p-6 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl transition-all placeholder:text-gray-200" 
                    onChange={(e) => setLocations({...locations, pickup: e.target.value})} 
                   />
                </div>

                <div className="relative group">
                   <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all"></div>
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Drop-off Destination</label>
                   <input 
                    type="text" 
                    placeholder="Search destination..." 
                    className="w-full bg-white p-6 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl transition-all placeholder:text-gray-200" 
                    onChange={(e) => setLocations({...locations, dropoff: e.target.value})} 
                   />
                </div>
              </div>

              <div className="bg-white p-8 rounded-[40px] mb-8 border border-gray-100">
                <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2">
                  <span>Billing Summary</span>
                  <span>{weight} Class</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-gray-400 text-xs">Standard Freight</span>
                   <span className="text-2xl font-black italic text-yellow-600">KES {pricing[weight]}</span>
                </div>
              </div>
              
              <button 
                onClick={handleMpesaCheckout} 
                disabled={isProcessing}
                className="w-full py-7 bg-[#2fbb1c] text-white rounded-[30px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-black transition-all hover:-translate-y-1 shadow-2xl shadow-green-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing PIN...</span>
                  </div>
                ) : (
                  <>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" className="h-6 brightness-200" alt="Mpesa" />
                    Complete Request
                  </>
                )}
              </button>
              
              <p className="text-center text-[9px] text-gray-300 font-bold uppercase mt-6 tracking-widest">
                Secure 256-bit encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}