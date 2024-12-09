import React from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "../contexts/sidebarContext";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC = () => {
  const {isCollapsed} = useSidebar();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main 
        className={`transition-all duration-500 ${
          isCollapsed ? "ml-[5rem]" : "ml-[16rem]"
        } flex-1 bg-white`}
      >
        <Header />
        <div className="mt-4">
          <Outlet />
        </div>
        
      </main>
    </div>
  );
};

export default Layout;