const API_URL = "http://localhost:5000/api";

// GET all reports (with optional filters)
export const getReports = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(`${API_URL}/reports?${query}`);
  return response.json();
};

// CREATE report
export const createReport = async (report) => {
  const response = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });
  return response.json();
};

// UPDATE report status
export const updateReportStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/reports/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
};

// DELETE report
export const deleteReport = async (id) => {
  const response = await fetch(`${API_URL}/reports/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
