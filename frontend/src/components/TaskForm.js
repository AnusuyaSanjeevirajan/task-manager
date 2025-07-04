import React, { useState, useEffect } from "react";

const initialState = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Medium",
  category: "",
  status: "Pending",
  reminder: "",
  progress: 0,
  recurring: "None",
  attachment: null,
};

const priorities = ["Low", "Medium", "High"];
const statuses = ["Pending", "Completed"];
const recurringOptions = ["None", "Daily", "Weekly", "Monthly"];

const TaskForm = ({ addTask, editingTask, submitEditTask, cancelEdit }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "",
        priority: editingTask.priority || "Medium",
        category: editingTask.category || "",
        status: editingTask.status || "Pending",
        reminder: editingTask.reminder ? editingTask.reminder.slice(0, 16) : "",
        progress: editingTask.progress ?? 0,
        recurring: editingTask.recurring || "None",
        attachment: editingTask.attachment || null,
      });
    } else {
      setForm(initialState);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "range" ? Number(value) : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, attachment: URL.createObjectURL(file) }));
    } else {
      setForm((prev) => ({ ...prev, attachment: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    if (editingTask) {
      submitEditTask(form);
    } else {
      addTask(form);
    }
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 glass-card p-6 shadow flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 mb-1">Title<span className="text-red-500">*</span></label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          rows={2}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            placeholder="e.g. Work, Personal"
          />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Reminder</label>
          <input
            type="datetime-local"
            name="reminder"
            value={form.reminder}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Progress: <span className="font-semibold text-blue-600">{form.progress}%</span></label>
          <input
            type="range"
            name="progress"
            min="0"
            max="100"
            value={form.progress}
            onChange={handleChange}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Recurring</label>
          <select
            name="recurring"
            value={form.recurring}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          >
            {recurringOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">Attachment</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
          {form.attachment && (
            <div className="mt-2">
              <a href={form.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Attachment</a>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="btn-gradient font-semibold py-2 px-6 rounded shadow"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-400 text-white font-semibold py-2 px-4 rounded shadow hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm; 