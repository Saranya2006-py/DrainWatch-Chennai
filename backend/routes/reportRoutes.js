const express = require("express");
const router = express.Router();

const {
  getReports,
  createReport,
  updateReportStatus,
  deleteReport
} = require("../controllers/reportController");

// GET all reports (with filters)
router.get("/reports", getReports);

// CREATE a report
router.post("/reports", createReport);

// UPDATE report status
router.patch("/reports/:id", updateReportStatus);

// DELETE a report
router.delete("/reports/:id", deleteReport);

module.exports = router;
