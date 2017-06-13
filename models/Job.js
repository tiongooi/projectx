const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    belongsTo_employerId: {
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
    jobDate: {
      type: Date,
      default: Date.now
    },
    assignedTo_employeeId: [{
      type: String,
      trim: true
    }],
    comment_commentId: [{
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
    updatedAt: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
