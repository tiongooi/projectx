const mongoose = require('mongoose');

const invitationSchema = mongoose.Schema({
    fromEmployer: {
      type: String,
      required: true,
      trim: true,
    },
    toEmployee: {
      type: String,
      required: true,
      trim: true,
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
    }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
