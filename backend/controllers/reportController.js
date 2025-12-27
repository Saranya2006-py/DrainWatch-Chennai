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

    // Filter by status
    if (status) {
      reports = reports.filter(
        (r) => r.status?.toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by severity
    if (severity) {
      reports = reports.filter(
        (r) => r.severity?.toLowerCase() === severity.toLowerCase()
      );
    }

    // Filter by location (partial match)
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

// POST new report
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

// PATCH: Update report status to Resolved
exports.updateReportStatus = (req, res) => {
  const { id } = req.params;

  try {
    const reports = readReports();
    const report = reports.find((r) => r.id == id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = "Resolved";
    writeReports(reports);

    res.status(200).json({
      message: "Report status updated to Resolved",
      report,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);
    res.status(500).json({ message: "Error updating report status" });
  }
};

// DELETE report by ID
exports.deleteReport = (req, res) => {
  const reportId = Number(req.params.id);

  try {
    const reports = readReports();
    const filteredReports = reports.filter(
      (report) => report.id !== reportId
    );

    if (reports.length === filteredReports.length) {
      return res.status(404).json({ message: "Report not found" });
    }

    writeReports(filteredReports);

    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("DELETE REPORT ERROR:", error);
    res.status(500).json({ message: "Error deleting report" });
  }
};
