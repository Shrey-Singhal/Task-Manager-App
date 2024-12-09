import React from "react";
import { Task } from "../../contexts/tasksContext";
import { Edit, Trash } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
      <p className="text-sm text-gray-400">Due: {new Date(task.dueDate).toDateString()}</p>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
        className="mt-2 p-2 border rounded text-sm"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <div className="flex justify-end mt-4 space-x-2">
        <button className="text-blue-500">
          <Edit size={20} />
        </button>
        <button className="text-red-500">
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
