import { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import './Settings.css';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Arabic', 'Japanese'];
const AI_RESPONSE_STYLES = ['Detailed', 'Concise', 'Step-by-step only'];

export default function Settings() {
  const { theme, toggleTheme, settings, updateSettings } = useApp();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: settings.name || '',
    email: settings.email || '',
  });

  const [language, setLanguage] = useState(settings.language || 'English');
  const [notifications, setNotifications] = useState(settings.notifications !== false);
  const [aiStyle, setAiStyle] = useState(settings.aiStyle || 'Detailed');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSave = () => {
    updateSettings({ name: profile.name, email: profile.email, language, notifications, aiStyle });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('iot_history');
    setShowClearConfirm(false);
  };

  return (
    <DashboardLayout>
      <h1 className="section-title">Settings</h1>
      <p className="section-subtitle">Manage your profile, preferences, and application settings.</p>

      <div className="settings-layout">
        {/* ---- User Profile ---- */}
        <div className="card settings-card">
          <h2 className="settings-card-title">👤 User Profile</h2>
          <div className="form-group">
            <label>Display Name</label>
            <input
              className="input-field"
              type="text"
              placeholder="Your name"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              className="input-field"
              type="email"
              placeholder="your@email.com"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            />
          </div>
        </div>

        {/* ---- Appearance ---- */}
        <div className="card settings-card">
          <h2 className="settings-card-title">🎨 Appearance</h2>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Theme</div>
              <div className="settings-row-desc">Switch between light and dark mode</div>
            </div>
            <button className="settings-toggle-btn" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        </div>

        {/* ---- Language ---- */}
        <div className="card settings-card">
          <h2 className="settings-card-title">🌐 Language & Region</h2>
          <div className="form-group">
            <label>Preferred Language</label>
            <select
              className="input-field"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ---- Notifications ---- */}
        <div className="card settings-card">
          <h2 className="settings-card-title">🔔 Notifications</h2>
          <div className="settings-row">
            <div className="settings-row-info">
              <div className="settings-row-label">Session Notifications</div>
              <div className="settings-row-desc">Get notified when a troubleshooting session is complete</div>
            </div>
            <label className="settings-switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="settings-switch-slider" />
            </label>
          </div>
        </div>

        {/* ---- AI Preferences ---- */}
        <div className="card settings-card">
          <h2 className="settings-card-title">🧠 AI Response Preferences</h2>
          <div className="form-group">
            <label>Response Style</label>
            <div className="ai-style-options">
              {AI_RESPONSE_STYLES.map((style) => (
                <label key={style} className={`ai-style-option ${aiStyle === style ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="aiStyle"
                    value={style}
                    checked={aiStyle === style}
                    onChange={() => setAiStyle(style)}
                    style={{ display: 'none' }}
                  />
                  {style}
                </label>
              ))}
            </div>
          </div>
          <p className="settings-note">
            <strong>Note:</strong> Response style will be sent as context to the IBM Granite API when the backend is connected.
          </p>
        </div>

        {/* ---- Data & Privacy ---- */}
        <div className="card settings-card settings-card--danger">
          <h2 className="settings-card-title">🗑️ Data & Privacy</h2>
          {showClearConfirm ? (
            <div className="settings-confirm-row">
              <span>This will delete all saved troubleshooting history.</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-danger btn-sm" onClick={handleClearHistory}>Confirm Delete</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setShowClearConfirm(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => setShowClearConfirm(true)}
            >
              🗑 Clear Troubleshooting History
            </button>
          )}
          <p className="settings-note" style={{ marginTop: 12 }}>
            All data is stored locally in your browser. No data is sent to external servers unless
            a backend API is configured via the VITE_API_BASE_URL environment variable.
          </p>
        </div>
      </div>

      {/* Save button */}
      <div className="settings-save-row">
        {saved && <span className="settings-saved-msg">✅ Settings saved!</span>}
        <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
      </div>
    </DashboardLayout>
  );
}
