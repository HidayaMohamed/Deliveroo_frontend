import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, cancelOrder } from "./ordersAPI";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>Status: {order.status}</p>

      {order.status === "Pending" && (
        <button onClick={() => cancelOrder(id)}>
          Cancel Order
        </button>
      )}
    </div>
  );
}
