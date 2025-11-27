import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import "../styles/auth.css";

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ← 用來導向頁面

  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      alert("登入成功！");
      console.log("登入成功：", result);
      onLoginSuccess();
      navigate("/");         // 導向首頁
    } catch (err) {
      alert("登入失敗：" + err.message);
      console.error(err);
    }

    
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">登入</h2>

      <input
        className="auth-input"
        placeholder="帳號"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="auth-input"
        type="password"
        placeholder="密碼"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="auth-btn" onClick={handleLogin}>
        登入
      </button>
    </div>
  );
}

export default LoginPage;