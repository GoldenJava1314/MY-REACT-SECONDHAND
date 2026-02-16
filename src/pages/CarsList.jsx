import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CarCardV2 from "../components/CarCardV2";
import { 
  getCars, 
  getMyFavorites, 
  addFavorite, 
  removeFavorite,
  deleteCar  // ★ 加入刪除 API
} from "../services/carApi";
import { useCarRefresh } from "../context/CarRefreshContext";


export default function CarsList() {
  const [cars, setCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const { refreshKey, triggerRefresh} = useCarRefresh();

  useEffect(() => {
    loadCars();
    loadFavorites();
  }, [refreshKey]);
    
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
  // 載入收藏
  // -----------------------------
 async function toggleFavorite(carId) {
  if (!token) return alert("請先登入");

  try {
    if (favorites.includes(carId)) {
      await removeFavorite(carId);
    } else {
      await addFavorite(carId);
    }

    triggerRefresh();  // 全頁同步

  } catch (err) {
    console.error("更新收藏失敗", err);
  }
}

// -----------------------------
// 載入收藏
// -----------------------------
async function loadFavorites() {
  if (!token) return;

  try {
    const res = await getMyFavorites();
    setFavorites(res.data.map(car => car.id));
  } catch (err) {
    console.error("取得收藏失敗", err);
  }
}

  // -----------------------------
  // 刪除車輛
  // -----------------------------
  async function handleDelete(carId) {
    if (!window.confirm("確定要刪除這台車嗎？")) return;

    try {
      await deleteCar(carId);

       triggerRefresh(); //全頁同步

      // 如果該車被收藏，也從收藏中移除，立即更新畫面
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== carId)
      );

      alert("刪除成功！");
    } catch (err) {
      console.error("刪除車輛失敗", err);
      alert("刪除失敗，請稍後再試");
    }
  }

  return (
    <div className="page-section">
      <h2 className="section-title">最新車輛</h2>

      {cars.map((car) => (
        <div key={car.id} style={{ marginBottom: "20px" }}>
          <CarCardV2 car={car} />

          {/* 關注按鈕 */}
          <button
            onClick={() => toggleFavorite(car.id)}
            style={{
              background: favorites.includes(car.id) ? "orange" : "gray",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              marginTop: "10px",
              marginRight: "10px"
            }}
          >
            {favorites.includes(car.id) ? "★ 已關注" : "☆ 關注"}
          </button>

          {/* ★ 刪除按鈕 放在這裡 */}
          <button
            onClick={() => handleDelete(car.id)}
            style={{
              background: "red",
              color: "white",
              padding: "6px 12px",
              border: "none",
              borderRadius: "6px",
              marginTop: "10px",
            }}
          >
            刪除
          </button>
        </div>
      ))}
    </div>
  );
}