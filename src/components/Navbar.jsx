import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left-container">
        <ul className="navbar-links">
          <li><Link to="/">首頁</Link></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/cars">二手車平台</Link></li>
              <li><Link to="/favorites">買車收藏</Link></li>
              <li><Link to="/upload">刊登車輛</Link></li>
              <li>
                <button className="navbar-button" onClick={onLogout}>
                  登出
                </button>
              </li>
              <li><Link to="/register" className="btn-register">註冊</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">登入</Link></li>
              <li><Link to="/register" className="btn-register">註冊</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;