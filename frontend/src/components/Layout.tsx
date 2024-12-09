import React from "react";
import Sidebar from "./sidebar";
import { useSidebar } from "../contexts/sidebarContext";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const {isCollapsed} = useSidebar();

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main 
        className={`transition-all duration-500 ${
          isCollapsed ? "ml-[5rem]" : "ml-[16rem]"
        } flex-1 bg-white p-6`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;