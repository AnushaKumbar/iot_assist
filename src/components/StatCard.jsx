import './StatCard.css';

export default function StatCard({ icon, label, value, color = 'blue', trend }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
        {trend && <div className="stat-card-trend">{trend}</div>}
      </div>
    </div>
  );
}
