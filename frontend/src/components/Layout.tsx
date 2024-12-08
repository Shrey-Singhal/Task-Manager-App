import React from "react";
import Sidebar from "./sidebar";
import { useSidebar } from "../contexts/sidebarContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {isCollapsed} = useSidebar();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main 
        className={`transition-all duration-500 ${
          isCollapsed ? "ml-[5rem]" : "ml-[16rem]"
        } flex-1 bg-white p-6`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
