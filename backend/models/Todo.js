const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, default: 'Medium' },
  dueDate: { type: String, default: 'No Due Date' }
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);