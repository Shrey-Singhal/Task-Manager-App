import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useTasks } from "../contexts/tasksContext";
import CreateTaskCard from "../components/cards/CreateTaskCard";
import TaskCard from "../components/cards/TaskCard";
import EditTaskCard from "../components/cards/EditTaskCard";


const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { tasks, updateTask, fetchTasks } = useTasks();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>("");

  const toggleCreateTaskCard = () => setIsCreateTaskOpen((prev) => !prev);

  const openEditTaskCard = (taskID: string) => {
    setTaskToEdit(taskID);
    setIsEditTaskOpen(true);
  }

  const closeEditTaskCard = () => {
    setTaskToEdit("");
    setIsEditTaskOpen(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    const response = await fetch(`https://task-manager-app-backend-zu9l.onrender.com/api/tasks/${taskId}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Failed to delete task");

    await fetchTasks();
  }

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try{
      await updateTask(taskId, { status: newStatus as "To Do" | "In Progress" | "Completed" });
      await fetchTasks();
    }
    catch (error) {
      console.error("Error updating the task: ", error);
    }
  };

  const groupedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    "Completed": tasks.filter((task) => task.status === "Completed"),
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-customPurple";
      case "In Progress":
        return "bg-customSkyBlue";
      case "Completed":
        return "bg-customGreen";
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        <button
          onClick={toggleCreateTaskCard}
          className="bg-customDarkBlue text-white px-4 py-2 rounded hover:brightness-125"
        >
          Add Task
        </button>
      </div>

      {isCreateTaskOpen && (
        <CreateTaskCard 
          userId={user?._id} 
          onClose={toggleCreateTaskCard}
          onTaskCreated={fetchTasks}
        />
      )}

      {isEditTaskOpen && (
        <EditTaskCard 
          taskId={taskToEdit}
          onClose={closeEditTaskCard}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status}>
            <div className={`mb-4 p-2 rounded-md ${getStatusClass(status)}`}>
              <h2 className="text-lg font-bold ml-2">{status}</h2>
            </div>
            
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onStatusChange={handleStatusChange}
                  onEdit={()=> openEditTaskCard(task._id)}
                  onDelete={() => handleDeleteTask(task._id)}
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
