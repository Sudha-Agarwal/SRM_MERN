import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../apiConfig';


function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [protectedData, setProtectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
console.log('Dashboard user:', user);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchProtectedData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/protected`);
      setProtectedData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch protected data');
      console.error('Error fetching protected data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.email}!</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <section className="protected-data-section">
          <h2>Protected Data</h2>
          <button 
            onClick={fetchProtectedData} 
            disabled={loading}
            className="fetch-button"
          >
            {loading ? 'Loading...' : 'Fetch Protected Data'}
          </button>

          {error && <p className="error-message">{error}</p>}

          {protectedData && (
            <div className="data-display">
              <h3>Server Response:</h3>
              <pre>{JSON.stringify(protectedData, null, 2)}</pre>
            </div>
          )}
        </section>

        <section className="user-info">
          <h2>Your Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;