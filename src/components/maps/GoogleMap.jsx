export default function GoogleMap({
  pickup = null,
  destination = null,
  courierLocation = null,
  height = "400px",
}) {
  // Check if Google Maps API is available
  const hasGoogleMaps = () => {
    return (
      typeof window.google !== "undefined" &&
      window.google.maps &&
      window.google.maps.Map
    );
  };

  const googleLoaded = hasGoogleMaps();

  // Render placeholder if no API key
  if (!googleLoaded) {
    return (
      <div
        className="bg-gray-100 rounded-lg flex flex-col items-center justify-center"
        style={{ height }}
      >
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🗺️</div>
          <h3 className="font-semibold text-gray-700 mb-2">Google Maps</h3>
          <p className="text-sm text-gray-500 mb-4">
            Add VITE_GOOGLE_MAPS_API_KEY to enable maps
          </p>
          <div className="text-xs text-gray-400 bg-white p-3 rounded-lg">
            {pickup && destination ? (
              <div>
                <p>📍 Pickup: {pickup.address || "Selected"}</p>
                <p>🏁 Destination: {destination.address || "Selected"}</p>
                {courierLocation && <p>🚗 Courier: Active</p>}
              </div>
            ) : (
              <p>Select pickup and destination to see route</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Placeholder for when API is available
  return (
    <div
      className="bg-gray-100 rounded-lg flex items-center justify-center"
      style={{ height }}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-gray-600">
          {pickup?.address || "Pickup"} →{" "}
          {destination?.address || "Destination"}
        </p>
        {courierLocation && (
          <p className="text-sm text-blue-600 mt-1">
            🚗 Courier tracking active
          </p>
        )}
      </div>
    </div>
  );
}
