import { useEffect, useState } from "react";
import { getMyOrders } from "./ordersAPI";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import { Navigation2, Trash2, ArrowRight } from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.data))
      .catch(err => {
        // SPECTACULAR DEMO DATA
        setOrders([
          { 
            id: "8842", 
            pickup_location: "Westlands, Nairobi", 
            destination: "Kilimani, Nairobi", 
            price: "500", 
            status: "In Transit" 
          },
          { 
            id: "9021", 
            pickup_location: "CBD, City Hall", 
            destination: "Karen, Nairobi", 
            price: "2000", 
            status: "Pending" 
          }
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // DELETE LOGIC: Deletes the whole card from state
  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this shipment record? This action cannot be undone.")) {
      setOrders(prev => prev.filter(order => order.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-grayDark mb-2">
          My Orders
        </h1>
      </motion.div>
      
      <div className="grid gap-10">
        <AnimatePresence mode="popLayout">
          {orders.map((order, idx) => (
            <motion.div 
              key={order.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 100, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="flex bg-gray-50 rounded-[50px] overflow-hidden border border-transparent hover:border-black hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group"
            >
              {/* IMAGE SECTION */}
              <div className="w-1/3 bg-zinc-200 h-72 overflow-hidden relative">
                 <img 
                   src="https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                   alt="Logistics"
                 />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* CONTENT SECTION */}
              <div className="p-10 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Ref: #DEL-{order.id}</span>
                    <h2 className="text-3xl font-black tracking-tighter uppercase mt-2 italic flex items-center gap-3">
                      {order.pickup_location} 
                      <ArrowRight size={20} className="text-yellow-500 group-hover:translate-x-2 transition-transform" /> 
                      {order.destination}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-black italic">KES {order.price}</span>
                    <div className="flex items-center gap-2 justify-end mt-1">
                       <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.status === 'In Transit' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                       <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{order.status}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   {/* PRIMARY ACTION */}
                   <Link to={`/orders/${order.id}`} className="px-10 py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-yellow-500 hover:text-black transition-all active:scale-95 shadow-lg flex items-center gap-2">
                      <Navigation2 size={14} fill="currentColor" /> Track Journey
                   </Link>

                   {/* NEAT CANCEL BUTTON */}
                   <button 
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-8 py-5 border-2 border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-90 flex items-center gap-2"
                   >
                      <Trash2 size={14} /> Cancel Order
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {orders.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-300 font-black uppercase tracking-widest">Your fleet is empty</p>
            <Link to="/orders/new" className="text-yellow-600 font-black uppercase text-xs mt-4 block underline">Start a new shipment</Link>
          </div>
        )}
      </div>
    </div>
  );
}
