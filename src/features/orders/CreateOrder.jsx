import { useState } from "react";
import { createOrder } from "./ordersAPI";
import GoogleMap from "../../components/maps/GoogleMap";
import PriceSummary from "../../components/orders/PriceSummary";

export default function CreateOrder() {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(null);

  const handleSubmit = async () => {
    await createOrder({
      pickup_location: pickup,
      destination,
      weight_category: weight,
    });
    alert("Order created!");
  };

  return (
    <div>
      <h2>Create Delivery</h2>

      <GoogleMap
        onPickupSelect={setPickup}
        onDestinationSelect={setDestination}
      />

      <select onChange={(e) => setWeight(e.target.value)}>
        <option value="">Select Weight</option>
        <option value="LIGHT">Light</option>
        <option value="MEDIUM">Medium</option>
        <option value="HEAVY">Heavy</option>
      </select>

      {price && <PriceSummary price={price} />}

      <button onClick={handleSubmit}>Create Order</button>
    </div>
  );
}
