import { useState } from "react";
import { uploadCar, uploadCarImages } from "../services/carApi";
import "../styles/global.css";
import "./uploadPage.css";

function UploadPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [sellerLineId, setSellerLineId] = useState("");   // ← 新增
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).filter(f => f.size > 0);

    const newFiles = [...files, ...selected];

    if (newFiles.length > 20) {
      alert("最多只能上傳20張圖片");
      return;
    }
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const carData = { 
        brand, 
        model, 
        year: parseInt(year), 
        mileage: parseInt(mileage), 
        price: parseFloat(price),
        sellerLineId    // ★ 新增欄位送到後端
      };

      const created = await uploadCar(carData);

      if (files.length > 0) {
        await uploadCarImages(created.id, files);
      }

      alert("刊登成功！");
      setBrand(""); setModel(""); setYear(""); setMileage(""); setPrice("");
      setSellerLineId("");
      setFiles([]);

    } catch (err) {
      console.error("錯誤：", err);
      alert(err.message);
    }
  };

  return (
    <div className="upload-card">
      <h2 className="upload-title">刊登二手車</h2>
      <form className="upload-form" onSubmit={handleSubmit}>

  <div className="form-row">
    <label>廠牌</label>
    <input value={brand} onChange={(e)=>setBrand(e.target.value)} required/>
  </div>

  <div className="form-row">
    <label>車款</label>
    <input value={model} onChange={(e)=>setModel(e.target.value)} required/>
  </div>

  <div className="form-row">
    <label>年份</label>
    <input type="number" value={year} onChange={(e)=>setYear(e.target.value)} required/>
  </div>

  <div className="form-row">
    <label>里程</label>
    <input type="number" value={mileage} onChange={(e)=>setMileage(e.target.value)} required/>
  </div>

  <div className="form-row">
    <label>價格(萬)</label>
    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
  </div>

  <div className="form-row">
    <label>Line ID</label>
    <input
      type="text"
      value={sellerLineId}
      onChange={(e) => setSellerLineId(e.target.value)}
      placeholder="買家可用此聯絡你"
    />
  </div>

  <div className="form-row">
    <label>車輛照片</label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleFileChange}
    />
  </div>

  <button type="submit" className="submit-btn">刊登車輛</button>
</form>
    </div>
  );
}

export default UploadPage;