import { useState, useEffect } from "react";
import CarCardV3 from "../components/CarCardV2";
import "../styles/global.css";
import { getCars, deleteCar } from "../services/carApi";

function CarsList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteCars") || "[]");
  });

  const fetchCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("確定要刪除這台車嗎？")) return;

    try {
      await deleteCar(id);
      setCars(cars.filter(c => c.id !== id));
      alert("刪除成功");
    } catch (e) {
      alert("刪除失敗：" + e.message);
      if (e.message.includes("未登入")) {
        window.location.href = "/login";
      }
    }
  };

  const toggleFavorite = (car) => {
    let updated = [];
    if (favorites.some(f => f.id === car.id)) {
      updated = favorites.filter(f => f.id !== car.id);
    } else {
      updated = [...favorites, car];
    }
    setFavorites(updated);
    localStorage.setItem("favoriteCars", JSON.stringify(updated));
  };

  if (loading) return <div>載入中...</div>;

  return (
    <div className="page-section">
      <h2 className="section-title">最新車輛</h2>
      {cars.length === 0 ? (
        <p>目前沒有車輛資料</p>
      ) : (
        cars.map(c => (
          <div key={c.id} style={{ position: "relative", marginBottom: "20px" }}>
            <CarCardV3 car={c} />
            <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: "5px" }}>
              <button
                onClick={() => handleDelete(c.id)}
                style={{ backgroundColor: "red", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}
              >
                刪除
              </button>
              <button
                onClick={() => toggleFavorite(c)}
                style={{
                  backgroundColor: favorites.some(f => f.id === c.id) ? "#007bff" : "#ccc",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  cursor: "pointer"
                }}
              >
                {favorites.some(f => f.id === c.id) ? "已關注" : "關注"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CarsList;