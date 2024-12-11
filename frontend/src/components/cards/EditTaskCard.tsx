import React, { useState, useEffect } from 'react';
import { useTasks } from '../../contexts/tasksContext';

interface ITask {
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  dueDate: Date;
}

interface EditTaskCardProps {
  taskId: string;
  onClose: () => void;
}

const EditTaskCard: React.FC<EditTaskCardProps> = ({ taskId, onClose }) => {
  const { tasks, updateTask, fetchTasks } = useTasks();

  const [task, setTask] = useState<ITask | null>(null);

  // Fetch the current task details from the context
  useEffect(() => {
    const currentTask = tasks.find((t) => t._id === taskId);
    if (currentTask) {
      setTask({
        title: currentTask.title,
        description: currentTask.description || "",
        status: currentTask.status,
        dueDate: new Date(currentTask.dueDate),
      });
    }
  }, [taskId, tasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    try {
      await updateTask(taskId, {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      });

      await fetchTasks();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask!,
      [name]: name === "dueDate" ? new Date(value) : value,
    }));
  };

  // Display a loading state if task details are not yet available
  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={task.dueDate.toISOString().substring(0, 10)}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-customLightBlue bg-customDarkBlue rounded hover:brightness-150"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskCard;
