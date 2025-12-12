import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home"
import CarsList from "./pages/CarsList";
import Navbar from "./components/Navbar";
import CarDetails from "./pages/CarDetails";
import UploadPage from "./pages/UploadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { login, logout } from "./services/authService"; // 用你的實際路徑
import FavoritePage from "./pages/FavoritesPage";
import MyCars from "./pages/MyCars";

// 頁尾相關模組
import Footer from "./components/Footer";



function App() {
  // 登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 購物車內容 (如果你之後要用)
  const [cartItems, setCartItems] = useState([]);

  // 登入處理
  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password);

      if (data.status === 200) {
        setIsLoggedIn(true);
        alert("登入成功");
      } else {
        setIsLoggedIn(false);
        alert("登入失敗: " + data.message);
      }
    } catch (e) {
      setIsLoggedIn(false);
      alert("登入錯誤");
      console.error(e);
    }
  };

  // 登出處理
  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
    } catch (e) {
      console.error(e);
    }
    window.location.href = "/";
  }; 

  return (
    <Router>
    {/* 導航列-位於最上方 */}
     <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {/* 主要內容區-位於中間部分 */}
      <div className='app-main-content'>
        <Routes>
          {/* 首頁路由 */}
          <Route path="/" element={<Home />} />
          {/* 二手車路由 */}
          <Route path="/cars" element={<CarsList />} />
          {/* 買車路由 */}
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/favorites" element={<FavoritePage />} />
          {/* 刊登車輛路由 */}
          <Route path="/upload" element={<UploadPage />} />
          {/* 登入路由 */}
          <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
          {/* 註冊路由 */}
          <Route path="/register" element={<RegisterPage />} />
          {/* 我的刊登路由 */}
          <Route path="/my-cars" element={<MyCars />} />
        </Routes>
      </div>
      {/* 頁尾-位於最下方 */}
       <Footer />
    </Router>
  );
}

export default App;