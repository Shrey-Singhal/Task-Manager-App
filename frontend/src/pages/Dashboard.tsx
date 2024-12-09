import React from "react";
import { useAuth } from "../contexts/authContext";
import { useTasks } from "../contexts/tasksContext";
import CreateTaskCard from "../components/cards/CreateTaskCard";
import TaskCard from "../components/cards/TaskCard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tasks, updateTaskStatus } = useTasks();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = React.useState(false);

  const toggleCreateTaskCard = () => setIsCreateTaskOpen((prev) => !prev);

  const handleStatusChange = (taskId: string, newStatus: string) => {
    updateTaskStatus(taskId, newStatus as "To Do" | "In Progress" | "Completed");
    // Optionally, update backend here.
  };

  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    "Completed": tasks.filter((task) => task.status === "Completed"),
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
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

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status}>
            <h2 className="text-lg font-bold mb-4">{status}</h2>
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
