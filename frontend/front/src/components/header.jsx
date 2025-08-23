import { Link } from 'react-router-dom';
import './header.css';


export default function Header() {
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
          <Link to="/signup" className="btn signup">Sign Up</Link>
          <Link to="/login" className="btn login">Login</Link>
        </div>
      </header>
    );
  }