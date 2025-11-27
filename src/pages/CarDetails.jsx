import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../services/carApi";
import "../styles/carDetails.css";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState("");

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

  if (!car) return <div>載入中...</div>;

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
      </div>
    </div>
  );
}

export default CarDetails;