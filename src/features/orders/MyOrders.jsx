import { useEffect, useState } from "react";
import { getMyOrders } from "./ordersAPI"; 
import { Link } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(res => setOrders(res.data));
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto px-8 py-20 min-h-screen">
      <h1 className="text-5xl font-black tracking-tighter mb-16">Active Logistics.</h1>
      
      <div className="grid gap-10">
        {orders.map((order) => (
          <div key={order.id} className="flex bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 hover:border-yellow-500 transition-all duration-500">
            <div className="w-1/3 bg-zinc-200 h-64">
               <img src="https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="p-10 flex-1 flex flex-col justify-between">
              <div className="flex justify-between">
                <h2 className="text-2xl font-black tracking-tighter uppercase">{order.pickup_location} → {order.destination}</h2>
                <span className="text-yellow-600 font-black italic">KES {order.price}</span>
              </div>
              <div className="flex items-center gap-4">
                 <Link to={`/orders/${order.id}`} className="px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-yellow-500 transition-colors">
                    Track Journey
                 </Link>
                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{order.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}