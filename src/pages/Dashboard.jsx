import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { getLocalHistory } from '../services/chatbotService';
import './Dashboard.css';

const STATS = [
  { icon: '📱', label: 'Devices Supported', value: '10+', color: 'blue' },
  { icon: '✅', label: 'Problems Solved', value: '500+', color: 'green', trend: '+12% this month' },
  { icon: '💬', label: 'Sessions Today', value: '32', color: 'purple' },
  { icon: '📚', label: 'Knowledge Articles', value: '120+', color: 'yellow' },
];

const POPULAR_ISSUES = [
  { icon: '📡', issue: 'Wi-Fi connection drops', devices: ['Smart Camera', 'Smart Bulb'] },
  { icon: '🔋', issue: 'Device offline after power cut', devices: ['Smart Plug', 'Smart Thermostat'] },
  { icon: '📲', issue: 'App cannot detect device', devices: ['Smart Speaker', 'Smart Camera'] },
  { icon: '🔄', issue: 'Firmware update failure', devices: ['Wi-Fi Router', 'Smart TV'] },
];

const ARCH_NODES = [
  { label: 'User', highlight: false },
  { label: 'React Web Interface', highlight: true },
  { label: 'Node.js / Express API', highlight: false },
  { label: 'RAG Pipeline', highlight: true },
  { label: 'Vector Database', highlight: false },
  { label: 'Retrieved IoT Documentation', highlight: false },
  { label: 'IBM Granite / watsonx.ai', highlight: true },
  { label: 'AI Troubleshooting Response', highlight: false },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const history = getLocalHistory().slice(0, 4);

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="dash-welcome">
        <div className="dash-welcome-text">
          <h1 className="section-title">Welcome to IoT Assist</h1>
          <p className="section-subtitle">Let's solve your device problem.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/troubleshoot')}>
          + Start New Troubleshooting
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="dash-main-grid">
        {/* Recent sessions */}
        <div className="card dash-recent">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Recent Troubleshooting</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/history')}>View All</button>
          </div>
          {history.length === 0 ? (
            <div className="dash-empty">
              <span>No sessions yet.</span>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/troubleshoot')}>
                Start your first session
              </button>
            </div>
          ) : (
            <div className="recent-list">
              {history.map((session, i) => (
                <div key={i} className="recent-item">
                  <div className="recent-item-icon">
                    {session.deviceIcon || '📱'}
                  </div>
                  <div className="recent-item-info">
                    <span className="recent-item-device">{session.device}</span>
                    <span className="recent-item-problem">{session.problem}</span>
                  </div>
                  <span className={`badge ${session.status === 'Solved' ? 'badge-green' : 'badge-yellow'}`}>
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          {/* Static preview when no history */}
          {history.length === 0 && (
            <div className="recent-list recent-preview">
              {[
                { icon: '📷', device: 'Smart Camera', problem: 'Camera offline', status: 'Solved' },
                { icon: '💡', device: 'Smart Bulb', problem: 'Cannot connect to Wi-Fi', status: 'Solved' },
                { icon: '🔌', device: 'Smart Plug', problem: 'Not responding', status: 'In Progress' },
                { icon: '🔊', device: 'Smart Speaker', problem: 'Bluetooth issue', status: 'Solved' },
              ].map((item, i) => (
                <div key={i} className="recent-item">
                  <div className="recent-item-icon">{item.icon}</div>
                  <div className="recent-item-info">
                    <span className="recent-item-device">{item.device}</span>
                    <span className="recent-item-problem">{item.problem}</span>
                  </div>
                  <span className={`badge ${item.status === 'Solved' ? 'badge-green' : 'badge-yellow'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular issues */}
        <div className="card dash-popular">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Popular Issues</h2>
          </div>
          <div className="popular-list">
            {POPULAR_ISSUES.map((item, i) => (
              <div key={i} className="popular-item">
                <span className="popular-icon">{item.icon}</span>
                <div className="popular-info">
                  <span className="popular-issue">{item.issue}</span>
                  <span className="popular-devices">{item.devices.join(', ')}</span>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => navigate('/troubleshoot')}
                >
                  Solve
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture */}
      <div className="card dash-arch">
        <div className="dash-card-header">
          <h2 className="dash-card-title">System Architecture</h2>
          <span className="badge badge-blue">RAG Pipeline</span>
        </div>
        <div className="arch-flow">
          {ARCH_NODES.map((node, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`arch-node ${node.highlight ? 'highlight' : ''}`}>{node.label}</div>
              {i < ARCH_NODES.length - 1 && <div className="arch-arrow">↓</div>}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
