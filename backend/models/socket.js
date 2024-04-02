// models/AccessRequest.js

const mongoose = require('mongoose');

const accessRequestSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'], // Define possible status values
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AccessRequest = mongoose.model('AccessRequest', accessRequestSchema);

module.exports = AccessRequest;
