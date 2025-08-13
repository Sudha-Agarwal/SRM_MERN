import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//import { AuthContext } from "./context/AuthContext";
import { useAuth } from './context/AuthContext'
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductList from "./pages/admin/AdminProductList";
import Checkout from "./pages/Checkout";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useAuth();

  // Wrapper for admin-only routes
  const AdminRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
         <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          {/* Admin-only route */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
    path="/admin/products"
    element={
      <AdminRoute>
        <AdminProductList />
      </AdminRoute>
    }
  />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
