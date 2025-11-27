import { useState } from "react";
import { uploadCarImage } from "../services/carApi";

function CarCard({ car }) {
  const [showInput, setShowInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageUpdate = async () => {
    if (!selectedFile) {
      alert("請選擇圖片檔案");
      return;
    }

    try {
      await uploadCarImage(car.id, selectedFile);
      alert("圖片更新成功！");
      window.location.reload();
    } catch (err) {
      alert("更新失敗：" + err.message);
    }
  };

  return (
    <div className="car-card">
      <img
        src={car.imageUrl ? car.imageUrl : "/no-image.png"}
        alt="Car"
        className="car-image"
      />

      <h3>{car.brand} {car.model}</h3>

      <button onClick={() => setShowInput(!showInput)}>
        更新圖片
      </button>

      {showInput && (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button onClick={handleImageUpdate}>確認更新</button>
        </div>
      )}
    </div>
  );
}

export default CarCard;