const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    employerId: {
      type: String,
      trim: true
    },
    employeeId: [{
      type: String,
      trim: true
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
