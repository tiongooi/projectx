const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
    fName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    lName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    entity: {
      type: String,
      lowercase: true
    },
    mobile: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      default: "employer"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastLogIn: {
      type: Date,
      default: Date.now
    },
    lastUpdate: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean,
      default: true
    }
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
