import React from "react";

function Home() {
  const videos = [
    "SWgXhTmBt30", // 可嵌入影片 1
    "ZooczdzHH_s"  // 可嵌入影片 2
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>歡迎來到二手車市集</h1>
      <p>探索我們的商品, 並將喜愛的商品加入到購物車</p>

      {/* YouTube 可嵌入影片區塊 */}
      <div style={{ marginTop: "30px" }}>
        {videos.map((id) => (
          <div key={id} style={{ marginBottom: "30px" }}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${id}`}
              title={id}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      {/* ⭐ 方法3：不能嵌入的影片改成外部連結 */}
      <div style={{ marginTop: "40px" }}>
        <a
          href="https://www.youtube.com/watch?v=WNudy-vaex8"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            color: "white",
            background: "#1e88e5",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "20px",
            textDecoration: "none"
          }}
        >
          ▶ 點我觀看另一支影片
        </a>
      </div>
    </div>
  );
}

export default Home;