import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "../apiConfig";
import "./Home.css";
import { useAuth } from "../context/AuthContext";  // import auth context

export default function Home() {
  const { user, token } = useAuth();  // get user & token from auth context

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cartLoading, setCartLoading] = useState(false); // optional: loading state for add to cart
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    if (!user) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${BASE_URL}/products`);
        setProducts(res.data.products);
      } catch (err) {
        setError("⚠️ Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (!user) {
    return (
      <div className="home-container">
        <h1 className="home-title">Please login to see products.</h1>
      </div>
    );
  }

  const handleAddToCart = async (product) => {
    if (!token) {
      alert("You must be logged in to add to cart");
      return;
    }

    try {
      setCartLoading(true);
      setCartError("");

      // Call the cart API to add product with quantity 1
      await axios.post(
        `${BASE_URL}/cart`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Added "${product.name}" to cart!`);
    } catch (error) {
      console.error("Add to cart failed:", error);
      setCartError("Failed to add to cart. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">All Products</h1>

      {loading && (
        <p style={{ color: "blue", fontWeight: "bold" }}>
          ⏳ Loading products...
        </p>
      )}

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {cartError && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {cartError}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p style={{ color: "orange", fontWeight: "bold" }}>
          📦 No products available.
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <Link to={`/products/${product._id}`} className="details-link">
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={cartLoading}
                  style={{ marginTop: "8px", padding: "8px 12px", cursor: "pointer" }}
                >
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
