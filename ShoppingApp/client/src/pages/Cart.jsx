import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // import auth
import "./Cart.css";
import BASE_URL from "../apiConfig";

export default function Cart() {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch cart from backend with Authorization header
  const fetchCart = async () => {
    if (!token) return; // don't fetch if no token

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Your backend returns array of cart items
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(
        `${BASE_URL}/cart/${productId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity", err);
      setError("Failed to update quantity.");
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
      setError("Failed to remove item.");
    }
  };

  const checkout = () => {
    // Navigate to checkout page with cart data
    navigate("/checkout", { state: { cart } });
  };

//setCart(res.data.items || []);
const calculateTotal = () => {
  return cart.reduce((total, item) => {
    const price = item.productId?.price || item.price || 0;
    return total + price * (item.quantity || 1);
  }, 0);
};
  if (loading) return <p>Loading cart...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.productId._id}>
                  <td>
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.productId.name}</td>
                  <td>₹{item.productId.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item.productId._id, Number(e.target.value))
                      }
                      className="qty-input"
                    />
                  </td>
                  <td>₹{item.productId.price * item.quantity}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.productId._id)}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Total: ₹{calculateTotal()}</h3>
            <button className="checkout-btn" onClick={checkout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
