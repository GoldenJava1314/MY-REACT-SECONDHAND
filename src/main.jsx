import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CarRefreshProvider } from "./context/CarRefreshContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarRefreshProvider>
      <App />
    </CarRefreshProvider>
  </React.StrictMode>
);
