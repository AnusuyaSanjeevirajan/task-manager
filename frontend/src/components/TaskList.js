import React from "react";

const TaskList = ({ tasks, toggleStatus, startEditTask, deleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-gray-700 p-6 rounded-lg shadow text-center text-gray-500 dark:text-gray-300">
        No tasks to display. Add a new task!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const hasReminder = !!task.reminder;
        const isRecurring = task.recurring && task.recurring !== "None";
        const isImage = task.attachment && task.attachment.match(/\.(jpeg|jpg|gif|png|webp)$/i);
        const isPDF = task.attachment && task.attachment.match(/\.pdf$/i);
        return (
          <div
            key={task._id}
            className={`relative rounded-xl p-5 glass-card card-hover fade-in border-l-4 ${
              task.priority === "High"
                ? "border-red-500"
                : task.priority === "Medium"
                ? "border-yellow-500"
                : "border-green-500"
            } ${hasReminder ? "ring-2 ring-blue-400" : ""}`}
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {task.title}
                  {hasReminder && (
                    <span className="ml-2 inline-block align-middle" title="Reminder set">
                      <svg className="w-4 h-4 text-blue-500 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  {task.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>Due: {task.dueDate ? task.dueDate.slice(0, 10) : "-"}</span>
                  <span>Priority: {task.priority}</span>
                  <span>Category: {task.category || "-"}</span>
                  <span>Status: {task.status}</span>
                  {hasReminder && (
                    <span className="text-blue-500 font-semibold">Reminder: {new Date(task.reminder).toLocaleString()}</span>
                  )}
                  {isRecurring && (
                    <span className="text-purple-600 font-semibold">Recurring: {task.recurring}</span>
                  )}
                </div>
                {task.attachment && (
                  <div className="mt-2">
                    {isImage ? (
                      <img src={task.attachment} alt="attachment" className="max-h-32 rounded shadow border mb-2" />
                    ) : isPDF ? (
                      <a href={task.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View PDF Attachment</a>
                    ) : (
                      <a href={task.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Attachment</a>
                    )}
                  </div>
                )}
                <div className="w-full mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-300">Progress</span>
                    <span className="text-xs font-semibold text-blue-600">{task.progress ?? 0}%</span>
                  </div>
                  <div className="progress-outer w-full h-3">
                    <div
                      className="progress-inner"
                      style={{ width: `${task.progress ?? 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-end ml-4">
                <button
                  onClick={() => toggleStatus(task._id)}
                  className={`px-3 py-1 rounded text-xs font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    task.status === "Completed"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-800 hover:bg-blue-400 hover:text-white dark:bg-gray-600 dark:text-gray-200"
                  }`}
                >
                  {task.status === "Completed" ? "Mark Pending" : "Mark Complete"}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditTask(task)}
                    className="px-2 py-1 rounded text-xs bg-yellow-400 text-white font-semibold hover:bg-yellow-500 shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-2 py-1 rounded text-xs bg-red-500 text-white font-semibold hover:bg-red-600 shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList; 