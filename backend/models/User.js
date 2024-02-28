const { text } = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  officeid: {
    type:String,
    required:true,
    unique:true
  },
  id: {
    type:String,
    required:true,
    unique:true
  },
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: 'police', 
  },
});

const Police = mongoose.model('Police', userSchema, 'admin');


const user7Schema = new mongoose.Schema({
  officeid: {
    type:String,
    required:true,
    unique:true
  },
  username:{
    type:String,
    unique:true
  },
  id: {
    type:String,
    required:true,
    unique:true
  },
  fullname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    unique:true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['police','Police'], 
  },
});

const PoliceEmp = mongoose.model('PoliceEmp', user7Schema, 'police');



const user2Schema = new mongoose.Schema({
  officeid: {
    type:String,
    required:true,
    unique:true
  },
  id: {
    type:String,
    required:true,
    unique:true
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum:  'motortrafficregistrationdepartment',
  },
});

const MTRDEmployee = mongoose.model('MTRDEmployee', user2Schema, 'admin');




const user4Schema = new mongoose.Schema({
  officeid: {
    type:String,
    required:true,
    unique:true
  },
  id: {
    type:String,
    required:true,
    unique:true
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum:  'rregistrationdepartment',
  },
});

const RRDEmployee = mongoose.model('RRDEmployee', user4Schema, 'admin');








const user9Schema = new mongoose.Schema({
  officeid: {
    type:String,
    required:true,
    unique:true
  },
  id: {
    type:String,
    required:true,
    unique:true
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum:  'rregistrationdepartment',
  },
});

const RRDEmployeeEmp = mongoose.model('RRDEmployeeEmp', user9Schema, 'RevenueEmp');





const user3Schema = new mongoose.Schema({
  officeid: {
    type:String,
    required:true,
    unique:true
  },
  id: {
    type:String,
    required:true,
    unique:true
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String  ,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum:  ['dregistrationdepartment', 'vregistrationdepartment' ],
  },
});

const DRDEmployee = mongoose.model('DRDEmployee', user3Schema, 'employee');

const user5Schema = new mongoose.Schema({
  chassisno: {
    type:String,
    required:true,
    unique:true
  },
  engineno: {
    type:String,
    required:true,
    unique:true
  },
  seatingcapacity: {
    type: Number,
    required: true,
    
  },
  ownerfullname: {
    type: String,
    required: true,
    unique:true
  },
  nic: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type:String,
    
  },
  address: {
    type: String,
    required: true,
  },
  
  phoneno: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
   
    unique: true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  vehicleclass: {
    type: String,
    required: true,
  },
  vehiclemodel: {
    type: String,
    required: true,
  },
  vehiclecolor: {
    type: String,
    required: true,
  },
  vehicleprovince: {
    type: String,
    required: true,
  },
  vehicletaxationclass: {
    type: String,
    required: true,
  },
  vehicleorigincountry: {
    type: String,
    required: true,
  },
  vehiclecylindercapacity: {
    type: String,
    required: true,
  },
  vehiclestatus: {
    type: String,
    required: true,
  },
  vehiclefueltype: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum:  ['VehicleOwner','dregistrationdepartment','motortrafficregistrationdepartment','police','Police','rregistrationdepartment','vregistrationdepartment'],
  },
});

const MTDVehicle = mongoose.model('MTDVehicle', user5Schema, 'vehicle');


const user6Schema = new mongoose.Schema({
  nic: {
    type:String,
    required:true,
    unique:true
  },
  email: {
    type: String  ,
    required: true,
  },
  password: {
    type: String,
  },
  username: {
    type: String,
   
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  
  address: {
    type: String,
    required: true,
  },
  officelocation: {
    type: String,
    required: true,
  },
  bloodtype: {
    type:String,
    required:true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  birthday: {
    type:Date,
    required:true,
  },
  issuedate: {
    type:Date,
    required:true,
  },
  expdate: {
    type:Date,
    required:true,
  },
  role: {
    type: String,
    
    enum:  ['driver','dregistrationdepartment','motortrafficregistrationdepartment','police'],
  },
  
});

const Driver = mongoose.model('Driver', user6Schema, 'drivers');



const user8Schema = new mongoose.Schema({
  dateoffence: {
    type:String,
    required:true,
   
  },
  officelocation:{
    type:String,
    required:true,
  },
 
  fineid: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  
  DLNo: {
    type: Number,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:true,
  },

  address: {
    type: String,
    required: true,
  },
  phoneno: {
    type:Number,
    required:true,
  },
  vehicleno: {
    type:String,
    required:true,
  },
  offenceplace: {
    type:String,
    required:true,
  },
  natureoffence: {
    type:String,
    required:true,
  },
  court: {
    type:String,
    required:true,
  },
  courtdate: {
    type:Date,
    required:true,
  },
  issuingofficer: {
    type:String,
    required:true,
  },
  rank: {
    type:String,
    required:true,
  },
  timenow: {
    type:String,
    required:true,
  },
  drivermodel: {
    type:String,
    required:true,
  },
 
});

const Fines = mongoose.model('Fines', user8Schema, 'fines');


module.exports = {PoliceEmp, Police, RRDEmployee, DRDEmployee, MTRDEmployee, MTDVehicle, Driver, Fines,RRDEmployeeEmp};
