const mongoose = require('mongoose');

const VehicleRequestSchema = new mongoose.Schema({
    driverNIC: String,
    vehicleNumber: String,
    ownerNIC: String,
    // Add other fields as necessary
});

module.exports = mongoose.model('VehicleRequest', VehicleRequestSchema);
