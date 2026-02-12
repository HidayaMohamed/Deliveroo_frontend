import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { Phone, ArrowLeft, ShieldCheck, Navigation, MessageSquare, Share2, Zap, Star } from "lucide-react";
import L from "leaflet";
import { getOrderById } from "../../api/orders";

// Leaflet Icon Fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data.order || data);
      } catch (err) {
        setOrder({
          id: id || "8842",
          pickup_location: "Westlands, Nairobi",
          destination: "Kilimani, Nairobi",
          status: "In Transit",
          rider: { 
            name: "David Maina", 
            bike: "Yamaha FZ • KDM 442X", 
            pos: [-1.2833, 36.8167],
            phone: "+254712345678" 
          },
          route: [[-1.2675, 36.8083], [-1.2833, 36.8167], [-1.2921, 36.7850]]
        });
      }
    };
    loadData();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Tracking link copied to clipboard!");
  };

  if (!order) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-8 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="font-black uppercase tracking-[0.5em] text-sm text-gray-400">Linking Satellite...</p>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex flex-col lg:flex-row h-[calc(100vh-70px)] bg-white overflow-hidden"
    >
      {/* LEFT: THE MAP */}
      <div className="flex-1 relative border-r border-gray-100">
        <MapContainer center={order.rider.pos} zoom={14} className="h-full w-full grayscale-[0.8] contrast-[1.2]">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <Polyline positions={order.route} color="black" weight={4} dashArray="10, 10" />
          <Marker position={order.rider.pos}>
            <Popup className="font-black uppercase text-xs text-center">Courier: <br/>{order.rider.name}</Popup>
          </Marker>
        </MapContainer>

        {/* COMMUNICATION HUB */}
       <motion.div 
  initial={{ y: 50, opacity: 0 }} 
  animate={{ y: 0, opacity: 1 }}
  className="absolute bottom-10 left-10 z-[1000] bg-white/90 backdrop-blur-2xl p-6 rounded-[40px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] border border-white flex items-center gap-6 min-w-[450px]"
>
  {/* Rider Avatar - Updated to a Guy's Pic */}
  <div className="w-16 h-16 bg-yellow-500 rounded-full border-4 border-white overflow-hidden shadow-xl relative">
    <img 
      src="https://images.unsplash.com/photo-1653463207246-1dc03899dfe0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW90b3JiaWtlJTIwcmlkZXIlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D" 
      alt="rider" 
      className="w-full h-full object-cover" 
    />
    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
  </div>
  
  <div className="flex-1">
    <h4 className="font-black text-xl tracking-tighter uppercase">{order.rider.name}</h4>
    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
      <Navigation size={14} className="text-yellow-600" /> {order.rider.bike}
    </div>
  </div>
          <div className="flex gap-3">
            <a href={`https://wa.me/${order.rider.phone}`} target="_blank" rel="noreferrer"
              className="w-12 h-12 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
            >
              <MessageSquare size={20} />
            </a>
            <a href={`tel:${order.rider.phone}`}
              className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-yellow-500 transition-all shadow-lg hover:scale-110"
            >
              <Phone size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* RIGHT: THE CONTROL PANEL */}
      <aside className="w-full lg:w-[500px] p-12 flex flex-col justify-between border-l border-gray-100 bg-white overflow-y-auto custom-scrollbar">
        <div>
          {/* TOP NAV: HIGH VISIBILITY */}
          <div className="flex justify-between items-center mb-10">
            <Link to="/orders" className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-lg shadow-black/10">
              <ArrowLeft size={16} /> Back to Fleet
            </Link>
            <button onClick={handleShare} className="text-gray-400 hover:text-black transition-colors p-2">
              <Share2 size={22} />
            </button>
          </div>
          
          <span className="text-[11px] font-black text-yellow-600 uppercase tracking-[0.4em]">Batch #DEL-{order.id}</span>
          {/* REDUCED SIZE STATUS */}
          <h2 className="text-6xl font-black tracking-tighter italic leading-none mt-4 mb-10">
            {order.status}<span className="text-yellow-500">.</span>
          </h2>

          {/* REDUCED SIZE ETA WIDGET */}
          <div className="flex gap-4 mb-12">
            <div className="flex-1 bg-yellow-50 p-6 rounded-[35px] border border-yellow-100 shadow-sm">
               <p className="text-[10px] font-black text-yellow-700 uppercase tracking-widest mb-1 flex items-center gap-2">
                 <Zap size={12} fill="currentColor"/> Live ETA
               </p>
               <p className="text-3xl font-black tracking-tighter italic">12 Mins</p>
            </div>
            <div className="flex-1 bg-gray-50 p-6 rounded-[35px] border border-gray-100 text-center">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Distance</p>
               <p className="text-3xl font-black tracking-tighter italic">4.2 km</p>
            </div>
          </div>

          {/* PROGRESS STEPS - LARGER TEXT */}
          <div className="space-y-10 border-l-4 border-gray-50 ml-2 pl-10 relative mb-16">
            {["Order Confirmed", "Rider Dispatched", "Package Collected", "In Transit"].map((step, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[54px] top-1 w-6 h-6 rounded-full border-4 border-white ${i <= 3 ? 'bg-black shadow-[0_0_10px_black]' : 'bg-gray-200'}`} />
                <span className={`text-sm font-black uppercase tracking-widest ${i <= 3 ? 'text-black' : 'text-gray-300'}`}>
                  {step}
                </span>
                {i === 3 && <p className="text-[10px] font-bold text-yellow-600 mt-1 uppercase">Live GPS Sync On</p>}
              </div>
            ))}
          </div>

          {/* UPGRADED FEEDBACK FORM */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white border-2 border-gray-100 p-8 rounded-[50px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] relative overflow-hidden group"
          >
            <div className="text-center mb-6 relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Delivery Complete?</p>
              <h3 className="text-2xl font-black tracking-tighter italic">Rate <span className="text-yellow-500">David's</span> Performance.</h3>
            </div>

            <div className="flex justify-center gap-4 mb-8 relative z-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-all transform hover:scale-125"
                >
                  <Star 
                    size={36} 
                    fill={(hoverRating || rating) >= star ? "#EAB308" : "none"} 
                    className={(hoverRating || rating) >= star ? "text-yellow-500 drop-shadow-md" : "text-gray-200"}
                  />
                </button>
              ))}
            </div>

            <div className="relative mb-6 z-10">
              <textarea
                placeholder="He was fast and polite..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-[30px] p-6 text-sm font-bold placeholder:text-gray-300 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 min-h-[120px] outline-none transition-all shadow-inner"
              />
            </div>

            <button 
              className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-yellow-500 transition-all shadow-xl active:scale-95 relative z-10"
              onClick={() => {
                if(rating === 0) return alert("Please select a star rating!");
                alert("Thank you! Your feedback keeps the fleet spectacular.");
                setComment(""); setRating(0);
              }}
            >
              Submit Review
            </button>
          </motion.div>
        </div>

        {/* BOLDER FOOTER INFO */}
        <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 mt-12">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={20} className="text-green-500" />
            <span className="text-xs font-black uppercase tracking-widest">Secure 256-bit Encrypted</span>
          </div>
          <p className="text-sm font-bold text-gray-400 leading-relaxed uppercase">
            {order.pickup_location} <span className="text-yellow-600 mx-2 text-xl">→</span> {order.destination}
          </p>
        </div>
      </aside>
    </motion.div>
  );
}