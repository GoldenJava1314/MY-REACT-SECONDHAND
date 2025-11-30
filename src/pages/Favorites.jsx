import { useEffect, useState } from "react";
import { getMyFavorites } from "../services/carApi";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getMyFavorites().then(list => setCars(list));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>★ 我的關注清單</h1>
      <hr />

      {cars.length === 0 && <p>目前沒有任何關注的車喔！</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px"
        }}
      >
        {cars.map(car => (
          <Link
            key={car.id}
            to={`/details/${car.id}`}
            style={{
              textDecoration: "none",
              color: "black",
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "10px"
            }}
          >
            <img
              src={car.imageUrl}
              alt=""
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{car.brand} {car.model}</h3>
            <p>年份：{car.year}</p>
            <p>價格：NT$ {car.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
