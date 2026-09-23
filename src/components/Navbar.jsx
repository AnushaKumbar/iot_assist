import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="landing-nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">IoT<span className="logo-accent">Assist</span></span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/devices" className="nav-link">Devices</Link>
          <Link to="/knowledge" className="nav-link">Knowledge Base</Link>
          <button className="nav-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/dashboard')}>
            Get Started
          </button>
        </div>
        <button className="nav-mobile-menu" onClick={toggleTheme} aria-label="menu">☰</button>
      </div>
    </nav>
  );
}
