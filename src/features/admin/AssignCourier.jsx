import { useState, useEffect } from "react";
import { getToken } from "../../utils/token";
import { get, post } from "../../api/fetchWrapper";

const AssignCourier = ({ order, onClose, onAssignComplete }) => {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableCouriers();
  }, []);

  const fetchAvailableCouriers = async () => {
    try {
      const token = getToken();
      if (!token) {
        setCouriers([]);
        return;
      }

      const data = await get(
        "/admin/users?role=courier&is_active=true&limit=100",
      );
      const transformedCouriers = (data.users || []).map((user) => ({
        id: user.id,
        name: user.full_name || "Unknown",
        phone: user.phone || "N/A",
        rating: user.rating || 4.8,
        completedDeliveries: user.total_deliveries || 0,
        currentLocation: user.current_location || "Unknown",
        distance: user.distance_from_pickup || "0 km",
        status: user.is_active ? "online" : "offline",
        vehicle: user.vehicle_type || "Motorcycle",
      }));
      setCouriers(transformedCouriers);
    } catch (error) {
      console.error("Error fetching couriers:", error);
      setCouriers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedCourier) {
      alert("Please select a courier");
      return;
    }

    setIsAssigning(true);
    try {
      const token = getToken();
      if (!token) {
        alert("You must be logged in to assign a courier");
        return;
      }
      // Use orderId instead of order.id since order may have tracking_number
      const orderId = order.orderId || order.id;

      await post(`/admin/orders/${orderId}/assign`, {
        courier_id: selectedCourier.id,
      });
      onAssignComplete();
    } catch (error) {
      alert(`Failed to assign courier: ${error.message}`);
    } finally {
      setIsAssigning(false);
    }
  };

  const filteredCouriers = couriers.filter(
    (courier) =>
      courier.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      courier.id?.toString().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Order Info */}
      <div className="bg-gray-50 rounded-[30px] p-6 border border-gray-100">
        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
          Order Details
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest mb-1">
              Order ID
            </p>
            <p className="font-black text-lg">
              {order?.id || order?.tracking_number}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest mb-1">
              Customer
            </p>
            <p className="font-black text-lg">
              {order?.customer || "Customer"}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest mb-1">
              Pickup
            </p>
            <p className="font-bold text-sm">
              📍 {order?.pickup || order?.pickup_address || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest mb-1">
              Destination
            </p>
            <p className="font-bold text-sm">
              📍 {order?.destination || order?.destination_address || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search couriers by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 bg-gray-50 rounded-[25px] border border-gray-100 outline-none font-bold text-sm focus:ring-4 focus:ring-yellow-100 transition-all"
        />
        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Available Couriers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 underline decoration-yellow-500 decoration-2 underline-offset-8">
            Available Couriers ({filteredCouriers.length})
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">
              Online Now
            </span>
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredCouriers.map((courier) => (
            <div
              key={courier.id}
              onClick={() => setSelectedCourier(courier)}
              className={`group p-6 rounded-[30px] border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${
                  selectedCourier?.id === courier.id
                    ? "border-yellow-500 bg-yellow-50 shadow-lg"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl font-black">
                      {courier.name?.[0] || "C"}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${courier.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                    ></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-black text-lg mb-1">
                          {courier.name}
                        </h5>
                        <p className="text-[9px] font-bold uppercase text-gray-400 tracking-widest">
                          ID: {courier.id}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">
                          Rating
                        </p>
                        <p className="font-black text-yellow-600 flex items-center gap-1">
                          {courier.rating} ⭐
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">
                          Deliveries
                        </p>
                        <p className="font-black">
                          {courier.completedDeliveries || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">
                          Location
                        </p>
                        <p className="font-bold text-sm">
                          📍 {courier.currentLocation}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">
                          Distance
                        </p>
                        <p className="font-black text-green-600">
                          {courier.distance}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="px-3 py-1 bg-gray-100 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {courier.vehicle}
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                        Available
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCourier?.id === courier.id && (
                  <div className="ml-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-black">
                      ✓
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCouriers.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-[30px]">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-black text-gray-400 mb-2">
              No Couriers Found
            </p>
            <p className="text-[9px] font-bold uppercase text-gray-300 tracking-widest">
              Try a different search term
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={onClose}
          className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleAssign}
          disabled={!selectedCourier || isAssigning}
          className="flex-1 py-4 bg-yellow-500 text-black rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 active:scale-95"
        >
          {isAssigning ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Assigning...
            </span>
          ) : (
            `Assign ${selectedCourier ? selectedCourier.name : "Courier"}`
          )}
        </button>
      </div>
    </div>
  );
};

export default AssignCourier;
