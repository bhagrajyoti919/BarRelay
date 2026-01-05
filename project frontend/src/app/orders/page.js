"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { orderHistory } from "../../api/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    orderHistory()
      .then(res => setOrders(res.data))
      .catch(err => {
        if (err.response && err.response.status === 401) {
          router.push("/login");
        } else {
          console.error("Failed to fetch orders:", err);
        }
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Your Orders</h1>
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No orders found.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {orders.map(o => (
            <div key={o.order_id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong>Order #{o.order_id}</strong>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: o.status === 'completed' ? '#2ecc71' : '#f1c40f',
                  color: o.status === 'completed' ? 'white' : 'black',
                  fontSize: '0.9rem'
                }}>
                  {o.status.toUpperCase()}
                </span>
              </div>
              <p>Total: ₹{o.total_price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
