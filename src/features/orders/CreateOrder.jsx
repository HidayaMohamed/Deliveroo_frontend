import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { createOrder } from "../../api/orders";
import { initiatePayment, pollPaymentStatus, validatePhoneNumber } from "../../api/payments";
import { X, ShieldCheck, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
    MEDIUM: "https://images.pexels.com/photos/13033926/pexels-photo-13033926.jpeg",
    HEAVY: "https://images.pexels.com/photos/29057942/pexels-photo-29057942.jpeg",
  };

  useEffect(() => {
    if (user?.phone) {
      const cleaned = user.phone.replace(/[^0-9]/g, "");
      setPhoneNumber(cleaned.startsWith("254") ? cleaned : cleaned);
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
      setErrorMessage("Please select a pickup location on the map.");
      return;
    }
    if (!dropoff.lat || !dropoff.address) {
      setErrorMessage("Please select a drop-off location on the map.");
      return;
    }

    const { valid, phone, error } = validatePhoneNumber(phoneNumber);
    if (!valid) {
      setPhoneError(error);
      return;
    }

    setErrorMessage("");
    setStatusMessage("");

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
        parcel_description: description || `${selectedWeight.label} priority shipment`,
      });

      const orderId = result.order?.id || result.id;

      setStep("initiating");
      await initiatePayment(orderId, phone);

      setStep("polling");
      setStatusMessage("Check your phone for M-Pesa prompt");

      const paymentResult = await pollPaymentStatus(orderId);

      setStep("success");
      setStatusMessage(`Payment successful! Receipt: ${paymentResult.mpesa_receipt_number || "confirmed"}`);

      setTimeout(() => navigate("/orders"), 2500);
    } catch (err) {
      setStep("error");
      setErrorMessage(err.message || "Something went wrong. Please try again");
    }
  };

  const isProcessing = !["idle", "success", "error"].includes(step);
  const displayPrice = WEIGHT_OPTIONS[weight].price;
  const bothLocationsSet = pickup.lat && dropoff.lat;

  return (
    <div className="min-h-screen bg-white text-black pb-32">
      {/* TOP PROGRESS NAV */}
      <div className="w-full h-1 bg-gray-100 sticky top-0 z-50">
        <div
          className="h-full bg-yellow-500 transition-all duration-1000"
          style={{ width: bothLocationsSet ? "100%" : pickup.lat || dropoff.lat ? "65%" : "30%" }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pt-16">
        <header className="mb-20">
          <span className="text-yellow-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">New Shipment</span>
          <h1 className="text-8xl font-black tracking-tighter leading-none mb-6">Are you ready to ship?</h1>
          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-gray-200" />
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Billing to: {user?.phone || user?.email}</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* LEFT: FLEET SELECTION */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex justify-between items-end">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 underline decoration-yellow-500 decoration-2 underline-offset-8">01. Fleet Selection</h3>
              <p className="text-[10px] font-black text-gray-300 italic">Select your freight class below</p>
            </div>

            <div className="grid gap-10">
              {Object.keys(WEIGHT_OPTIONS).map((cat) => (
                <div
                  key={cat}
                  onClick={() => setWeight(cat)}
                  className={`group relative h-[500px] rounded-[60px] overflow-hidden cursor-pointer transition-all duration-700
                  ${weight === cat ? "ring-[15px] ring-yellow-500 scale-[1.02] shadow-2xl" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"}`}
                >
                  <img src={vehicles[cat]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" alt={cat} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-12 left-12 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-[2px] bg-yellow-500" />
                      <span className="text-yellow-500 font-black text-xs uppercase tracking-widest">Premium {cat} Service</span>
                    </div>
                    <h2 className="text-6xl font-black italic tracking-tighter mb-2">{cat} PRIORITY</h2>
                    <p className="text-gray-300 font-medium text-lg">Up to {WEIGHT_OPTIONS[cat].kg}kg — Guaranteed delivery within 24 hours.</p>
                  </div>

                  <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full">
                    <span className="text-white font-black text-2xl tracking-tighter">KES {WEIGHT_OPTIONS[cat].price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE STICKY CONSIGNMENT NOTE */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-24 bg-gray-50 p-12 rounded-[70px] border border-gray-100 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black tracking-tight italic">Shipment Summary</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>

              <div className="space-y-8 mb-12">
                <LocationPicker
                  label="Pickup Location"
                  placeholder="Search or tap map for pickup..."
                  value={pickup}
                  onChange={setPickup}
                />

                <LocationPicker
                  label="Drop-off Destination"
                  placeholder="Search or tap map for drop-off..."
                  value={dropoff}
                  onChange={setDropoff}
                />

                <div className="relative group">
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">Package Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Electronics, documents..."
                    value={description}
                    className="w-full bg-white p-6 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl transition-all placeholder:text-gray-200"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="relative group">
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-all" />
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block">M-Pesa Phone Number</label>
                  <input
                    type="tel"
                    placeholder="254XXXXXXXXX"
                    value={phoneNumber}
                    className={`w-full bg-white p-6 rounded-[25px] outline-none font-bold text-sm shadow-sm focus:shadow-xl transition-all placeholder:text-gray-200 ${phoneError ? "ring-2 ring-red-400" : ""}`}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                  {phoneError && <p className="text-red-500 text-xs font-bold mt-2 ml-4">{phoneError}</p>}
                </div>
              </div>

              {/* Price display */}
              <div className="bg-white p-8 rounded-[40px] mb-8 border border-gray-100">
                <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2">
                  <span>Billing Summary</span>
                  <span>{weight} Class</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Standard Freight</span>
                  <span className="text-2xl font-black italic text-yellow-600">KES {displayPrice}</span>
                </div>
              </div>

              {/* Status messages */}
              {step === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-[25px] p-5 mb-6 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                  <p className="text-green-800 text-sm font-bold">{statusMessage}</p>
                </div>
              )}
              {step === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-[25px] p-5 mb-6 flex items-start gap-3">
                  <AlertCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
                  <p className="text-red-800 text-sm font-bold">{errorMessage}</p>
                </div>
              )}
              {errorMessage && step === "idle" && (
                <div className="bg-red-50 border border-red-200 rounded-[25px] p-5 mb-6 flex items-start gap-3">
                  <AlertCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
                  <p className="text-red-800 text-sm font-bold">{errorMessage}</p>
                </div>
              )}
              {isProcessing && STEP_LABELS[step] && (
                <div className="bg-blue-50 border border-blue-200 rounded-[25px] p-5 mb-6 flex items-center gap-3">
                  <Loader2 size={18} className="text-blue-600 animate-spin shrink-0" />
                  <div>
                    <p className="text-blue-800 text-sm font-bold">{STEP_LABELS[step]}</p>
                    {statusMessage && <p className="text-blue-600 text-xs mt-1">{statusMessage}</p>}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {step === "error" ? (
                  <button
                    onClick={() => { setStep("idle"); setErrorMessage(""); }}
                    className="w-full py-7 bg-yellow-500 text-black rounded-[30px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-black hover:text-white transition-all hover:-translate-y-1 shadow-2xl active:scale-95"
                  >
                    Try Again
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full py-7 bg-[#2fbb1c] text-white rounded-[30px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-black transition-all hover:-translate-y-1 shadow-2xl shadow-green-100 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-3">
                        <Loader2 size={16} className="animate-spin" />
                        <span>{STEP_LABELS[step] || "Processing..."}</span>
                      </div>
                    ) : (
                      <>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" className="h-6 brightness-200" alt="Mpesa" />
                        Complete Request
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={() => { if (window.confirm("Discard this shipment and start over?")) navigate("/orders"); }}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center gap-2 group"
                >
                  <X size={14} className="group-hover:rotate-90 transition-transform" />
                  Discard Shipment
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6">
                <ShieldCheck size={12} className="text-gray-300" />
                <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Secure 256-bit encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
