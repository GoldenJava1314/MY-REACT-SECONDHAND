import { useState } from "react";

function UploadImages() {
  const [previewImages, setPreviewImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const selected = Array.from(e.target.files);

    setFiles(selected);
    setPreviewImages(selected.map((file) => URL.createObjectURL(file)));
  };

  const upload = async () => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    const res = await fetch("http://localhost:8080/api/images/upload", {
      method: "POST",
      body: formData,
    });

    const urls = await res.json();
    console.log("Uploaded:", urls);
  };

   useEffect(() => {
    return () => {
      previewImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  return (
    <div>
      <h1>上傳車輛圖片</h1>
      <input type="file" multiple accept="image/*" onChange={handleChange} />

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        {previewImages.map((src, i) => (
          <img key={i} src={src} width="150" alt="" />
        ))}
      </div>

      <button onClick={upload}>上傳</button>
    </div>
  );
}

export default UploadImages;