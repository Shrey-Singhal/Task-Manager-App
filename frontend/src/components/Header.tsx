import React from "react";
import { useAuth } from "../contexts/authContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex items-center justify-between h-20 px-6 bg-customGrey border-b border-gray-200 sticky top-0">
      {/* Left Content */}
      <h1 className="text-xl font-bold text-gray-800">Tasks</h1>

      {/* Right Content */}
      <div className="ml-auto flex flex-col items-center">
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-gray-800 hover:text-gray-600"
        >
          <LogOut size={24} className="mb-1" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
