import React from "react";

const Trash: React.FC = () => {
  return (
    <div className="p-6 bg-white h-screen">
      <h1 className="text-2xl font-bold mb-4">About This App</h1>
        <p className="text-lg text-gray-700">
          This app helps users manage their tasks efficiently. You can create, edit, delete, and categorize tasks into
          "To Do," "In Progress," and "Completed" columns. It also provides a responsive interface and allows you to 
          keep track of tasks across sessions and devices.
        </p>
    </div>
  );
}

export default Trash