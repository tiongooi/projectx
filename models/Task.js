const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    belongsToEmployer: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
