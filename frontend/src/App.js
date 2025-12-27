import { useEffect, useState } from "react";
import {
  getReports,
  createReport,
  updateReportStatus,
  deleteReport,
} from "./services/api";

import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";
import ReportCard from "./components/ReportCard";

function App() {
  const [reports, setReports] = useState([]);

  // Form state
  const [location, setLocation] = useState("");
  const [issue, setIssue] = useState("");
  const [severity, setSeverity] = useState("Low");

  // Filter state
  const [filterLocation, setFilterLocation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  // 🎨 Color helpers
  const getSeverityColor = (severity) => {
    if (severity === "High") return "red";
    if (severity === "Medium") return "orange";
    return "green";
  };

  const getStatusColor = (status) => {
    if (status === "Resolved") return "green";
    if (status === "In Progress") return "orange";
    return "gray";
  };

  // 🔽 Sort: High severity first, then latest
  const sortReports = (reports) => {
    const severityOrder = { High: 3, Medium: 2, Low: 1 };

    return [...reports].sort((a, b) => {
      if (severityOrder[b.severity] !== severityOrder[a.severity]) {
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const loadReports = () => {
    getReports({
      location: filterLocation,
      status: filterStatus,
      severity: filterSeverity,
    }).then((data) => setReports(data));
  };

  useEffect(() => {
    loadReports();
  }, [filterLocation, filterStatus, filterSeverity]);

  const handleSubmit = async () => {
    if (!location || !issue) {
      alert("Please fill all fields");
      return;
    }

    await createReport({ location, issue, severity });
    setLocation("");
    setIssue("");
    setSeverity("Low");
    loadReports();
  };

  const handleStatusChange = async (id, status) => {
    await updateReportStatus(id, status);
    loadReports();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (!confirmDelete) return;

    await deleteReport(id);
    loadReports();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>🚰 DrainWatch Chennai</h1>

      {/* 📊 Dashboard */}
      <Dashboard reports={reports} />

      {/* 🔍 Filters */}
      <Filters
        filterLocation={filterLocation}
        setFilterLocation={setFilterLocation}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterSeverity={filterSeverity}
        setFilterSeverity={setFilterSeverity}
      />

      <hr />

      {/* ➕ Report Form */}
      <h3>➕ Report Drain Issue</h3>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Describe the issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />
      <br /><br />

      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <br /><br />

      <button onClick={handleSubmit}>Submit Report</button>

      <hr />

      {/* 📋 Report List */}
      {reports.length === 0 ? (
        <p>No reports found</p>
      ) : (
        sortReports(reports).map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            getSeverityColor={getSeverityColor}
            getStatusColor={getStatusColor}
          />
        ))
      )}
    </div>
  );
}

export default App;
