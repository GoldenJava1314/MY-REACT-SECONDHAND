import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCarById,
  getMyFavorites,
  addFavorite,
  removeFavorite,
} from "../services/carApi";

export default function CarDetails() {
  const { id } = useParams();
  const userId = sessionStorage.getItem("LOGIN_USER_ID"); // 登入後要存這個
  const [car, setCar] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function load() {
      const carData = await getCarById(id);
      setCar(carData);

      if (userId) {
        const favorites = await getMyFavorites(userId);
        setIsFavorite(favorites.some((f) => f.id == id));
      }
    }
    load();
  }, [id]);

  async function handleFavorite() {
  const newStatus = await toggleFavorite(id, isFavorite);
  setIsFavorite(newStatus); 
}

// useEffect(() => {
//  getCarById(id).then(setCar);
// checkFavorite(id).then(setIsFavorite);
//}, [id]); 

  if (!car) return <h2>載入中...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{car.brand} {car.model}</h1>
      <p>年份：{car.year}</p>
      <p>售價：{car.price}</p>

      <button
        onClick={handleFavorite}
        style={{
          padding: "10px 20px",
          background: isFavorite ? "orange" : "gray",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "★ 已關注（取消）" : "☆ 加入關注"}
      </button>
    </div>
  );
}