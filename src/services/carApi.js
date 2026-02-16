import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

// 🔥 每次請求自動帶 JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -----------------------------
// 取得所有車輛
// -----------------------------
export const getCars = () => api.get("/cars");

// -----------------------------
// 上傳車輛
// -----------------------------
export const uploadCar = async (carData) => {
  const res = await api.post("/cars", carData);
  return res.data;   
};

// -----------------------------
// 上傳圖片
// -----------------------------
export const uploadCarImages = (carId, files) => {
  const formData = new FormData();
  for (let f of files) {
    formData.append("images", f);
  }

  return api.post(`/cars/${carId}/images`, formData);
};

// -----------------------------
export const getCarById = (id) =>
  api.get(`/cars/${id}`);

// -----------------------------
export const getMyFavorites = () =>
  api.get("/cars/favorite/list");

// -----------------------------
export const addFavorite = (carId) =>
  api.post(`/cars/favorite/${carId}`);

// -----------------------------
export const removeFavorite = (carId) =>
  api.delete(`/cars/favorite/${carId}`);

// -----------------------------
export const deleteCar = (carId) =>
  api.delete(`/cars/${carId}`);

// -----------------------------
export const getMyCars = async () => {
  const res = await api.get("/cars/my-cars");
  return res.data.data;   //只回傳真正陣列
};

// -----------------------------
export const restoreCar = (carId) =>
  api.post(`/cars/restore/${carId}`);

// -----------------------------
export const hardDeleteCar = (carId) =>
  api.delete(`/cars/hard-delete/${carId}`);