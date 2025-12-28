const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/reports.json");

/* ================= HELPERS ================= */

// Read reports from file
const readReports = () => {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, "utf8");
  return data ? JSON.parse(data) : [];
};

// Write reports to file
const writeReports = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

/* ================= CONTROLLERS ================= */

// GET reports (with filters)
exports.getReports = (req, res) => {
  try {
    let reports = readReports();
    const { status, severity, location } = req.query;

    if (status) {
      reports = reports.filter(
        (r) => r.status?.toLowerCase() === status.toLowerCase()
      );
    }

    if (severity) {
      reports = reports.filter(
        (r) => r.severity?.toLowerCase() === severity.toLowerCase()
      );
    }

    if (location) {
      reports = reports.filter(
        (r) => r.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.status(200).json(reports);
  } catch (error) {
    console.error("GET REPORTS ERROR:", error);
    res.status(500).json({ message: "Error reading reports" });
  }
};

// POST new report (Citizen)
exports.createReport = (req, res) => {
  const { location, issue, severity } = req.body;

  if (!location || !issue || !severity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newReport = {
    id: Date.now(),
    location,
    issue,
    severity,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  try {
    const reports = readReports();
    reports.push(newReport);
    writeReports(reports);

    res.status(201).json({
      message: "Drain issue reported successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("CREATE REPORT ERROR:", error);
    res.status(500).json({ message: "Error saving report" });
  }
};

// PATCH: Update report status (ADMIN ONLY)
exports.updateReportStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // 🔐 Admin check
  const role = req.headers["x-user-role"];
  if (role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const reports = readReports();
    const report = reports.find((r) => r.id == id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    report.updatedAt = new Date().toISOString();

    writeReports(reports);

    res.status(200).json({
      message: "Report status updated successfully",
      report,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Error updating report status" });
  }
};

// DELETE report (ADMIN ONLY)
exports.deleteReport = (req, res) => {
  // 🔐 Admin check
  const role = req.headers["x-user-role"];
  if (role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }

  const reportId = Number(req.params.id);

  try {
    const reports = readReports();
    const updatedReports = reports.filter((r) => r.id !== reportId);

    if (reports.length === updatedReports.length) {
      return res.status(404).json({ message: "Report not found" });
    }

    writeReports(updatedReports);

    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("DELETE REPORT ERROR:", error);
    res.status(500).json({ message: "Error deleting report" });
  }
};
