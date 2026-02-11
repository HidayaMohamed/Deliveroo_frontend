import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import Navbar from "../components/Navbar";
import OrdersList from "../components/orders/OrdersList";
import UserProfile from "../features/user/UserProfile";

export default function CourierDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-grayDark">
            Hey {user?.full_name || "Rider"} 🚴
          </h1>
          <p className="text-gray-600">Deliver parcels and earn money</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Today's Deliveries</p>
            <p className="text-3xl font-bold text-brand-orange">5</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Available Orders</p>
            <p className="text-3xl font-bold text-blue-600">8</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">47</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Earnings Today</p>
            <p className="text-3xl font-bold text-brand-grayDark">KES 2,500</p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "orders"
                ? "bg-brand-orange text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            📦 Available Orders
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "my"
                ? "bg-brand-orange text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            🚴 My Deliveries
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "profile"
                ? "bg-brand-orange text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            👤 Profile
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {activeTab === "orders" && <OrdersList role="courier" />}
          {activeTab === "my" && (
            <OrdersList role="courier" filter="ASSIGNED" />
          )}
          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>
    </div>
  );
}
