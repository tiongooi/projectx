const mongoose = require('mongoose');

const connectionSchema = mongoose.Schema({
    employerId: {
      type: String,
      required: true,
      trim: true
    },
    employeeId: [{
      type: String,
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
