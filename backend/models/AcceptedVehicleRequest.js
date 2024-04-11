const mongoose = require('mongoose');

const VehicleAcceptanceSchema = new mongoose.Schema({
  driverNIC: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  ownerNIC: { type: String, required: true },
  startDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  revenueDetails: {
    engineno: String,
    owner: String,
    email:String,
    address: String,
    officelocation:String,
    issuedate: Date,
    expdate: Date,
    amount: Number,
    weight:String,
    seatno:Number,
    vetnumber:Number,
    vehicleclass: String,
    vehiclefueltype:String,
    
  },
  insuranceDetails: {
    companyid: String,
    companyname: String,
    engineno: String,
    id:String,
    chassisno: String,
    fullname: String,
    email: String,
    officelocation:String,
    address: String,
    phoneno: String,
    issuedate: Date,
    expdate: Date,
    vehicleclass: String,
    vehiclemodel: String,
    vehicleprovince:String,
    
  },
  
});

const VehicleAcceptance = mongoose.model('VehicleAcceptance', VehicleAcceptanceSchema);

module.exports = VehicleAcceptance;
