import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleSidebar = (e) => {
    setActiveSidebar((prev) => (prev === e ? null : e));
  };

  const setMenu = (e) => {
    setActiveMenu(e);
  }

  return (
    <SidebarContext.Provider value={{ activeSidebar, activeMenu, toggleSidebar, setMenu }}>
      {children}
    </SidebarContext.Provider>
  );
}