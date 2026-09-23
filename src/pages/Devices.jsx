import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import DeviceCard from '../components/DeviceCard';
import { devices, DEVICE_CATEGORIES } from '../data/devices';
import './Devices.css';

export default function Devices() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [customDevice, setCustomDevice] = useState('');
  const navigate = useNavigate();

  const filtered = devices.filter((d) => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCustomDevice = () => {
    if (customDevice.trim()) {
      navigate(`/troubleshoot?deviceName=${encodeURIComponent(customDevice.trim())}`);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="section-title">What device are you having trouble with?</h1>
      <p className="section-subtitle">Select your device to start an AI-powered troubleshooting session.</p>

      {/* Search */}
      <div className="devices-search-row">
        <input
          className="input-field devices-search"
          type="text"
          placeholder="Search devices…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category filter */}
      <div className="category-filter">
        {['All', ...DEVICE_CATEGORIES].map((cat) => (
          <button
            key={cat}
            className={`tag ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Device grid */}
      <div className="devices-grid">
        {filtered.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
        {filtered.length === 0 && (
          <div className="devices-empty">No devices match your search.</div>
        )}
      </div>

      {/* Custom device input */}
      <div className="card custom-device-card">
        <h3 className="custom-device-title">Can't find your device?</h3>
        <p className="custom-device-desc">Enter your device name and our AI will still help troubleshoot it.</p>
        <div className="custom-device-row">
          <input
            className="input-field"
            type="text"
            placeholder="Enter device name (e.g. Smart Doorbell)"
            value={customDevice}
            onChange={(e) => setCustomDevice(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCustomDevice()}
          />
          <button
            className="btn btn-primary"
            onClick={handleCustomDevice}
            disabled={!customDevice.trim()}
          >
            Troubleshoot
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
