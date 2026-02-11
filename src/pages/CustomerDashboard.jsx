import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import Navbar from "../components/Navbar";
import OrdersList from "../components/orders/OrdersList";
import CreateOrder from "../features/orders/CreateOrder";
import UserProfile from "../features/user/UserProfile";
import { Link } from "react-router-dom";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-grayDark">
            Welcome back, {user?.full_name || "Customer"} 👋
          </h1>
          <p className="text-gray-600">Manage your deliveries and orders</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/customer/orders/new"
            className="bg-brand-orange text-white p-6 rounded-xl hover:bg-orange-600 transition"
          >
            <h3 className="font-bold text-lg mb-2">📦 New Order</h3>
            <p className="text-sm opacity-90">Send a package anywhere</p>
          </Link>
          <button
            onClick={() => setActiveTab("orders")}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-brand-orange transition text-left"
          >
            <h3 className="font-bold text-lg mb-2 text-brand-grayDark">
              📋 My Orders
            </h3>
            <p className="text-sm text-gray-500">View order history</p>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-brand-orange transition text-left"
          >
            <h3 className="font-bold text-lg mb-2 text-brand-grayDark">
              👤 My Profile
            </h3>
            <p className="text-sm text-gray-500">Manage account</p>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-brand-grayDark">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">In Transit</p>
            <p className="text-3xl font-bold text-blue-600">2</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Delivered</p>
            <p className="text-3xl font-bold text-green-600">9</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Total Spent</p>
            <p className="text-3xl font-bold text-brand-orange">KES 15,400</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {activeTab === "orders" && <OrdersList role="customer" />}
          {activeTab === "profile" && <UserProfile />}
        </div>
      </div>
    </div>
  );
}
