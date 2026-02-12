import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { createOrder } from "../../api/orders";
import {
  initiatePayment,
  pollPaymentStatus,
  validatePhoneNumber,
} from "../../api/payments";
import {
  X,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import LocationPicker from "../../components/maps/LocationPicker";

const STEP_LABELS = {
  idle: null,
  creating: "Creating order...",
  initiating: "Initiating payment...",
  polling: "Waiting for M-Pesa confirmation...",
  success: null,
  error: null,
};

const WEIGHT_OPTIONS = {
  LIGHT: { label: "Light", kg: 3, price: 500 },
  MEDIUM: { label: "Medium", kg: 12, price: 2000 },
  HEAVY: { label: "Heavy", kg: 35, price: 3000 },
};

export default function CreateOrder() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [weight, setWeight] = useState("LIGHT");
  const [pickup, setPickup] = useState({ lat: null, lng: null, address: "" });
  const [dropoff, setDropoff] = useState({ lat: null, lng: null, address: "" });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const vehicles = {
    LIGHT: "https://images.pexels.com/photos/4391469/pexels-photo-4391469.jpeg",
    MEDIUM:
      "https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg",
    HEAVY:
      "https://images.pexels.com/photos/29057942/pexels-photo-29057942.jpeg",
  };

  useEffect(() => {
    if (user?.phone) {
      const cleaned = user.phone.replace(/[^0-9]/g, "");
      setPhoneNumber(cleaned);
    }
  }, [user]);

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setPhoneError("");

    if (value.length > 0) {
      const { valid, error } = validatePhoneNumber(value);
      if (!valid) setPhoneError(error);
    }
  };

  const handleSubmit = async () => {
    if (!pickup.lat || !pickup.address) {
      setErrorMessage("Please select a pickup location.");
      return;
    }

    if (!dropoff.lat || !dropoff.address) {
      setErrorMessage("Please select a drop-off location.");
      return;
    }

    const { valid, phone, error } = validatePhoneNumber(phoneNumber);
    if (!valid) {
      setPhoneError(error);
      return;
    }

    try {
      setStep("creating");

      const selectedWeight = WEIGHT_OPTIONS[weight];

      const result = await createOrder({
        pickup_address: pickup.address,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        destination_address: dropoff.address,
        destination_lat: dropoff.lat,
        destination_lng: dropoff.lng,
        weight_kg: selectedWeight.kg,
        parcel_description: description || `${selectedWeight.label} shipment`,
      });

      const orderId = result.order?.id || result.id;

      setStep("initiating");
      await initiatePayment(orderId, phone);

      setStep("polling");
      const paymentResult = await pollPaymentStatus(orderId);

      setStep("success");
      setStatusMessage(
        `Payment successful! Receipt: ${
          paymentResult.mpesa_receipt_number || "confirmed"
        }`,
      );

      setTimeout(() => navigate("/orders"), 2500);
    } catch (err) {
      setStep("error");
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  const isProcessing = !["idle", "success", "error"].includes(step);
  const displayPrice = WEIGHT_OPTIONS[weight].price;

  return (
    <div className="min-h-screen bg-white text-black pb-32">
      <div className="max-w-[1400px] mx-auto px-8 pt-16">
        <header className="mb-20">
          <h1 className="text-6xl font-black tracking-tight mb-4">
            Create Shipment
          </h1>
          <p className="text-gray-400 text-sm">
            Billing to: {user?.phone || user?.email}
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* LEFT SIDE */}
          <div className="lg:col-span-8 space-y-12">
            <h3 className="text-sm font-bold uppercase text-gray-400">
              Fleet Selection
            </h3>

            <div className="grid gap-10">
              {Object.keys(WEIGHT_OPTIONS).map((cat) => (
                <div
                  key={cat}
                  onClick={() => setWeight(cat)}
                  className={`relative h-[350px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    weight === cat
                      ? "ring-4 ring-yellow-500"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={vehicles[cat]}
                    alt={cat}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h2 className="text-3xl font-black">{cat} PRIORITY</h2>
                    <p className="text-sm">Up to {WEIGHT_OPTIONS[cat].kg}kg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-6">Shipment Summary</h3>

              <LocationPicker
                label="Pickup"
                value={pickup}
                onChange={setPickup}
              />

              <LocationPicker
                label="Dropoff"
                value={dropoff}
                onChange={setDropoff}
              />

              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-4 p-3 rounded-lg border"
              />

              <input
                type="tel"
                placeholder="254XXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full mt-4 p-3 rounded-lg border"
              />

              {phoneError && (
                <p className="text-red-500 text-sm mt-2">{phoneError}</p>
              )}

              <div className="mt-6 flex justify-between font-bold">
                <span>Total</span>
                <span>KES {displayPrice}</span>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </button>

              {step === "success" && (
                <p className="text-green-600 mt-4 text-sm">{statusMessage}</p>
              )}

              {step === "error" && (
                <p className="text-red-600 mt-4 text-sm">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
