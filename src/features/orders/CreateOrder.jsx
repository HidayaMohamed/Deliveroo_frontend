import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, createOrder, initiateMpesa } from "./ordersAPI";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [pickupAddress, setPickupAddress] = useState("");
  const [pickupLat, setPickupLat] = useState(null);
  const [pickupLng, setPickupLng] = useState(null);
  const [destAddress, setDestAddress] = useState("");
  const [destLat, setDestLat] = useState(null);
  const [destLng, setDestLng] = useState(null);
  const [weightKg, setWeightKg] = useState(5);
  const [parcelDesc, setParcelDesc] = useState("");
  const [isFragile, setIsFragile] = useState(false);
  const [needsInsurance, setNeedsInsurance] = useState(false);
  const [isExpress, setIsExpress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [priceEstimate, setPriceEstimate] = useState(null);

  // Weight categories matching backend
  const weightCategories = [
    { value: "SMALL", label: "Small (< 5kg)", basePrice: 150 },
    { value: "MEDIUM", label: "Medium (5-20kg)", basePrice: 300 },
    { value: "LARGE", label: "Large (20-50kg)", basePrice: 500 },
    { value: "XLARGE", label: "Extra Large (>50kg)", basePrice: 1000 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
        setUser({ full_name: "Demo User", phone: "+254712345678" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate price estimate when form changes
  useEffect(() => {
    if (pickupLat && destLat && weightKg) {
      calculateEstimate();
    }
  }, [pickupLat, destLat, weightKg, isFragile, needsInsurance, isExpress]);

  const calculateEstimate = async () => {
    try {
      // For demo, calculate locally (would call backend in production)
      const distance = 5 + Math.random() * 20; // Mock distance
      const basePrice = weightCategories.find(c => {
        const w = parseFloat(weightKg);
        if (c.value === "SMALL" && w < 5) return true;
        if (c.value === "MEDIUM" && w >= 5 && w < 20) return true;
        if (c.value === "LARGE" && w >= 20 && w < 50) return true;
        if (c.value === "XLARGE" && w >= 50) return true;
        return false;
      })?.basePrice || 200;

      const distancePrice = distance * 50;
      let total = 150 + distancePrice + basePrice;

      if (isFragile) total += total * 0.15;
      if (needsInsurance) total += total * 0.10;
      if (isExpress) total += total * 0.25;

      setPriceEstimate({
        distance: distance.toFixed(1),
        breakdown: { base: 150, distance: distancePrice, weight: basePrice },
        total: Math.round(total)
      });
    } catch (err) {
      console.error("Estimate error:", err);
    }
  };

  const handleSubmit = async () => {
    if (!pickupAddress || !destAddress || !pickupLat || !destLat) {
      alert("Please select valid pickup and destination locations");
      return;
    }

    setIsProcessing(true);
    try {
      // Create order
      const orderRes = await createOrder({
        pickup_address: pickupAddress,
        pickup_lat: pickupLat,
        pickup_lng: pickupLng,
        destination_address: destAddress,
        destination_lat: destLat,
        destination_lng: destLng,
        weight_kg: parseFloat(weightKg),
        parcel_description: parcelDesc,
        fragile: isFragile,
        insurance_required: needsInsurance,
        is_express: isExpress,
      });

      // Initiate M-Pesa payment
      await initiateMpesa({
        phone: user.phone,
        amount: priceEstimate?.total || 500
      });

      alert("M-PESA STK Push sent! Check your phone.");
      navigate(`/orders/${orderRes.data.id}`);
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-brand-grayDark mb-8">
          📦 Create New Order
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Pickup */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Enter pickup address"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 In production: Google Places Autocomplete
              </p>
            </div>

            {/* Destination */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Destination
              </label>
              <input
                type="text"
                value={destAddress}
                onChange={(e) => setDestAddress(e.target.value)}
                placeholder="Enter destination address"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>

            {/* Weight */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Parcel Weight (kg)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                min="0.1"
                step="0.1"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {weightCategories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setWeightKg(cat.value === "SMALL" ? 2 : cat.value === "MEDIUM" ? 10 : cat.value === "LARGE" ? 30 : 60)}
                    className="px-3 py-1 text-xs rounded-full bg-gray-100 hover:bg-brand-orange hover:text-white transition"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">Delivery Options</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isFragile}
                    onChange={(e) => setIsFragile(e.target.checked)}
                    className="w-5 h-5 text-brand-orange rounded"
                  />
                  <span>Fragile Item (+15%)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={needsInsurance}
                    onChange={(e) => setNeedsInsurance(e.target.checked)}
                    className="w-5 h-5 text-brand-orange rounded"
                  />
                  <span>Insurance (+10%)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isExpress}
                    onChange={(e) => setIsExpress(e.target.checked)}
                    className="w-5 h-5 text-brand-orange rounded"
                  />
                  <span>Express Delivery (+25%)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Map */}
          <div className="space-y-6">
            {/* Price Estimate */}
            {priceEstimate && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-lg mb-4">💰 Price Estimate</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Price</span>
                    <span>KES {priceEstimate.breakdown.base}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance ({priceEstimate.distance} km)</span>
                    <span>KES {priceEstimate.breakdown.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight Category</span>
                    <span>KES {priceEstimate.breakdown.weight}</span>
                  </div>
                  {isFragile && (
                    <div className="flex justify-between text-orange-600">
                      <span>Fragile (+15%)</span>
                      <span>+KES {Math.round(priceEstimate.total * 0.15)}</span>
                    </div>
                  )}
                  {needsInsurance && (
                    <div className="flex justify-between text-orange-600">
                      <span>Insurance (+10%)</span>
                      <span>+KES {Math.round(priceEstimate.total * 0.10)}</span>
                    </div>
                  )}
                  {isExpress && (
                    <div className="flex justify-between text-orange-600">
                      <span>Express (+25%)</span>
                      <span>+KES {Math.round(priceEstimate.total * 0.25)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-brand-orange">KES {priceEstimate.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-4">🗺️ Route Preview</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                {pickupAddress && destAddress ? (
                  <div className="text-center">
                    <p className="text-2xl mb-2">📍 → 📍</p>
                    <p className="text-sm text-gray-500">
                      {pickupAddress} → {destAddress}
                    </p>
                    {priceEstimate && (
                      <p className="text-sm text-brand-orange mt-2">
                        {priceEstimate.distance} km
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400">Enter addresses to see route</p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Google Maps integration requires API key
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !pickupAddress || !destAddress}
              className="w-full py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                "🚗 Create Order & Pay with M-Pesa"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
