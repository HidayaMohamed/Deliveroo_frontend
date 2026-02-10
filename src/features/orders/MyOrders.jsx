import { useEffect, useState } from "react";
import { getMyOrders } from "./ordersAPI"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Add for spectacular animations

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders()
      .then(res => setOrders(res.data))
      .catch(err => {
        console.warn("Backend offline: Showing Demo Fleet");
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
      });
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-8 py-20 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-8xl font-black tracking-tighter mb-16 italic">
          Fleet<span className="text-yellow-500">.</span>
        </h1>
      </motion.div>
      
      <div className="grid gap-10">
        {orders.map((order, idx) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex bg-gray-50 rounded-[50px] overflow-hidden border border-transparent hover:border-black hover:bg-white hover:shadow-2xl transition-all duration-500 group"
          >
            <div className="w-1/3 bg-zinc-200 h-64 overflow-hidden">
               <img 
                 src="https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg" 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                 alt="Logistics"
               />
            </div>
            <div className="p-12 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tracking ID: #DEL-{order.id}</span>
                  <h2 className="text-4xl font-black tracking-tighter uppercase mt-2 italic">{order.pickup_location} → {order.destination}</h2>
                </div>
                <span className="text-2xl font-black text-yellow-600 italic">KES {order.price}</span>
              </div>
              <div className="flex items-center gap-6">
                 <Link to={`/orders/${order.id}`} className="px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-yellow-500 transition-all active:scale-95 shadow-lg">
                    Track Journey
                 </Link>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[11px] font-black text-black uppercase tracking-widest">{order.status}</span>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}