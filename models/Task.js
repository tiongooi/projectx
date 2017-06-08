const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    belongsTo_employerId: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    active: {
      type: Boolean,
      default: true
    },
    lastUpdate: {
      type: Date,
      default: Date.now
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
