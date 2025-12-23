const express = require("express");
const cors = require("cors");

// Import routes
const reportRoutes = require("./routes/reportRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", reportRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("DrainWatch Chennai Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
