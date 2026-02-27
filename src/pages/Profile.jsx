import { useEffect, useState } from "react";
import { authAPI, courierAPI } from "../services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    phone: "",
    vehicle_type: "",
    plate_number: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await authAPI.getMe();
        setUser(userRes.data);
        setEditForm({
          full_name: userRes.data.full_name || "",
          phone: userRes.data.phone || "",
          vehicle_type: userRes.data.vehicle_type || "",
          plate_number: userRes.data.plate_number || "",
        });

        if (userRes.data.role === "courier") {
          const statsRes = await courierAPI.getStats();
          setStats(statsRes.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.updateProfile(editForm);
      setUser(res.data.user);
      toast.success("Profile updated successfully");
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update profile");
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center bg-white min-h-screen pt-20">
        Loading Profile...
      </div>
    );

  if (!user)
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Failed to load user data
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-black tracking-tighter uppercase">
            My Profile
          </h1>
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
          >
            Edit Profile
          </button>
        </div>

        <div className="bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[32px] border border-gray-100 p-8 mb-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-yellow-400 text-3xl font-black">
              {user.full_name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black text-black uppercase tracking-tight">
                {user.full_name}
              </h2>
              <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mt-2 inline-block">
                {user.role}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                Email Address
              </p>
              <p className="font-bold text-lg text-black">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                Phone Number
              </p>
              <p className="font-bold text-lg text-black">
                {user.phone || "Not provided"}
              </p>
            </div>
            {user.role === "courier" && (
              <>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Vehicle Type
                  </p>
                  <p className="font-bold text-lg text-black capitalize">
                    {user.vehicle_type}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                    Plate Number
                  </p>
                  <p className="font-bold text-lg text-black">
                    {user.plate_number}
                  </p>
                </div>
              </>
            )}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                Member Since
              </p>
              <p className="font-bold text-lg text-black">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                Account Status
              </p>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {user.role === "courier" && stats && (
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tighter mb-6">
              Performance & Earnings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-all duration-500">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Total Deliveries
                </p>
                <p className="text-5xl font-black text-black tracking-tighter">
                  {stats.delivered_orders}
                </p>
              </div>
              <div className="bg-white p-8 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-all duration-500">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Total Earnings
                </p>
                <p className="text-5xl font-black text-yellow-400 tracking-tighter">
                  KSH {stats.earnings.toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-8 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 hover:-translate-y-2 transition-all duration-500">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                  Active Orders
                </p>
                <p className="text-5xl font-black text-black tracking-tighter">
                  {stats.in_transit_orders}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-[24px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-6">
                Edit Profile
              </h2>
              <form onSubmit={handleUpdateProfile}>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, full_name: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold"
                    />
                  </div>
                  {user.role === "courier" && (
                    <>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                          Vehicle Type
                        </label>
                        <select
                          value={editForm.vehicle_type}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              vehicle_type: e.target.value,
                            })
                          }
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                        >
                          <option value="motorbike">Motorbike</option>
                          <option value="car">Car</option>
                          <option value="bicycle">Bicycle</option>
                          <option value="van">Van</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">
                          Plate Number
                        </label>
                        <input
                          type="text"
                          value={editForm.plate_number}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              plate_number: e.target.value,
                            })
                          }
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 focus:bg-white outline-none transition-all text-sm font-bold"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-8 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-400 text-black py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
