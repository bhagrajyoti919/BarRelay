"use client";
import { useEffect, useState } from "react";

export default function TrackOrderPage({ params }) {
  const { id } = params;
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/orders/${id}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
    };

    return () => ws.close();
  }, [id]);

  return (
    <div>
      <h1>Tracking Order #{id}</h1>
      <p>Status: {status}</p>
    </div>
  );
}
