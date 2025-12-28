const express = require("express");
const router = express.Router();

const {
  getReports,
  createReport,
  updateReportStatus,
  deleteReport,
} = require("../controllers/reportController");

// GET all reports (with filters)
// Example: /api/reports?status=Pending&severity=High&location=Velachery
router.get("/reports", getReports);

// CREATE a new report
router.post("/reports", createReport);

// UPDATE report status (Pending / In Progress / Resolved)
// Body: { "status": "Resolved" }
router.patch("/reports/:id", updateReportStatus);

// DELETE a report
router.delete("/reports/:id", deleteReport);

module.exports = router;
