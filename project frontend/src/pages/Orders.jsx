import { useEffect, useState } from "react";
import { orderHistory, cancelOrder, refundOrder } from "../api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderHistory().then(res => setOrders(res.data));
  }, []);

  return orders.map(o => (
    <div key={o.order_id}>
      <p>{o.order_id} - {o.status}</p>
      {o.status === "pending" && <button onClick={() => cancelOrder(o.order_id)}>Cancel</button>}
      {o.status === "paid" && <button onClick={() => refundOrder(o.order_id)}>Refund</button>}
    </div>
  ));
}
