import { useState, useEffect } from "react";
import CarCardV2 from "../components/CarCardV2";
import "../styles/global.css";
import { getCars, deleteCar } from "../services/carApi";

function CarsList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>載入中...</div>;

  return (
    <div className="page-section">
      <h2 className="section-title">最新車輛</h2>
      {cars.length === 0 ? (
        <p>目前沒有車輛資料</p>
      ) : (
        cars.map(c => (
          <div key={c.id} style={{ position: "relative" }}>
            <CarCardV2 car={c} />
            <button
              onClick={() => handleDelete(c.id)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              刪除
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CarsList;