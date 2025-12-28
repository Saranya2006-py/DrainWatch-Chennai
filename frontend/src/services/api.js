const API_URL = "http://localhost:5000/api";

/* ================= GET REPORTS ================= */
// Supports filters: location, status, severity
export const getReports = async (filters = {}) => {
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    )
  ).toString();

  const response = await fetch(`${API_URL}/reports?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  return response.json();
};

/* ================= CREATE REPORT (Citizen) ================= */
export const createReport = async (report) => {
  const response = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error("Failed to create report");
  }

  return response.json();
};

/* ================= UPDATE REPORT STATUS (Admin) ================= */
// status: "Pending" | "In Progress" | "Resolved"
export const updateReportStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/reports/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-user-role": "admin", // 🔐 ADMIN ACCESS
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update report status");
  }

  return response.json();
};

/* ================= DELETE REPORT (Admin) ================= */
export const deleteReport = async (id) => {
  const response = await fetch(`${API_URL}/reports/${id}`, {
    method: "DELETE",
    headers: {
      "x-user-role": "admin", // 🔐 ADMIN ACCESS
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete report");
  }

  return response.json();
};
