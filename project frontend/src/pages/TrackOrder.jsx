import { useEffect, useState } from "react";

export default function TrackOrder({ orderId }) {
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/orders/${orderId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
    };

    return () => ws.close();
  }, [orderId]);

  return (
    <div>
      <h2>Order Tracking</h2>
      <p>Current Status: <strong>{status}</strong></p>
    </div>
  );
}
