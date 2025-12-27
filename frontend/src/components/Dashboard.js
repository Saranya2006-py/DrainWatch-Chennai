function Dashboard({ reports }) {
  const total = reports.length;
  const pending = reports.filter(r => r.status === "Pending").length;
  const inProgress = reports.filter(r => r.status === "In Progress").length;
  const resolved = reports.filter(r => r.status === "Resolved").length;

  const cardStyle = {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <div style={{ ...cardStyle, background: "#f2f2f2" }}>
        <strong>Total</strong>
        <p>{total}</p>
      </div>
      <div style={{ ...cardStyle, background: "#ffe5e5" }}>
        <strong>Pending</strong>
        <p>{pending}</p>
      </div>
      <div style={{ ...cardStyle, background: "#fff3cd" }}>
        <strong>In Progress</strong>
        <p>{inProgress}</p>
      </div>
      <div style={{ ...cardStyle, background: "#e6fffa" }}>
        <strong>Resolved</strong>
        <p>{resolved}</p>
      </div>
    </div>
  );
}

export default Dashboard;
