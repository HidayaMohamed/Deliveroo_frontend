import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import { orderAPI } from "../services/api";
import toast from "react-hot-toast";
import LocationAutocomplete from "../components/LocationAutocomplete";


// Set Mapbox Access Token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const defaultCenter = [36.817223, -1.286389]; // Nairobi [lng, lat]


const CreateOrder = () => {
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);
  const mapContainer = useRef(null);
 const map = useRef(null);
 const pickupMarker = useRef(null);
 const destinationMarker = useRef(null);


 const [distance, setDistance] = useState(null);
 const [duration, setDuration] = useState(null);
 const [price, setPrice] = useState(null);
 const [activeField, setActiveField] = useState('pickup'); // 'pickup' or 'destination'
  const [formData, setFormData] = useState({
   parcel_name: "",
   description: "",
   weight: "",
   pickup_address: "",
   destination_address: "",
   pickup_lat: null,
   pickup_lng: null,
   destination_lat: null,
   destination_lng: null,
 });


 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value,
   });
 };


 const activeFieldRef = useRef(activeField);


 useEffect(() => {
     activeFieldRef.current = activeField;
 }, [activeField]);


 const updateMarker = (lngLat, type) => {
     const { lng, lat } = lngLat;
    
     if (type === 'pickup') {
         if (pickupMarker.current) pickupMarker.current.remove();
         pickupMarker.current = new mapboxgl.Marker({ color: "#ea580c" }) // Orange-600
             .setLngLat([lng, lat])
             .setPopup(new mapboxgl.Popup().setText("Pickup"))
             .addTo(map.current);
     } else {
         if (destinationMarker.current) destinationMarker.current.remove();
         destinationMarker.current = new mapboxgl.Marker({ color: "#2563eb" }) // Blue-600
             .setLngLat([lng, lat])
             .setPopup(new mapboxgl.Popup().setText("Destination"))
             .addTo(map.current);
     }
 };


 async function handleMapClick(lngLat) {
     const { lng, lat } = lngLat;
     const currentActiveField = activeFieldRef.current;
    
     // Reverse geocode to get approximate address
     let address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
     try {
         const response = await axios.get(
             `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
             {
                 params: {
                     access_token: mapboxgl.accessToken,
                     limit: 1
                 }
             }
         );
         if (response.data.features && response.data.features.length > 0) {
             address = response.data.features[0].place_name;
         }
     } catch (error) {
         console.error("Reverse geocoding failed", error);
     }


     setFormData(prev => ({
         ...prev,
         [`${currentActiveField}_address`]: address,
         [`${currentActiveField}_lat`]: lat,
         [`${currentActiveField}_lng`]: lng,
     }));


     updateMarker({ lng, lat }, currentActiveField);
 }


 // Initialize Map
 useEffect(() => {
   if (map.current) return; // initialize map only once
  
   map.current = new mapboxgl.Map({
     container: mapContainer.current,
     style: 'mapbox://styles/mapbox/streets-v12',
     center: defaultCenter,
     zoom: 12
   });


   map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
   map.current.on('click', (e) => {
       handleMapClick(e.lngLat);
   });


 }, []);


 const handleLocationSelect = (data, type) => {
     const { lat, lng, address } = data;
     setFormData(prev => ({
         ...prev,
         [`${type}_address`]: address,
         [`${type}_lat`]: lat,
         [`${type}_lng`]: lng,
     }));
    
     updateMarker({ lng, lat }, type);
    
     if (map.current) {
         map.current.flyTo({ center: [lng, lat], zoom: 14 });
     }
 };


 // Calculate Distance
 useEffect(() => {
   const calculateRoute = async () => {
       if (formData.pickup_lat && formData.destination_lat) {
           try {
               const query = await axios.get(
                   `https://api.mapbox.com/directions/v5/mapbox/driving/${formData.pickup_lng},${formData.pickup_lat};${formData.destination_lng},${formData.destination_lat}`,
                   {
                       params: {
                           access_token: mapboxgl.accessToken,
                           geometries: 'geojson',
                           overview: 'full'
                       }
                   }
               );


               if (query.data.routes && query.data.routes.length > 0) {
                   const route = query.data.routes[0];
                   const distKm = route.distance / 1000;
                   const durMins = Math.round(route.duration / 60);
                  
                   setDistance(`${distKm.toFixed(1)} km`);
                   setDuration(durMins > 60 ? `${Math.floor(durMins/60)} hrs ${durMins%60} mins` : `${durMins} mins`);
                   setPrice(Math.max(distKm * 1, 10).toFixed(2)); // Min 10 KSH


                   // Draw route on map
                   if (map.current.getSource('route')) {
                       map.current.getSource('route').setData(route.geometry);
                   } else {
                       map.current.addLayer({
                           id: 'route',
                           type: 'line',
                           source: {
                               type: 'geojson',
                               data: {
                                   type: 'Feature',
                                   properties: {},
                                   geometry: route.geometry
                               }
                           },
                           layout: {
                               'line-join': 'round',
                               'line-cap': 'round'
                           },
                           paint: {
                               'line-color': '#f97316', // Orange
                               'line-width': 5,
                               'line-opacity': 0.75
                           }
                       });
                   }
                  
                   // Fit bounds
                   const bounds = new mapboxgl.LngLatBounds();
                   bounds.extend([formData.pickup_lng, formData.pickup_lat]);
                   bounds.extend([formData.destination_lng, formData.destination_lat]);
                   map.current.fitBounds(bounds, { padding: 50 });
               }
           } catch (error) {
               console.error("Error calculating route:", error);
           }
       }
   };


   calculateRoute();
 }, [formData.pickup_lat, formData.destination_lat]);




 const [parcelImage, setParcelImage] = useState(null);
 const [parcelImagePreview, setParcelImagePreview] = useState(null);


 const handleImageChange = (e) => {
   if (e.target.files && e.target.files[0]) {
     const file = e.target.files[0];
     setParcelImage(file);
     setParcelImagePreview(URL.createObjectURL(file));
   }
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);


   if (!parcelImage) {
       toast.error("Please upload a parcel image");
       setLoading(false);
       return;
   }


   try {
     const formDataToSend = new FormData();
     formDataToSend.append('parcel_name', formData.parcel_name);
     formDataToSend.append('description', formData.description);
     formDataToSend.append('weight', parseFloat(formData.weight));
     formDataToSend.append('pickup_address', formData.pickup_address);
     formDataToSend.append('destination_address', formData.destination_address);
     if (formData.pickup_lat) formDataToSend.append('pickup_lat', formData.pickup_lat);
     if (formData.pickup_lng) formDataToSend.append('pickup_lng', formData.pickup_lng);
     if (formData.destination_lat) formDataToSend.append('destination_lat', formData.destination_lat);
     if (formData.destination_lng) formDataToSend.append('destination_lng', formData.destination_lng);
     formDataToSend.append('price', price ? parseFloat(price) : 0);
     formDataToSend.append('distance', distance ? parseFloat(distance.split(' ')[0]) : 5.0);


     if (parcelImage) {
       formDataToSend.append('parcel_image', parcelImage);
     }


     const response = await orderAPI.create(formDataToSend);
     toast.success("Order created successfully!");
     navigate(`/orders/${response.data.order.id}`);
   } catch (error) {
     const message = error.response?.data?.error || "Failed to create order";
     toast.error(message);
   }


   setLoading(false);
 };


 return (
   <div className="min-h-screen bg-white py-12">
     <div className="container mx-auto px-4">
       <div className="max-w-2xl mx-auto">
         <div className="mb-10">
           <h1 className="text-3xl font-black text-black tracking-tighter uppercase">
             New{" "}
             <span className="italic font-light text-gray-400 normal-case">
               Order
             </span>
           </h1>
           <p className="text-gray-500 font-medium mt-2 text-sm">Fill in the details below to create your delivery.</p>
         </div>

         <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10">
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-1.5">
               <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                 Parcel Name *
               </label>
               <input
                 type="text"
                 name="parcel_name"
                 value={formData.parcel_name}
                 onChange={handleChange}
                 className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-bold"
                 placeholder="e.g., Documents, Electronics"
                 required
               />
             </div>

             <div className="space-y-1.5">
               <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                 Description
               </label>
               <textarea
                 name="description"
                 value={formData.description}
                 onChange={handleChange}
                 className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-bold resize-none"
                 rows="3"
               />
             </div>

             <div className="space-y-1.5">
               <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                 Parcel Image *
               </label>
               <input
                 type="file"
                 accept="image/*"
                 onChange={handleImageChange}
                 className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-bold file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
                 required
               />
               <p className="text-xs text-gray-400 font-medium ml-1">Upload an image to help the courier identify your parcel.</p>
               {parcelImagePreview && (
                 <div className="mt-3">
                   <img
                     src={parcelImagePreview}
                     alt="Parcel Preview"
                     className="w-full h-48 object-cover rounded-2xl border border-gray-100"
                   />
                 </div>
               )}
             </div>

             <div className="space-y-1.5">
               <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                 Weight (kg) *
               </label>
               <input
                 type="number"
                 name="weight"
                 value={formData.weight}
                 onChange={handleChange}
                 step="0.1"
                 min="0.1"
                 className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm font-bold"
                 required
               />
             </div>

             <div className="grid md:grid-cols-2 gap-5">
               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                   Pickup Address *
                 </label>
                 <LocationAutocomplete
                   placeholder="Search pickup location"
                   onSelect={(data) => handleLocationSelect(data, 'pickup')}
                   initialValue={formData.pickup_address}
                 />
                 {formData.pickup_lat && (
                   <p className="text-[10px] font-black uppercase tracking-[0.1em] text-green-600 ml-1">Location set</p>
                 )}
               </div>

               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                   Destination Address *
                 </label>
                 <LocationAutocomplete
                   placeholder="Search destination"
                   onSelect={(data) => handleLocationSelect(data, 'destination')}
                   initialValue={formData.destination_address}
                 />
                 {formData.destination_lat && (
                   <p className="text-[10px] font-black uppercase tracking-[0.1em] text-green-600 ml-1">Location set</p>
                 )}
               </div>
             </div>

             {distance && (
               <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex justify-between items-center">
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-1">Distance</p>
                   <p className="text-lg font-black text-black">{distance}</p>
                 </div>
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-1">Est. Time</p>
                   <p className="text-lg font-black text-black">{duration}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 mb-1">Price</p>
                   <p className="text-2xl font-black text-orange-500">KSH {price}</p>
                 </div>
               </div>
             )}

             <button
               type="submit"
               disabled={loading}
               className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:shadow-none mt-2"
             >
               {loading ? "Creating Order..." : "Create Order"}
             </button>
           </form>
         </div>
       </div>
     </div>

     {/* Map Section for Pinning */}
     <div className="container mx-auto px-4 mt-8">
       <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-10">
         <h2 className="text-xl font-black text-black uppercase tracking-tight mb-1">
           Pin on Map
         </h2>
         <p className="text-sm text-gray-400 font-medium mb-6">Click anywhere on the map to set a location.</p>

         <div className="mb-6 flex gap-3">
           <button
             onClick={() => setActiveField('pickup')}
             className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
               activeField === 'pickup'
                 ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20'
                 : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
             }`}
           >
             Set Pickup
           </button>
           <button
             onClick={() => setActiveField('destination')}
             className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
               activeField === 'destination'
                 ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20'
                 : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
             }`}
           >
             Set Destination
           </button>
         </div>

         <div
           ref={mapContainer}
           className="w-full h-[400px] rounded-2xl overflow-hidden"
         />
       </div>
     </div>
   </div>
 );
};


export default CreateOrder;
