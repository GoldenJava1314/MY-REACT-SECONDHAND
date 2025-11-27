import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/carCard.css"; // 自己的樣式

function CarCardV2({ car }) {
  // 假設 car.images 是後端回傳的圖片陣列，每個元素是圖片 URL
  const images = car.images?.map(url => ({
    original: url,  // 大圖
    thumbnail: url, // 小圖
  })) || [];

  return (
    <div className="car-card-container">
      <div className="car-image-gallery">
        <ImageGallery 
          items={images} 
          showFullscreenButton={true} 
          showPlayButton={false} 
        />
      </div>
      <div className="car-info">
        <h3>{car.brand} {car.model}</h3>
        <p>年份: {car.year}</p>
        <p>里程: {car.mileage} 公里</p>
        <p>價格: ${car.price}</p>
        {/* 可依需求加更多資訊 */}
      </div>
    </div>
  );
}

export default CarCardV2;