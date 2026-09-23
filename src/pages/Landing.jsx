import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Landing.css';

const DEVICES_PREVIEW = [
  { icon: '💡', name: 'Smart Bulb' },
  { icon: '📷', name: 'Smart Camera' },
  { icon: '🌡️', name: 'Thermostat' },
  { icon: '🔊', name: 'Smart Speaker' },
  { icon: '🔌', name: 'Smart Plug' },
  { icon: '📡', name: 'Wi-Fi Router' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Select Device', desc: 'Choose your IoT device from our supported device catalog.' },
  { step: '02', title: 'Describe Problem', desc: 'Tell the AI assistant what issue you\'re experiencing.' },
  { step: '03', title: 'AI Diagnoses', desc: 'Granite AI retrieves relevant knowledge and diagnoses the root cause.' },
  { step: '04', title: 'Follow Solution', desc: 'Execute step-by-step instructions to resolve your issue.' },
];

const FEATURES = [
  { icon: '🧠', title: 'AI-Powered Troubleshooting', desc: 'IBM Granite AI understands complex IoT issues and provides accurate diagnoses.' },
  { icon: '📚', title: 'RAG Knowledge Retrieval', desc: 'Retrieval-Augmented Generation pulls from thousands of device manuals and guides.' },
  { icon: '🛠️', title: 'Step-by-Step Solutions', desc: 'Clear, actionable instructions tailored to your specific device and problem.' },
  { icon: '📱', title: 'Multi-Device Support', desc: 'Supports 50+ smart home devices across all major categories and brands.' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <Navbar />

      {/* ---- Hero ---- */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span>⚡</span> Powered by IBM Granite &amp; RAG
            </div>
            <h1 className="hero-heading">
              Your Intelligent<br />
              <span className="hero-heading-accent">IoT Troubleshooting</span><br />
              Assistant
            </h1>
            <p className="hero-desc">
              Diagnose IoT device problems instantly with AI-powered analysis.
              Get step-by-step solutions retrieved from thousands of device manuals,
              guides, and technical documentation.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/troubleshoot')}>
                Start Troubleshooting
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/devices')}>
                Explore Devices
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>50+</strong><span>Devices</span></div>
              <div className="hero-stat-divider" />
              <div className="hero-stat"><strong>10K+</strong><span>Issues Resolved</span></div>
              <div className="hero-stat-divider" />
              <div className="hero-stat"><strong>98%</strong><span>Resolution Rate</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-device-grid">
              {DEVICES_PREVIEW.map((d) => (
                <div key={d.name} className="hero-device-chip">
                  <span>{d.icon}</span>
                  <span>{d.name}</span>
                </div>
              ))}
            </div>
            <div className="hero-chat-preview">
              <div className="hcp-header">
                <span className="hcp-dot green" /><span className="hcp-title">IoT Assist</span>
              </div>
              <div className="hcp-msg hcp-ai">
                Hello! I can help diagnose your Smart Camera. What's happening?
              </div>
              <div className="hcp-msg hcp-user">
                My camera is not connecting to Wi-Fi
              </div>
              <div className="hcp-msg hcp-ai">
                <strong>Diagnosis:</strong> Wi-Fi connectivity issue detected.
                I found 3 relevant knowledge articles...
              </div>
              <div className="hcp-typing">
                <span className="hcp-typing-label">AI is processing</span>
                <div className="typing-dots"><span /><span /><span /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section className="section how-it-works">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-heading">How It Works</h2>
            <p className="section-subheading">Resolve IoT issues in four simple steps using AI and RAG technology.</p>
          </div>
          <div className="hiw-grid">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="hiw-card">
                <div className="hiw-step">{item.step}</div>
                <h3 className="hiw-title">{item.title}</h3>
                <p className="hiw-desc">{item.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && <div className="hiw-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Features ---- */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-heading">Why IoT Assist?</h2>
            <p className="section-subheading">Enterprise-grade AI troubleshooting for your smart home devices.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-heading">Ready to resolve your IoT issue?</h2>
            <p className="cta-desc">Start a troubleshooting session in seconds. No account required.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/troubleshoot')}>
              Start Troubleshooting Free
            </button>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="landing-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">⚡</span>
            <span className="footer-brand-name">IoT<span className="logo-accent">Assist</span></span>
            <p className="footer-tagline">Diagnose. Troubleshoot. Resolve.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#" onClick={(e) => e.preventDefault()}>Features</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/devices'); }}>Devices</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/knowledge'); }}>Knowledge Base</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#" onClick={(e) => e.preventDefault()}>Documentation</a>
              <a href="#" onClick={(e) => e.preventDefault()}>API Reference</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 IoT Assist. Built with IBM Granite &amp; RAG technology.</span>
        </div>
      </footer>
    </div>
  );
}
