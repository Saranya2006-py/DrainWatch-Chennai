const fs = require("fs");
const path = require("path");

const reportsFile = path.join(__dirname, "../data/reports.json");

exports.createReport = (req, res) => {
  const { location, issue, severity } = req.body;

  if (!location || !issue || !severity) {
    return res.status(400).json({ message: "All fields required" });
  }

  const reports = JSON.parse(fs.readFileSync(reportsFile));

  const newReport = {
    id: Date.now(),
    location,
    issue,
    severity,
    createdAt: new Date(),
  };

  reports.push(newReport);
  fs.writeFileSync(reportsFile, JSON.stringify(reports, null, 2));

  res.status(201).json({
    message: "Drain issue reported successfully",
    report: newReport,
  });
};
