import { useState } from "react";
import { register } from "../services/authService";
import "../styles/auth.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const result = await register(username, password);
      alert("註冊成功！");
      console.log(result);
    } catch (err) {
      alert("註冊失敗：" + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">註冊</h2>

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

      <button className="auth-btn" onClick={handleRegister}>
        註冊
      </button>
    </div>
  );
}

export default RegisterPage;