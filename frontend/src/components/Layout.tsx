import React from "react";
import Sidebar from "./sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar is always visible */}
      <main className="flex-1 bg-white p-6">{children}</main>
    </div>
  );
};

export default Layout;
