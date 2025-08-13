import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ cartCount }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Home link goes to admin dashboard if admin */}
        <Link to={user?.role === "admin" ? "/admin/dashboard" : "/"} className="navbar-logo">
          MyStore
        </Link>

        <ul className="navbar-links">
          <li>
            {/* Home link for nav items also */}
            <Link to={user?.role === "admin" ? "/admin/dashboard" : "/"}>Home</Link>
          </li>

          {/* Admin-only: Products link */}
          {user?.role === "admin" && (
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
          )}

          {/* Show Cart only for non-admin logged-in users */}
          {user && user.role !== "admin" && (
            <li>
              <Link to="/cart">Cart ({cartCount})</Link>
            </li>
          )}

          {user ? (
            <>
              <li>Hi, {user.name}</li>
              <li>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
