import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

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

export default function LiveTrackingMap() {
  // 1. Initial Position (Start of the route)
  const [carPos, setCarPos] = useState([-1.289, 36.788]); 

  // 2. The Route Path (Mock points from Kilimani to Westlands)
  const routePath = [
    [-1.289, 36.788],
    [-1.285, 36.792],
    [-1.275, 36.798],
    [-1.263, 36.804],
  ];

  // 3. Simulate Movement (This replaces the backend for now)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < routePath.length) {
        setCarPos(routePath[i]);
        i++;
      }
    }, 4000); // Moves every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer 
      center={[-1.280, 36.795]} 
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
      <Marker position={[-1.263, 36.804]} />
    </MapContainer>
  );
}