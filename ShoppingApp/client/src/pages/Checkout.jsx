// Checkout.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../apiConfig";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [cart, setCart] = useState(state?.cart || []);
  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  // Fetch cart from backend if not passed via state
  useEffect(() => {
    if (cart.length === 0) {
      axios
        .get(`${BASE_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // backend returns { items: [...], totalPrice: number }
          setCart(res.data.items || []);
        })
        .catch((err) => {
          console.error("Failed to fetch cart", err);
          setError("Could not load cart");
        });
    }
  }, [cart.length, token]);

  // Calculate total
  useEffect(() => {
    const calculatedTotal = cart.reduce((sum, item) => {
      // Handle both populated & stored cart data
      const price =
        item.productId?.price ??
        item.product?.price ??
        item.price ??
        0;
      const quantity = item.quantity ?? 1;
      return sum + price * quantity;
    }, 0);
    setTotal(calculatedTotal);
  }, [cart]);

 const placeOrder = async () => {
  try {
    // Transform cart into products array for backend
    const products = cart.map(item => {
      const product = item.productId || item.product || {};
      return {
        productId: product._id || item.productId, // ensure it's just the ObjectId
        quantity: item.quantity ?? 1,
        priceAtPurchase: product.price ?? item.price ?? 0
      };
    });

    const totalAmount = products.reduce(
      (sum, p) => sum + p.quantity * p.priceAtPurchase,
      0
    );

    await axios.post(
      `${BASE_URL}/orders`,
      { products, totalAmount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Order placed successfully");
    navigate("/orders");
  } catch (err) {
    console.error("Order placement failed", err);
    setError(err.response?.data?.message || "Failed to place order");
  }
};


  return (
    <div>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => {
              const product = item.productId || item.product || {};
              const name = product.name ?? item.name ?? "Unknown Product";
              const price = product.price ?? item.price ?? 0;
              const quantity = item.quantity ?? 1;

              return (
                <li key={item._id || product._id || idx}>
                  {name} - ₹{price} × {quantity} = ₹
                  {price * quantity}
                </li>
              );
            })}
          </ul>

          <h3>Total: ₹{total}</h3>

          <textarea
            placeholder="Enter shipping address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}
