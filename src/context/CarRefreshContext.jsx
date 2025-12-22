//建立一個「全域刷新旗標」
import { createContext, useContext, useState } from "react";

const CarRefreshContext = createContext();

export function CarRefreshProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <CarRefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </CarRefreshContext.Provider>
  );
}

export function useCarRefresh() {
  return useContext(CarRefreshContext);
}