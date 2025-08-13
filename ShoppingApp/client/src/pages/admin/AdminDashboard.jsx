// client/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import BASE_URL from "../../apiConfig";

export default function AdminDashboard() {
  const { user, token } = useAuth(); // Use custom hook instead of AuthContext directly
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [token]);

  if (!user || user.role !== "admin") {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Users</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
