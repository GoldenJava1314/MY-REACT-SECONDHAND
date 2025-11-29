import React, { useState } from "react";
import "../components/carCard.css";

function CarCardV2({ car }) {
  const [mainImage, setMainImage] = useState(car.images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    setModalIndex((modalIndex - 1 + car.images.length) % car.images.length);
  };

  const nextImage = () => {
    setModalIndex((modalIndex + 1) % car.images.length);
  };

  return (
    <div className="car-card">
      {/* 大圖 */}
      <img
        src={mainImage}
        alt={car.model}
        className="car-main-image"
        onClick={() => openModal(car.images.indexOf(mainImage))}
      />

      {/* 縮圖列 */}
      {car.images.length > 1 && (
        <div className="thumbnail-row">
          {car.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              className={`thumbnail ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      )}

      {/* 車輛資訊 */}
      <div className="car-info">
        <div className="car-title">{car.brand} {car.model}</div>
        <div>年份: {car.year}</div>
        <div>里程: {car.mileage} km</div>
        <div>價格: ${car.price}</div>
      </div>

      {/* Modal 畫廊 */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <button className="modal-prev" onClick={prevImage}>‹</button>
            <img src={car.images[modalIndex]} alt="" className="modal-image" />
            <button className="modal-next" onClick={nextImage}>›</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarCardV2;