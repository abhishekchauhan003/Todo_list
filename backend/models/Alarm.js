const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema({
  time: { type: String, required: true }
});

module.exports = mongoose.model('Alarm', AlarmSchema);