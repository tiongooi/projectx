const mongoose = require('mongoose');

const invitationSchema = mongoose.Schema({
    from_employerId: {
      type: String,
      required: true,
      trim: true,
      default: "Employer ID not set"
    },
    to_employeeId: {
      type: String,
      required: true,
      trim: true,
      default: "Employee ID not set"
    },
    type: {
      type: String,
      default: "invitation"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    accepted: {
      type: Boolean,
      default: false
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

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
