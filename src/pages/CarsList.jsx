import { useEffect, useState } from "react";
import CarCardV2 from "../components/CarCardV2";
import { getCars, getMyFavorites, addFavorite, removeFavorite } from "../services/carApi";

export default function CarsList() {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const userId = sessionStorage.getItem("LOGIN_USER_ID");

  // -----------------------------
  // 載入車輛
  // -----------------------------
  async function loadCars() {
    try {
      const res = await getCars();
      setCars(res.data);
    } catch (err) {
      console.error("取得車輛失敗", err);
    }
  }

  // -----------------------------
  // 載入我的收藏
  // -----------------------------
  async function loadFavorites() {
    try {
      const res = await getMyFavorites();
      setFavorites(res.data.map(car => car.id));
    } catch (err) {
      console.error("取得收藏失敗", err);
    }
  }

  useEffect(() => {
    loadCars();
    loadFavorites();
  }, []);

  // -----------------------------
  // 切換收藏
  // -----------------------------
  async function toggleFavorite(carId) {
  if (!userId) return alert("請先登入");

  try {
    let res;
    if (favorites.includes(carId)) {
      res = await removeFavorite(carId);
    } else {
      res = await addFavorite(carId);
    }

    // 後端回傳最新收藏 ID 列表
    setFavorites(res.data);
  } catch (err) {
    console.error("更新收藏失敗", err);
  }
}

  return (
    <div className="page-section">
      <h2 className="section-title">最新車輛</h2>

      {cars.map((car) => (
        <div key={car.id} style={{ marginBottom: "20px" }}>
          <CarCardV2 car={car} />

          <button
            onClick={() => toggleFavorite(car.id)}
            style={{
              background: favorites.includes(car.id) ? "orange" : "gray",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              marginTop: "10px",
            }}
          >
            {favorites.includes(car.id) ? "★ 已關注" : "☆ 關注"}
          </button>
        </div>
      ))}
    </div>
  );
}