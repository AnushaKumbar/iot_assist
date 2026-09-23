import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/troubleshoot', label: 'Troubleshoot', icon: '🔧' },
  { path: '/devices', label: 'Devices', icon: '📱' },
  { path: '/history', label: 'History', icon: '📋' },
  { path: '/knowledge', label: 'Knowledge Base', icon: '📚' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const { theme, toggleTheme, sidebarOpen, setSidebarOpen } = useApp();
  const navigate = useNavigate();

  return (
    <>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">⚡</span>
            <span className="sidebar-logo-text">IoT<span className="logo-accent">Assist</span></span>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-theme-toggle" onClick={toggleTheme}>
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          <button
            className="btn btn-primary btn-sm sidebar-cta"
            onClick={() => { navigate('/troubleshoot'); setSidebarOpen(false); }}
          >
            + New Session
          </button>
        </div>
      </aside>
    </>
  );
}
