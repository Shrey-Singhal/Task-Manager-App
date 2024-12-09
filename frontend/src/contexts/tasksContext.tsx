import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./authContext";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  dueDate: string;
}

interface TasksContextProps {
  tasks: Task[];
  updateTaskStatus: (taskId: string, newStatus: Task["status"]) => void;
  fetchTasks: () => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    if (!user?._id) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/tasks`);
      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <TasksContext.Provider value={{ tasks, updateTaskStatus, fetchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
