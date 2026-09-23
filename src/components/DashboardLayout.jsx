import Sidebar from '../components/Sidebar';
import { useApp } from '../context/AppContext';
import './DashboardLayout.css';

export default function DashboardLayout({ children }) {
  const { setSidebarOpen } = useApp();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            ☰
          </button>
          <div className="dash-topbar-right">
            <span className="dash-user-badge">👤 Guest</span>
          </div>
        </header>
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
