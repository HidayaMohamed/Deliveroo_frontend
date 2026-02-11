import { useAuth } from "../auth/useAuth";

export default function UserProfile() {
  const { user } = useAuth();

  // Fallback demo data if no user
  const profile = user || {
    full_name: "Sharon Njoroge",
    email: "sharon.n@deliveroo.ke",
    phone: "+254 712 345 678",
    role: "customer",
    vehicle_type: null,
    plate_number: null,
    created_at: "2024-03-15",
  };

  const isCourier = profile.role === "courier";

  return (
    <div className="min-h-screen bg-brand-cream py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.full_name?.[0] || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-grayDark">
                {profile.full_name}
              </h1>
              <p className="text-gray-500 capitalize">{profile.role}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-lg font-semibold text-brand-grayDark mb-6">
            Account Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium">{profile.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="font-medium capitalize">{profile.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="font-medium">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Courier-specific info */}
          {isCourier && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-md font-semibold text-brand-grayDark mb-4">
                Vehicle Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Vehicle Type</p>
                  <p className="font-medium capitalize">
                    {profile.vehicle_type || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Plate Number</p>
                  <p className="font-medium">
                    {profile.plate_number || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-2xl font-bold text-brand-orange">142</p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-2xl font-bold text-brand-orange">3</p>
            <p className="text-sm text-gray-500">Active</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-2xl font-bold text-brand-orange">4.8</p>
            <p className="text-sm text-gray-500">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
