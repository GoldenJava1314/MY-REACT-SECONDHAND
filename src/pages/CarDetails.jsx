import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCarById, toggleFavorite, checkFavorite  } from "../services/carApi";
import "../styles/carDetails.css";


export default function CarDetails() {
  const { id } = useParams(); // /details/:id
  const [car, setCar] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // 初始化：讀取車輛資料 + 是否已收藏
  useEffect(() => {
    getCarById(id).then(res => setCar(res));

    checkFavorite(id).then(isFav => {
      setIsFavorite(isFav);
    });
  }, [id]);

  // 點擊按鈕 → 收藏 or 取消收藏
  async function handleFavorite() {
    const result = await toggleFavorite(id);
    setIsFavorite(result.isFavorite); // 後端會回傳收藏狀態
  }

  if (!car) return <h2>載入中...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{car.brand} {car.model}</h1>
      <p>年份：{car.year}</p>
      <p>售價：{car.price}</p>

      {/* ⭐關注按鈕 */}
      <button
        onClick={handleFavorite}
        style={{
          padding: "10px 20px",
          background: isFavorite ? "orange" : "gray",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        {isFavorite ? "★ 已關注（取消）" : "☆ 加入關注"}
      </button>
    </div>
  );
}