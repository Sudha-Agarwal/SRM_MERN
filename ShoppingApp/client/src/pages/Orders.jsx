// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders", { withCredentials: true })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? <p>No orders found</p> :
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Order #{order._id}</h3>
            <p>Status: {order.status}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.product._id}>
                  {item.product.name} x {item.quantity}
                </li>
              ))}
            </ul>
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        ))
      }
    </div>
  );
}
