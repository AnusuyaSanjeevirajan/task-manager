import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, addTask as apiAddTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getTasks();
        setTasks(data);
        setError("");
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = await apiAddTask(task);
      setTasks((prev) => [newTask, ...prev]);
      setError("");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const startEditTask = (task) => {
    setEditingTask(task);
  };

  const submitEditTask = async (updatedTask) => {
    try {
      const updated = await apiUpdateTask(editingTask._id, updatedTask);
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setEditingTask(null);
      setError("");
    } catch (err) {
      setError("Failed to edit task");
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  const toggleStatus = async (id) => {
    const task = tasks.find((t) => t.id === id || t._id === id);
    if (!task) return;
    try {
      const updated = await apiUpdateTask(task._id || task.id, {
        ...task,
        status: task.status === "Completed" ? "Pending" : "Completed",
      });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setError("");
    } catch (err) {
      setError("Failed to update task status");
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiDeleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition-colors animate-gradient-move">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white drop-shadow-lg">Task Manager</h1>
        </div>
        <FilterBar />
        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          submitEditTask={submitEditTask}
          cancelEdit={cancelEdit}
        />
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-300">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            toggleStatus={toggleStatus}
            startEditTask={startEditTask}
            deleteTask={deleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
