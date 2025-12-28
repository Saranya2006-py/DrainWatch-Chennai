import { useEffect, useState, useCallback } from "react";
import {
  getReports,
  createReport,
  updateReportStatus,
  deleteReport,
} from "./services/api";

import Dashboard from "./components/Dashboard";
import Filters from "./components/Filters";
import ReportCard from "./components/ReportCard";
import Login from "./components/Login";
import Header from "./components/Header";
import MapPicker from "./components/MapPicker";

function App() {
  const [reports, setReports] = useState([]);

  // 🔐 User state
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // 📝 Report form
  const [location, setLocation] = useState(null); // 📍 Map location
  const [issue, setIssue] = useState("");
  const [severity, setSeverity] = useState("Low");

  // 🔍 Filters
  const [filterLocation, setFilterLocation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");

  /* ================= AUTH ================= */

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  /* ================= SORT ================= */

  const sortReports = (list) => {
    const severityOrder = { High: 3, Medium: 2, Low: 1 };
    return [...list].sort((a, b) => {
      if (severityOrder[b.severity] !== severityOrder[a.severity]) {
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  /* ================= API ================= */

  const loadReports = useCallback(() => {
    getReports({
      location: filterLocation,
      status: filterStatus,
      severity: filterSeverity,
    }).then(setReports);
  }, [filterLocation, filterStatus, filterSeverity]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  /* ================= ACTIONS ================= */

  const handleSubmit = async () => {
    if (!location || !issue) {
      alert("Please select location on map and describe the issue");
      return;
    }

    await createReport({
      location, // { lat, lng }
      issue,
      severity,
    });

    setLocation(null);
    setIssue("");
    setSeverity("Low");
    loadReports();
  };

  const handleStatusChange = async (id, status) => {
    if (user?.role !== "admin") return;
    await updateReportStatus(id, status);
    loadReports();
  };

  const handleDelete = async (id) => {
    if (user?.role !== "admin") return;
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    await deleteReport(id);
    loadReports();
  };

  /* ================= LOGIN ================= */

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  /* ================= MAIN UI ================= */

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />

      <div className="container">
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

        <label>Location (Map Based)</label>
        <MapPicker location={location} setLocation={setLocation} />

        <label>Issue Description</label>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />

        <label>Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="primary-btn" onClick={handleSubmit}>
          Submit Report
        </button>

        <hr />

        {/* 📋 Reports */}
        {reports.length === 0 ? (
          <p>No reports found</p>
        ) : (
          sortReports(reports).map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              user={user}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))
        )}

        <p className="footer-text">
          © Government of Tamil Nadu | DrainWatch Chennai – Academic Project
        </p>
      </div>
    </div>
  );
}

export default App;
