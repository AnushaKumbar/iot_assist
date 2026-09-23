import { useNavigate } from 'react-router-dom';
import './DeviceCard.css';

export default function DeviceCard({ device, onSelect }) {
  const navigate = useNavigate();

  const handleTroubleshoot = () => {
    if (onSelect) {
      onSelect(device);
    } else {
      navigate(`/troubleshoot?device=${device.id}`);
    }
  };

  return (
    <div className="device-card">
      <div className="device-card-icon">{device.icon}</div>
      <div className="device-card-body">
        <h3 className="device-card-name">{device.name}</h3>
        <p className="device-card-desc">{device.description}</p>
        <span className="badge badge-blue device-category">{device.category}</span>
      </div>
      <button className="btn btn-primary btn-sm device-card-btn" onClick={handleTroubleshoot}>
        Troubleshoot
      </button>
    </div>
  );
}
