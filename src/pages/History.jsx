import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getLocalHistory, clearHistory } from '../services/chatbotService';
import './History.css';

const STATUS_OPTIONS = ['All', 'Solved', 'In Progress'];

// Seed fallback data for demo
const DEMO_HISTORY = [
  { device: 'Smart Camera', deviceIcon: '📷', problem: 'Wi-Fi connection dropping', diagnosis: 'Network configuration issue', status: 'Solved', date: '23 Sep 2026' },
  { device: 'Smart Bulb', deviceIcon: '💡', problem: 'Device offline', diagnosis: 'Connectivity issue', status: 'Solved', date: '22 Sep 2026' },
  { device: 'Smart Plug', deviceIcon: '🔌', problem: 'Not responding to commands', diagnosis: 'App pairing mismatch', status: 'Solved', date: '21 Sep 2026' },
  { device: 'Smart Speaker', deviceIcon: '🔊', problem: 'Bluetooth connection issue', diagnosis: 'Pairing mode expired', status: 'In Progress', date: '20 Sep 2026' },
  { device: 'Wi-Fi Router', deviceIcon: '📡', problem: 'Slow internet speeds', diagnosis: 'Channel congestion', status: 'Solved', date: '19 Sep 2026' },
  { device: 'Smart Thermostat', deviceIcon: '🌡️', problem: 'Schedule not activating', diagnosis: 'Firmware bug', status: 'Solved', date: '18 Sep 2026' },
];

export default function History() {
  const saved = getLocalHistory();
  const allHistory = saved.length > 0 ? saved : DEMO_HISTORY;

  const [search, setSearch] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [, forceUpdate] = useState(0);

  const uniqueDevices = [...new Set(allHistory.map((h) => h.device))];

  const filtered = allHistory.filter((h) => {
    const matchSearch = !search ||
      h.device.toLowerCase().includes(search.toLowerCase()) ||
      h.problem.toLowerCase().includes(search.toLowerCase()) ||
      h.diagnosis.toLowerCase().includes(search.toLowerCase());
    const matchDevice = !deviceFilter || h.device === deviceFilter;
    const matchStatus = statusFilter === 'All' || h.status === statusFilter;
    return matchSearch && matchDevice && matchStatus;
  });

  const handleClear = () => {
    clearHistory();
    setShowConfirm(false);
    forceUpdate((n) => n + 1);
  };

  return (
    <DashboardLayout>
      <div className="history-header">
        <div>
          <h1 className="section-title">Troubleshooting History</h1>
          <p className="section-subtitle">Review and manage your past troubleshooting sessions.</p>
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => setShowConfirm(true)}>
          🗑 Clear History
        </button>
      </div>

      {/* Confirm clear */}
      {showConfirm && (
        <div className="history-confirm-bar">
          <span>This will permanently delete all troubleshooting history.</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-danger btn-sm" onClick={handleClear}>Delete All</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Session detail panel */}
      {selectedSession && (
        <div className="session-detail-panel">
          <div className="session-detail-header">
            <span className="session-detail-icon">{selectedSession.deviceIcon}</span>
            <div>
              <div className="session-detail-device">{selectedSession.device}</div>
              <div className="session-detail-date">{selectedSession.date}</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedSession(null)}>✕ Close</button>
          </div>
          <div className="session-detail-body">
            <div className="session-detail-row"><strong>Problem:</strong> {selectedSession.problem}</div>
            <div className="session-detail-row"><strong>Diagnosis:</strong> {selectedSession.diagnosis}</div>
            <div className="session-detail-row">
              <strong>Status:</strong>
              <span className={`badge ${selectedSession.status === 'Solved' ? 'badge-green' : 'badge-yellow'}`}>
                {selectedSession.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="history-filters">
        <input
          className="input-field history-search"
          type="text"
          placeholder="Search sessions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input-field history-select"
          value={deviceFilter}
          onChange={(e) => setDeviceFilter(e.target.value)}
        >
          <option value="">All Devices</option>
          {uniqueDevices.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <div className="history-status-filter">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              className={`tag ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card history-table-card">
        {filtered.length === 0 ? (
          <div className="history-empty">No sessions match your filters.</div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Problem</th>
                  <th>Diagnosis</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((session, i) => (
                  <tr key={i}>
                    <td>
                      <div className="history-device-cell">
                        <span>{session.deviceIcon}</span>
                        <span>{session.device}</span>
                      </div>
                    </td>
                    <td className="history-problem-cell">{session.problem}</td>
                    <td className="history-diag-cell">{session.diagnosis}</td>
                    <td>
                      <span className={`badge ${session.status === 'Solved' ? 'badge-green' : 'badge-yellow'}`}>
                        {session.status}
                      </span>
                    </td>
                    <td>{session.date}</td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setSelectedSession(session)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
