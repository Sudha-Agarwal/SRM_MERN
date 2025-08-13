// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <div className="grid">
        {products.map(product => (
          <div key={product._id} className="card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <Link to={`/products/${product._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
