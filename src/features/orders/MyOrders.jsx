import { useEffect, useState } from "react";
import { getMyOrders } from "./ordersAPI";
import OrderCard from "../../components/orders/OrderCard";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then((res) => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

