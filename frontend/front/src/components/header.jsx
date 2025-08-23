import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './header.css';

export default function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <header className="canteen-header">
      <div className="header-left">
        <h1 className="logo">🍽 Canteen MIS</h1>
        <nav className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/tokens">Tokens</Link>
          <Link to="/feedback">Feedback</Link>
        </nav>
      </div>
      <div className="header-right">
        {currentUser ? (
          <div className="user-section">
            <span className="user-name">Welcome, {currentUser.name}</span>
            <button onClick={handleLogout} className="btn logout">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/signup" className="btn signup">Sign Up</Link>
            <Link to="/login" className="btn login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}