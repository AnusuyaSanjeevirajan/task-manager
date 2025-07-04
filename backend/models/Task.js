const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  category: { type: String },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema); 