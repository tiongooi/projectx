const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
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
    mobile: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      default: "employee"
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

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
