import { useState, useEffect } from "react";

const Dashboard = ({ stats, showDetailedAnalytics = false }) => {
  const [recentActivity, setRecentActivity] = useState([]);
  const [performanceData, setPerformanceData] = useState({
    deliverySuccess: 98.5,
    customerSatisfaction: 4.8,
    avgResponseTime: 12,
    peakHours: "12:00 PM - 2:00 PM"
  });

  useEffect(() => {
    // Simulated recent activity data
    setRecentActivity([
      { id: 1, type: "delivery", message: "Order #1234 delivered successfully", time: "2 mins ago", status: "success" },
      { id: 2, type: "courier", message: "New courier John Doe joined", time: "15 mins ago", status: "info" },
      { id: 3, type: "order", message: "Order #1235 picked up", time: "23 mins ago", status: "progress" },
      { id: 4, type: "payment", message: "Payment received for Order #1233", time: "45 mins ago", status: "success" },
      { id: 5, type: "alert", message: "Courier reported traffic delay", time: "1 hr ago", status: "warning" },
    ]);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      success: "bg-green-500",
      info: "bg-blue-500",
      progress: "bg-yellow-500",
      warning: "bg-orange-500",
      error: "bg-red-500"
    };
    return colors[status] || "bg-gray-500";
  };

  const getStatusIcon = (type) => {
    const icons = {
      delivery: "🚚",
      courier: "👤",
      order: "📦",
      payment: "💰",
      alert: "⚠️"
    };
    return icons[type] || "📌";
  };

  // Top couriers data with real names
  const topCouriers = [
    {
      id: "CR001",
      name: "Peter Omondi",
      deliveries: 156,
      rating: 4.9
    },
    {
      id: "CR002",
      name: "James Mwangi",
      deliveries: 142,
      rating: 4.8
    },
    {
      id: "CR003",
      name: "Sarah Akinyi",
      deliveries: 135,
      rating: 4.7
    }
  ];

  if (!showDetailedAnalytics) {
    return (
      <div className="space-y-10">
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Success Rate</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h4 className="text-4xl font-black italic text-green-600 mb-2">{performanceData.deliverySuccess}%</h4>
            <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">Delivery Success</p>
          </div>

          <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Rating</span>
              <span className="text-yellow-500">⭐</span>
            </div>
            <h4 className="text-4xl font-black italic text-yellow-600 mb-2">{performanceData.customerSatisfaction}</h4>
            <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">Customer Satisfaction</p>
          </div>

          <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Response</span>
              <span className="text-blue-500">⚡</span>
            </div>
            <h4 className="text-4xl font-black italic text-blue-600 mb-2">{performanceData.avgResponseTime}m</h4>
            <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">Avg Response Time</p>
          </div>

          <div className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Peak Hours</span>
              <span className="text-orange-500">🔥</span>
            </div>
            <h4 className="text-xl font-black italic text-orange-600 mb-2">{performanceData.peakHours}</h4>
            <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">Busiest Period</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight italic">Recent Activity</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Live Updates</span>
            </div>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="group flex items-start gap-4 p-4 rounded-[25px] hover:bg-gray-50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {getStatusIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-800 mb-1">{activity.message}</p>
                  <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.status)} flex-shrink-0 mt-2`}></div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-4 bg-gray-50 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:bg-gray-100 transition-all">
            View All Activity
          </button>
        </div>
      </div>
    );
  }

  // Detailed Analytics View
  return (
    <div className="space-y-10">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 underline decoration-yellow-500 decoration-2 underline-offset-8">
            Delivery Performance
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-700">On-Time Deliveries</span>
                <span className="text-2xl font-black italic text-green-600">94%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-700">Same-Day Completion</span>
                <span className="text-2xl font-black italic text-yellow-600">87%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-700">Customer Satisfaction</span>
                <span className="text-2xl font-black italic text-blue-600">4.8/5</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 underline decoration-yellow-500 decoration-2 underline-offset-8">
            Revenue Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-[20px]">
              <div>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Light Deliveries</p>
                <p className="text-xl font-black italic">KES 45,000</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-[20px]">
              <div>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Medium Deliveries</p>
                <p className="text-xl font-black italic">KES 82,000</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-[20px]">
              <div>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">Heavy Deliveries</p>
                <p className="text-xl font-black italic">KES 156,000</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Couriers */}
      <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 underline decoration-yellow-500 decoration-2 underline-offset-8">
          Top Performing Couriers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCouriers.map((courier, index) => (
            <div key={courier.id} className="group relative p-6 bg-gray-50 rounded-[30px] hover:bg-yellow-50 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-black text-white">
                  #{index + 1}
                </div>
              </div>
              <div className="mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 mb-3 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h4 className="font-black text-lg mb-1">{courier.name}</h4>
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">ID: {courier.id}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Deliveries</span>
                  <span className="font-black">{courier.deliveries}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-black text-yellow-600">{courier.rating}/5 ⭐</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;