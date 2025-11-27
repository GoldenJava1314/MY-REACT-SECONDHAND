import { useState } from "react";

function CarImageUpload() {
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
    setSelectedFiles(files);
  };

  const uploadImages = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    const res = await fetch("http://localhost:8080/api/images/upload", {
      method: "POST",
      body: formData,
    });

    const urls = await res.json();
    console.log("Uploaded:", urls);
  };

  return (
    <div>
      <h2>上傳車輛圖片（支援多張）</h2>

      <input type="file" multiple accept="image/*" onChange={handleFileChange} />

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {previewImages.map((src, idx) => (
          <img key={idx} src={src} width="150" alt="preview" />
        ))}
      </div>

      <button onClick={uploadImages}>上傳</button>
    </div>
  );
}

export default CarImageUpload;