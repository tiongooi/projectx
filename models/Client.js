const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    belongsTo_employerId: {
      type: String,
      required: true,
      trim: true
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    clientContact: {
      type: String,
      required: true,
      trim: true
    },
    propertyName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    location:{
        number: {
          type: String,
          trim: true
        },
        street: {
          type: String,
          trim: true,
          lowercase: true
        },
        postcode: {
          type: String,
          trim: true
        },
        city: {
          type: String,
          trim: true,
          lowercase: true
        },
        country: {
          type: String,
          trim: true,
          default: "Australia"
        }
    },
    type: {
      type: String,
      default: "client"
    },
    createdAt: {
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

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
