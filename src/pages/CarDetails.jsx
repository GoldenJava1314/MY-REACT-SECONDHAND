import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../services/carApi";
import "../styles/carDetails.css";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteCars") || "[]");
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCarById(id);
        setCar(data);
        if (data.imageUrls?.length > 0) {
          setMainImage(data.imageUrls[0]); // 預設大圖
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchCar();
  }, [id]);

  const toggleFavorite = () => {
    if (!car) return;
    let updated = [];
    if (favorites.some(f => f.id === car.id)) {
      updated = favorites.filter(f => f.id !== car.id);
    } else {
      updated = [...favorites, car];
    }
    setFavorites(updated);
    localStorage.setItem("favoriteCars", JSON.stringify(updated));
  };

  if (!car) return <div>載入中...</div>;

  const isFavorite = favorites.some(f => f.id === car.id);

  return (
    <div className="car-details-container">

      {/* 左邊圖片區 */}
      <div className="image-gallery">
        <img src={mainImage} className="main-image" alt="主圖" />

        <div className="thumbnail-container">
          {car.imageUrls.map((img, index) => (
            <img
              key={index}
              src={img}
              className="thumbnail"
              onClick={() => setMainImage(img)}
              alt="縮圖"
            />
          ))}
        </div>
      </div>

      {/* 右邊資訊區 */}
      <div className="car-info">
        <h2>{car.brand} {car.model}</h2>
        <p>年份：{car.year}</p>
        <p>里程：{car.miles} km</p>
        <p>價格：{car.price} 萬</p>

        {/* 關注按鈕 */}
        <button
          onClick={toggleFavorite}
          style={{
            padding: "8px 12px",
            backgroundColor: isFavorite ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          {isFavorite ? "已關注" : "關注"}
        </button>
      </div>
    </div>
  );
}

export default CarDetails;