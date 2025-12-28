import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("citizen");
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "admin123"; // demo password

  const handleSubmit = () => {
    if (!username) {
      alert("Please enter username");
      return;
    }

    if (role === "admin" && password !== ADMIN_PASSWORD) {
      alert("Invalid admin password");
      return;
    }

    onLogin({ username, role });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Government of Tamil Nadu</h1>
        <p className="dept">
          Municipal Administration & Water Supply Department
        </p>

        <h2>DrainWatch Chennai</h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Login As</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="citizen">Citizen</option>
          <option value="admin">Administrator</option>
        </select>

        {role === "admin" && (
          <>
            <label>Admin Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        <button onClick={handleSubmit}>Login</button>

        <p className="note">
          For official use only | Demo academic project
        </p>
      </div>
    </div>
  );
}

export default Login;
