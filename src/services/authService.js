// services/authService.js

const API_BASE_URL = "http://localhost:8080";

// 取得 JWT token
const getToken = () => sessionStorage.getItem("JWT_TOKEN");

// ------------------------
// 註冊
// ------------------------
export const register = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.log("後端錯誤內容：", text);
    throw new Error("註冊失敗");
  }

  return response.json();
};

// ------------------------
// 登入 (取得 JWT token)
// ------------------------
export const login = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const text = await res.text();
  console.log("後端原始回傳：", text);

  const json = JSON.parse(text);

  if (!res.ok) {
    throw new Error(json.message || "登入失敗");
  }

  console.log("解析後 JSON：", json);

  return json;
};

// ------------------------
// 登出
// ------------------------
export const logout = async () => {
  // 前端只需刪除 token
  sessionStorage.removeItem("JWT_TOKEN");
  sessionStorage.removeItem("LOGIN_USER_ID");

  // 如果想通知後端，可呼叫 logout API
  const response = await fetch(`${API_BASE_URL}/api/user/auth/logout`, {
    method: "POST",
  });

  if (!response.ok) throw new Error("登出失敗");

  return response.json();
};

// ------------------------
// 通用 fetch，會自動加 Authorization
// ------------------------
export const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  if (!token) throw new Error("尚未登入");

  // 合併 headers
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  const res = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  
  // 嘗試解析 JSON
  const json = await res.json().catch(() => ({}));

  // 若 HTTP 錯誤
  if (!res.ok) throw new Error(json.message || "API 請求失敗");

  return json;
};