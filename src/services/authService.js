// services/authService.js

const API_BASE_URL = "http://localhost:8080";

/**
 * 檢查註冊狀態
 * @returns {Promise<Object>} 包含登入狀態的 API 回應
 */
export const register = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username, password }), // ← 送到後端
  });

  if (!response.ok) {
    const text = await response.text(); 
    console.log("後端錯誤內容：", text);
    throw new Error("註冊失敗");
  }

  return response.json();
};

/**
 * 檢查登入狀態
 * @returns {Promise<Object>} 包含登入狀態的 API 回應
 */
/*export const checkLoginStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/isLoggedIn`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("無法取得登入狀態");
  }

  return response.json();
}; */

/**
 * 登入
 * @param {string} username 用戶名
 * @param {string} password 密碼
 * @returns {Promise<Object>} 包含登入結果的 API 回應
 */
export const login = async (username, password) => {
  const res = await fetch(`${API_BASE_URL}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ← 非常重要：讓瀏覽器接收並回傳 JSESSIONID 
    body: JSON.stringify({ username, password }),
  });

  // 先嘗試解析 JSON（後端回傳 ApiResponse 形式）
  const json = await res.json().catch(() => ({}));

  // 若 HTTP 本身失敗或後端回傳 status 非 200，拋錯
  if (!res.ok || json.status !== 200) {
    // 後端可能會回傳 message 字段
    throw new Error(json.message || "登入失敗");
  }

  const user = json.data; // UserResponseDTO
  // 前端記錄 user id（方便用於顯示 / local logic），這"不會"建立後端 session
  sessionStorage.setItem("LOGIN_USER_ID", user.id);

  return user; // 回傳 user 供前端使用
};

/**
 * 登出
 * @returns {Promise<Object>} 包含登出結果的 API 回應
 */
export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("登出失敗");
  }

  return response.json();
};
