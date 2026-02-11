import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import Navbar from "../components/Navbar";
import OrdersList from "../components/orders/OrdersList";
import UserProfile from "../features/user/UserProfile";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");

  // Suppress unused variable warning for user
  void user;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-grayDark">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-gray-600">Manage couriers, orders, and platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-brand-orange">156</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Active Couriers</p>
            <p className="text-3xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Pending Assignment</p>
            <p className="text-3xl font-bold text-yellow-600">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Revenue Today</p>
            <p className="text-3xl font-bold text-green-600">KES 45,200</p>
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
            📋 All Orders
          </button>
          <button
            onClick={() => setActiveTab("couriers")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "couriers"
                ? "bg-brand-orange text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            🚴 Manage Couriers
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "users"
                ? "bg-brand-orange text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            👥 Users
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "profile"
                ? "bg-brand-orange text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            👤 Admin Profile
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {activeTab === "orders" && <OrdersList role="admin" />}
          {activeTab === "couriers" && (
            <div className="text-center py-12">
              <p className="text-gray-500">Courier management coming soon...</p>
            </div>
          )}
          {activeTab === "users" && (
            <div className="text-center py-12">
              <p className="text-gray-500">User management coming soon...</p>
            </div>
          )}
          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>
    </div>
  );
}
