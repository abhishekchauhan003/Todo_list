const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: { type: String, default: "" }
});

module.exports = mongoose.model('Note', NoteSchema);