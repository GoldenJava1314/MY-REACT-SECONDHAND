import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMyFavorites, removeFavorite } from "../services/carApi";
import CarCardV2 from "../components/CarCardV2";
import { useCarRefresh } from "../context/CarRefreshContext";

export default function FavoritesPage() {
  const [cars, setCars] = useState([]);
  const location = useLocation();
  const token = localStorage.getItem("ACCESS_TOKEN");

  const { refreshKey, triggerRefresh }  = useCarRefresh();
  useEffect(() => {

    if (!token) return;

    async function loadFavorites() {
      try {
        const res = await getMyFavorites();
        console.log("後端回傳收藏資料:", res);

        const favsArray = Array.isArray(res.data) ? res.data : [];

        const normalized = favsArray.map(car => {
          const imgUrl = `http://localhost:8080${car.images?.[0]}`

          return {
            ...car,
            images: Array.isArray(car.images) && car.images.length > 0
              ? car.images
              : [imgUrl]
          };
        });

        setCars(normalized);
      } catch (err) {
        console.error("取得收藏資料失敗", err);
        setCars([]);
      }
    }

    loadFavorites();
  }, [refreshKey,token]);

  async function handleRemoveFavorite(carId) {
    try {
      await removeFavorite(carId);
      triggerRefresh(); // 通知所有頁面
      setCars(prev => prev.filter(car => car.id !== carId));// 立即更新畫面
    } catch (err) {
      console.error("刪除收藏失敗", err);
      alert("刪除收藏失敗！");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>我的關注</h1>

      {!token ? (
        <p>請先登入才能查看你關注的車輛。</p>
      ) : cars.length === 0 ? (
        <p>你尚未關注任何車輛</p>
      ) : (
        cars.map(car => (
          <div
            key={car.id}
            style={{ marginBottom: "40px", position: "relative" }}
          >
            {/* 🌟 浮動按鈕區塊包住 CarCardV2 */}
            <div style={{ position: "relative" }}>
              
              {/* ⭐ 左上角：聯絡賣家 */}
              <button
                 onClick={() => {
                if (car.sellerLineId) {
                  // Line 聯絡格式：https://line.me/ti/p/<LINE_ID>
                  const url = `https://line.me/ti/p/${car.sellerLineId}`;
                  window.open(url, "_blank");
                } else {
                  alert("賣家未提供 Line 聯絡方式");
                }
                 }}
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  zIndex: 10,
                  background: "#0d6efd",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                聯絡賣家
              </button>

              {/* ⭐ 右上角：移除收藏 */}
              <button
                onClick={() => handleRemoveFavorite(car.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10,
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                移除收藏
              </button>

              {/* 車卡本體 */}
              <CarCardV2 car={car} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}