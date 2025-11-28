const API_BASE_URL = "http://localhost:8080";

// 取得所有車輛
export const getCars = async () => {
  const res = await fetch(`${API_BASE_URL}/api/cars`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("無法取得車輛資料");
  return res.json();
};

// 建立車輛（只上傳文字資料）
export async function uploadCar(carData) {

  // ★ 印出即將送出的 JSON
  console.log("送出的 car JSON =", carData);

  const res = await fetch(`${API_BASE_URL}/api/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(carData),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "上傳失敗");
  }

  return data;
}

// 上傳多張圖片
export async function uploadCarImages(carId, files) {
  const formData = new FormData();
  for (let f of files) {
      formData.append("images", f); // ✅ 這裡要跟後端 @RequestParam("images") 一樣
  }

  const res = await fetch(`${API_BASE_URL}/api/cars/${carId}/images`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
if (!res.ok) {
  throw new Error(data.message || "圖片上傳失敗");
}
return data;
}

export async function deleteCar(id) {
  const res = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "刪除失敗");
  }

  return data;
}


// 取得單一車輛
export const getCarById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("無法取得車輛");
  return res.json();
};

export default { getCars, uploadCar, uploadCarImages, getCarById };