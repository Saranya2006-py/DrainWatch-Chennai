import "./ReportCard.css";

function timeAgo(dateString) {
  if (!dateString) return "Just now";

  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;

  return `${Math.floor(seconds / 86400)}d ago`;
}

function ReportCard({ report, user, onStatusChange, onDelete }) {
  const isAdmin = user?.role === "admin";

  const severityClass = `severity-${report.severity.toLowerCase()}`;
  const statusClass = `status-${report.status
    .replace(/\s+/g, "-")
    .toLowerCase()}`;

  /* ================= LOCATION RENDER ================= */

  const renderLocation = () => {
    if (!report.location) return "Unknown location";

    // 🔹 OLD DATA (string)
    if (typeof report.location === "string") {
      return report.location;
    }

    // 🔹 NEW DATA (object)
    if (typeof report.location === "object") {
      const { name, ward, lat, lng } = report.location;

      return (
        <>
          <div>
            <strong>{name}</strong>
            {ward && <span> ({ward})</span>}
          </div>

          {lat && lng && (
            <a
              href={`https://www.google.com/maps?q=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              📍 View on Google Maps
            </a>
          )}
        </>
      );
    }

    return "Unknown location";
  };

  return (
    <div className="report-card">
      {/* Header */}
      <div className="report-header">
        <span className="report-location">📍 {renderLocation()}</span>
        <span className="report-id">Complaint ID: {report.id}</span>
      </div>

      {/* Issue */}
      <div className="report-issue">
        <strong>Issue Description:</strong>
        <br />
        {report.issue}
      </div>

      {/* Badges */}
      <div className="badge-row">
        <span className={`badge ${severityClass}`}>
          {report.severity.toUpperCase()}
        </span>

        <span className={`badge ${statusClass}`}>
          {report.status.toUpperCase()}
        </span>
      </div>

      {/* Time */}
      <div className="report-time">
        🕒{" "}
        {report.updatedAt
          ? `Last updated ${timeAgo(report.updatedAt)}`
          : `Reported ${timeAgo(report.createdAt)}`}
      </div>

      {/* Admin Controls */}
      {isAdmin ? (
        <div className="admin-controls">
          <select
            value={report.status}
            onChange={(e) => onStatusChange(report.id, e.target.value)}
            aria-label="Update complaint status"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <button
            className="danger-btn"
            onClick={() => onDelete(report.id)}
            aria-label="Delete complaint"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="citizen-note">
          🔒 Status updates are handled by the Municipal Authority
        </div>
      )}
    </div>
  );
}

export default ReportCard;
