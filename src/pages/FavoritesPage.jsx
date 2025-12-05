import { useEffect, useState } from "react";
import { getMyFavorites, removeFavorite } from "../services/carApi";
import CarCardV2 from "../components/CarCardV2";

export default function FavoritesPage() {
  const [cars, setCars] = useState([]);
  const userId = sessionStorage.getItem("LOGIN_USER_ID");

  useEffect(() => {
    async function loadFavorites() {
      try {
        const res = await getMyFavorites();
        console.log("後端回傳收藏資料:", res);

        const favsArray = Array.isArray(res.data) ? res.data : [];

        const normalized = favsArray.map(car => {
          const imgUrl = `http://localhost:8080/api/cars/${car.id}/images/0`;

          return {
            ...car,
            images: Array.isArray(car.images) && car.images.length > 0
              ? car.images
              : [imgUrl], 
          };
        });

        setCars(normalized);
      } catch (err) {
        console.error("取得收藏資料失敗", err);
        setCars([]);
      }
    }

    loadFavorites();
  }, []);

  // ⭐ 新增：刪除收藏功能
  async function handleRemoveFavorite(carId) {
    try {
      await removeFavorite(carId);

      // ⭐ 前端即時移除畫面上的車輛
      setCars(prev => prev.filter(car => car.id !== carId));
    } catch (err) {
      console.error("刪除收藏失敗", err);
      alert("刪除收藏失敗！");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>我的關注</h1>

      {!userId ? (
        <p>請先登入才能查看你關注的車輛。</p>
      ) : cars.length === 0 ? (
        <p>你尚未關注任何車輛</p>
      ) : (
        cars.map(car => (
          <div key={car.id} style={{ marginBottom: "30px" }}>
            {/* 車卡 */}
            <CarCardV2 car={car} />

            {/* ⭐ 刪除收藏按鈕 */}
            <button
              onClick={() => handleRemoveFavorite(car.id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#ff5b5b",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              ❌ 移除收藏
            </button>
          </div>
        ))
      )}
    </div>
  );
}