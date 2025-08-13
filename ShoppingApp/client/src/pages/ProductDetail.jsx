// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = () => {
    axios.post("/api/cart", { productId: id, quantity: 1 }, { withCredentials: true })
      .then(() => alert("Added to cart"))
      .catch(err => console.error(err));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.image} alt={product.name} style={{ width: "300px" }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
