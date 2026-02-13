import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { getOrderTracking } from "../../api/orders";

// Fix for default Leaflet icons not showing up in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Luxury Car Icon
const carIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png", 
  iconSize: [35, 35],
});

export default function LiveTrackingMap({ orderId, pickup, destination }) {
  const fallbackPickup = pickup || [-1.289, 36.788];
  const fallbackDestination = destination || [-1.263, 36.804];

  const [carPos, setCarPos] = useState(fallbackPickup);
  const [routePath, setRoutePath] = useState([fallbackPickup, fallbackDestination]);

  useEffect(() => {
    if (!orderId) return;

    const normalizePoint = (lat, lng) => {
      const nLat = Number(lat);
      const nLng = Number(lng);
      if (Number.isNaN(nLat) || Number.isNaN(nLng)) return null;
      return [nLat, nLng];
    };

    const fetchTracking = async () => {
      try {
        const data = await getOrderTracking(orderId);
        const current = data?.current_location;
        const currentPoint = current
          ? normalizePoint(current.latitude, current.longitude)
          : null;

        if (currentPoint) {
          setCarPos(currentPoint);
        }

        const history = Array.isArray(data?.tracking_history)
          ? data.tracking_history
          : [];

        const historyPath = history
          .map((p) => normalizePoint(p.latitude, p.longitude))
          .filter(Boolean)
          .reverse();

        if (historyPath.length >= 2) {
          setRoutePath(historyPath);
        } else if (currentPoint) {
          setRoutePath([fallbackPickup, currentPoint, fallbackDestination]);
        }
      } catch (error) {
        console.error("Failed to fetch tracking:", error);
      }
    };

    fetchTracking();
    const interval = setInterval(fetchTracking, 10000);
    return () => clearInterval(interval);
  }, [orderId, fallbackPickup, fallbackDestination]);

  return (
    <MapContainer 
      center={carPos || fallbackPickup} 
      zoom={13} 
      style={{ height: "100%", width: "100%", background: "#1a1a1a" }}
    >
      {/* Luxury Dark Mode Map Tiles */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap'
      />
      
      {/* Route Line */}
      <Polyline positions={routePath} color="#d4af37" weight={3} dashArray="5, 10" />

      {/* Moving Rider */}
      <Marker position={carPos} icon={carIcon} />

      {/* Destination Marker */}
      <Marker position={fallbackDestination} />
    </MapContainer>
  );
}