import { Link } from "react-router-dom";

export default function OrderCard({ order, showCourier = false, showAssign = false, onAssign }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "ASSIGNED":
        return "bg-blue-100 text-blue-800";
      case "PICKED_UP":
        return "bg-indigo-100 text-indigo-800";
      case "IN_TRANSIT":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Order Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">
              #{order.tracking_number || order.id}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
          <p className="font-semibold text-brand-grayDark mb-1">
            {order.pickup_address} → {order.destination_address}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{order.distance_km || 0} km</span>
            <span>KES {order.total_price || 0}</span>
            <span>{order.weight_kg || 0} kg</span>
            <span>
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Courier Info */}
        {showCourier && order.courier && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Assigned Courier</p>
            <p className="font-semibold">{order.courier.full_name || "N/A"}</p>
            <p className="text-sm text-gray-600">{order.courier.phone || "No phone"}</p>
            {order.courier.vehicle_type && (
              <p className="text-xs text-gray-500 capitalize">
                {order.courier.vehicle_type} • {order.courier.plate_number}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={`/orders/${order.id}`}
            className="text-brand-orange font-semibold hover:underline text-sm"
          >
            View Details
          </Link>
          {showAssign && (
            <button
              onClick={() => onAssign && onAssign(order)}
              className="bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition text-sm"
            >
              Assign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
