import { useEffect, useState } from "react";
import { getMyCars, restoreCar, deleteCar, hardDeleteCar } from "../services/carApi";
import "../pages/mycars.css"; // CSS 改動包含圖片欄位
import { useCarRefresh } from "../context/CarRefreshContext";

export default function MyCars() {
  const [cars, setCars] = useState([]);
  const isAdmin = sessionStorage.getItem("LOGIN_USER_IS_ADMIN") === "true";

  async function loadData() {
    try {
      setCars(await getMyCars());
    } catch (err) {
      console.error("取得刊登失敗", err);
    }
  }

  async function handleRestore(id) {
    if (!window.confirm("確定要復原嗎？")) return;
    await restoreCar(id);
    setCars(prev => prev.map(car => car.id === id ? { ...car, deleted: false } : car));
  }

  const { triggerRefresh } = useCarRefresh();
  async function handleDelete(id) {
    if (!window.confirm("確定要刪除嗎？")) return;
    await deleteCar(id);
    setCars(prev => prev.map(car => car.id === id ? { ...car, deleted: true } : car));
    triggerRefresh();
  }

  async function handleHardDelete(id) {
    if (!window.confirm("⚠ 這將永久刪除車輛，無法復原！確定？")) return;
    await hardDeleteCar(id);
    setCars(prev => prev.filter(c => c.id !== id));
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mycars-container">
      <h2 className="section-title">我的刊登</h2>

      {/* 表頭 */}
      <div className="mycars-header">
        <div>圖片</div>
        <div>品牌</div>
        <div>型號</div>
        <div>年份</div>
        <div>里程</div>
        <div>價格</div>
        <div>Line ID</div>
        <div>操作</div>
      </div>

      {/* 每列車 */}
      {cars.map(car => (
        <div key={car.id} className={`mycars-row ${car.deleted ? 'deleted' : ''}`}>
          <div className="car-image">
            <img 
              src={car.images && car.images.length > 0 ? car.images[0] : "/placeholder-car.png"} 
              alt={`${car.brand} ${car.model}`} 
            />
          </div>
          <div>{car.brand}</div>
          <div>{car.model}</div>
          <div>{car.year}</div>
          <div>{car.mileage} km</div>
          <div>{car.price} 萬元</div>
          <div>{car.sellerLineId || "未提供"}</div>
          <div className="actions">
            {!car.deleted ? (
              <button onClick={() => handleDelete(car.id)} className="btn-delete">刪除</button>
            ) : (
              <button onClick={() => handleRestore(car.id)} className="btn-restore">還原</button>
            )}
            {isAdmin && (
              <button onClick={() => handleHardDelete(car.id)} className="btn-hard-delete">永久刪除</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
