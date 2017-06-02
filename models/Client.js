const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    belongsToEmployer: {
      type: String,
      required: true,
      trim: true
    },
    clientName: {
      type: String,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      trim: true
    },
    propertyName: {
      type: String,
      required: true,
      trim: true
    },
    location:{
        number: {
          type: String,
          trim: true
        },
        street: {
          type: String,
          trim: true
        },
        postcode: {
          type: String,
          trim: true
        },
        city: {
          type: String,
          trim: true
        }
    },
    type: {
      type: String,
      default: "client"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
