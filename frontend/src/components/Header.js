import "./Header.css";
import tnLogo from "../assets/tn-logo.png";

function Header({ user, onLogout }) {
  return (
    <header className="gov-header">
      <div className="gov-left">
        <img src={tnLogo} alt="TN Logo" className="gov-logo" />
        <div>
          <h1>DrainWatch Chennai</h1>
          <p>Greater Chennai Corporation</p>
        </div>
      </div>

      <div className="gov-right">
        <span>
          👤 {user.username} ({user.role})
        </span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
