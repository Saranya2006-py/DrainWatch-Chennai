function ReportCard({
  report,
  onStatusChange,
  onDelete,
  getSeverityColor,
  getStatusColor,
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
      }}
    >
      <p><strong>Location:</strong> {report.location}</p>
      <p><strong>Issue:</strong> {report.issue}</p>

      <p>
        <strong>Severity:</strong>{" "}
        <span
          style={{
            color: getSeverityColor(report.severity),
            fontWeight: "bold",
          }}
        >
          {report.severity}
        </span>
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color: getStatusColor(report.status),
            fontWeight: "bold",
          }}
        >
          {report.status}
        </span>
      </p>

      <button onClick={() => onStatusChange(report.id, "In Progress")}>
        In Progress
      </button>{" "}
      <button onClick={() => onStatusChange(report.id, "Resolved")}>
        Resolved
      </button>{" "}
      <button
        onClick={() => onDelete(report.id)}
        style={{ color: "red" }}
      >
        Delete
      </button>
    </div>
  );
}

export default ReportCard;
