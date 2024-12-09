import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import CreateTaskCard from "../components/cards/CreateTaskCard";

function Dashboard() {
  const { user } = useAuth();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const toggleCreateTaskCard = () => {
    setIsCreateTaskOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-grow">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <div className="ml-auto flex mr-5">
        <button
          onClick={toggleCreateTaskCard}
          className="bg-customDarkBlue text-customLightBlue px-4 py-2 rounded hover:brightness-125"
        >
          Create Task
        </button>
      </div>
      
      {isCreateTaskOpen && (
        <CreateTaskCard 
          userId={user?._id} 
          onClose={toggleCreateTaskCard} 
        />
      )}
    </div>
  );
}

export default Dashboard;
