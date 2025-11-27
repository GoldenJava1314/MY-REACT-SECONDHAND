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
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {

    //console.log("送出的 car JSON=", carData); // ★ 放這裡！

    e.preventDefault();

 /*    const carData = {
    brand,
    model,
    year: Number(year),
    mileage: Number(mileage),
    price: Number(price),
  };  */
    

    try {
      // 1. 建立 car（後端回傳包含 id）
      const carData = { brand, model, year: parseInt(year), mileage: parseInt(mileage), price: parseFloat(price) };
      const created = await uploadCar(carData);

      // 2. 若有檔案，呼叫 uploadCarImages
      if (files.length > 0) {
        await uploadCarImages(created.id, files);
      }

      alert("刊登成功！");
      // reset
      setBrand(""); setModel(""); setYear(""); setMileage(""); setPrice(""); setFiles([]);
    } catch (err) {
  console.error("錯誤：", err);
  alert(err.message);   // 會顯示「未登入」「圖片上傳失敗」等明確訊息
}
  };

  return (
    <div className="upload-card">
      <h2 className="upload-title">刊登二手車</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>廠牌<input value={brand} onChange={(e)=>setBrand(e.target.value)} required/></label>
        <label>車款<input value={model} onChange={(e)=>setModel(e.target.value)} required/></label>
        
     <form className="upload-form">
       <label>年份<input type="number" value={year} onChange={(e)=>setYear(e.target.value)} required/></label>
     </form>

     <form className="upload-form">
       <label>里程<input type="number" value={mileage} onChange={(e)=>setMileage(e.target.value)} required/></label>
       <label>價格<input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} required/></label>
     </form>


 <label className="file-label">
        
          <input type="file" accept="image/*" multiple onChange={(e)=>setFiles([...e.target.files])} />
        </label>
        <button type="submit" className="submit-btn">刊登車輛</button>
      </form>

      
    </div>
  );
}

export default UploadPage;