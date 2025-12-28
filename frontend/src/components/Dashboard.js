import "./Dashboard.css";

function Dashboard({ reports }) {
  const total = reports.length;
  const pending = reports.filter(r => r.status === "Pending").length;
  const inProgress = reports.filter(r => r.status === "In Progress").length;
  const resolved = reports.filter(r => r.status === "Resolved").length;

  return (
    <div className="dashboard">
      <div className="stat-card total">
        <h3>{total}</h3>
        <p>Total Complaints</p>
      </div>

      <div className="stat-card pending">
        <h3>{pending}</h3>
        <p>Pending</p>
      </div>

      <div className="stat-card progress">
        <h3>{inProgress}</h3>
        <p>In Progress</p>
      </div>

      <div className="stat-card resolved">
        <h3>{resolved}</h3>
        <p>Resolved</p>
      </div>
    </div>
  );
}

export default Dashboard;
