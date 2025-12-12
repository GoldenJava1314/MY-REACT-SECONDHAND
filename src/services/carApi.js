import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/cars";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

// -----------------------------
// 取得所有車輛
// -----------------------------
export async function getCars() {
  return axios.get(`${API_BASE_URL}`, { withCredentials: true });
}

// -----------------------------
// 建立車輛（純文字）
// -----------------------------
export async function uploadCar(carData) {
  console.log("送出的 car JSON =", carData);

  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(carData),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "上傳失敗");
  return data;
}

// -----------------------------
// 上傳多張圖片
// -----------------------------
export async function uploadCarImages(carId, files) {
  const formData = new FormData();
  for (let f of files) {
    formData.append("images", f);
  }

  const res = await fetch(`${API_BASE_URL}/${carId}/images`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "圖片上傳失敗");

  console.log("total size =", [...files].reduce((s, f) => s + f.size, 0));
  return data;
}

// -----------------------------
// 取得單一車輛（唯一的版本）
// -----------------------------
export async function getCarById(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, { credentials: "include" });
  return res.json();
}

// -----------------------------
// 🔧 查詢是否收藏
// -----------------------------
export async function checkFavorite(carId) {
  const res = await fetch(`${API_BASE_URL}/favorite/check/${carId}`, {
    credentials: "include",
  });
  return res.json();
}

// -----------------------------
// 🔧 取得我的收藏清單
// -----------------------------
export async function getMyFavorites() {
  return axios.get(`${API_BASE_URL}/favorite/list`, { withCredentials: true });
}

// ⭐加入收藏
export async function addFavorite(carId) {
  return axios.post(`${API_BASE_URL}/favorite/${carId}`, null, { withCredentials: true });
}

// ⭐移除收藏
export async function removeFavorite(carId) {
  return axios.delete(`${API_BASE_URL}/favorite/${carId}`, { withCredentials: true });
}

export async function loadCars() {
  try {
    const res = await getCars(); // 從 carApi.js import
    setCars(res.data); // 設定狀態
  } catch (err) {
    console.error("取得車輛失敗", err);
  }
}

// 取得我的車輛
// -----------------------------
export async function getMyCars() {
  const res = await api.get("/cars/my-cars");
  return res.data?.data ?? [];
}

// 還原
export async function restoreCar(carId) {
  const res = await api.post(`/cars/restore/${carId}`);
  return res.data;
}

// 永久刪除
export async function hardDeleteCar(carId) {
  const res = await api.delete(`/cars/hard-delete/${carId}`);
  return res.data;
}

// 刪除（軟刪除）
export async function deleteCar(carId) {
  const res = await api.delete(`/cars/${carId}`);
  return res.data;
}

export default {
  getCars,
  uploadCar,
  uploadCarImages,
  deleteCar,
  getCarById,
  checkFavorite,
  getMyFavorites,
  addFavorite,
  removeFavorite,
  getMyCars,
  restoreCar,
  hardDeleteCar
};