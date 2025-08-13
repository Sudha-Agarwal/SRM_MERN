import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Custom hook for user authentication
import BASE_URL from "../../apiConfig"; // API base URL

export default function AdminProductList() {
  const { user, token } = useAuth(); // Get current logged-in user and JWT token from context
  const [products, setProducts] = useState([]); // List of products
  const [error, setError] = useState(""); // General error state
  const [loading, setLoading] = useState(true); // Loading state for fetching products

  // Form state for adding a new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
  });
  const [addError, setAddError] = useState(""); // Error while adding product
  const [adding, setAdding] = useState(false); // Loading state for adding product

  // Edit state for updating products
  const [editingId, setEditingId] = useState(null); // ID of product being edited
  const [editForm, setEditForm] = useState({}); // Editable product data

  // Fetch products on initial render when token is available
  useEffect(() => {
    if (!token) return; // If no token, skip fetch
    fetchProducts();
  }, [token]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` }, // Send token for authentication
      });
      setProducts(res.data.products || res.data); // Store products
      setError("");
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Restrict access if user is not admin
  if (!user || user.role !== "admin") {
    return <p>Access denied. Admins only.</p>;
  }

  // Handle form input change for adding product
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle product submission
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddError("");
    setAdding(true);

    // Basic validation
    if (!newProduct.name || !newProduct.price) {
      setAddError("Name and Price are required");
      setAdding(false);
      return;
    }

    try {
      // Prepare data for backend
      const productToAdd = {
        ...newProduct,
        price: Number(newProduct.price),
        stock: newProduct.stock ? Number(newProduct.stock) : 0,
      };

      // Send POST request to backend
      const res = await axios.post(`${BASE_URL}/products`, productToAdd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state with newly added product
      setProducts((prev) => [...prev, res.data]);

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
      });
    } catch (err) {
      setAddError(err.response?.data?.message || "Failed to add product");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  // Delete a product by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${BASE_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove deleted product from state
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  // Start editing a product
  const startEditing = (product) => {
    setEditingId(product._id);
    setEditForm({ ...product }); // Copy current product data into form
  };

  // Cancel editing mode
  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited product
  const saveEdit = async () => {
    try {
      const updated = {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      };

      const res = await axios.put(
        `${BASE_URL}/products/${editingId}`,
        updated,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update state with new product details
      setProducts((prev) =>
        prev.map((p) => (p._id === editingId ? res.data : p))
      );

      cancelEditing(); // Exit edit mode
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <div>
      <h1>Products List (Admin)</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: "2rem" }}>
        <h2>Add New Product</h2>
        {addError && <p style={{ color: "red" }}>{addError}</p>}
        <div>
          <label>
            Name*:
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              style={{ marginLeft: "0.5rem", verticalAlign: "top" }}
            />
          </label>
        </div>
        <div>
          <label>
            Price*:
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleChange}
              min="0"
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <div>
          <label>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleChange}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
        </div>
        <button type="submit" disabled={adding} style={{ marginTop: "1rem" }}>
          {adding ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Products Table */}
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}

      {!loading && products.length > 0 && (
        <table
          border="1"
          cellPadding="5"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                {editingId === p._id ? (
                  // Editable Row
                  <>
                    <td>
                      <input
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="stock"
                        value={editForm.stock}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        name="imageUrl"
                        value={editForm.imageUrl}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </td>
                  </>
                ) : (
                  // Read-Only Row
                  <>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.category || "N/A"}</td>
                    <td>{p.stock !== undefined ? p.stock : "N/A"}</td>
                    <td>
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          style={{ width: "60px", height: "auto" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>
                      <button onClick={() => startEditing(p)}>Edit</button>
                      <button onClick={() => handleDelete(p._id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
