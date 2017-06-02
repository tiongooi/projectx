const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    belongsToEmployer: {
      type: String,
      required: true,
      trim: true,
    },
    location_clientId: {
      type: String,
      required: true,
      trim: true,
    },
    task_taskId: [{
      type: String,
      required: true,
      trim: true,
    }],
    jobTitle: {
      type: String,
      required: true
    },
    jobDescription: {
      type: String,
      required: true
    },
    assignedTo: [{
      type: String,
      trim: true
    }],
    type: {
      type: String,
      default: "job"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    jobDate: {
      type: Date,
      default: Date.now
    },
    comment_commentId: [{
      type: String,
      trim: true
    }]
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
