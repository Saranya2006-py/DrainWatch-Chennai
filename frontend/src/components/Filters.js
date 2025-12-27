function Filters({
  filterLocation,
  setFilterLocation,
  filterStatus,
  setFilterStatus,
  filterSeverity,
  setFilterSeverity,
}) {
  return (
    <>
      <h3>🔍 Filters</h3>

      <input
        placeholder="Search by location"
        value={filterLocation}
        onChange={(e) => setFilterLocation(e.target.value)}
      />
      <br /><br />

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>{" "}

      <select
        value={filterSeverity}
        onChange={(e) => setFilterSeverity(e.target.value)}
      >
        <option value="">All Severity</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <hr />
    </>
  );
}

export default Filters;
