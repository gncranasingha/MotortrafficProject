const express = require('express');
const router = express.Router();
const path = require('path');


const verifyToken = require('../middleware/verifyToken');


const nodemailer = require('nodemailer');

const VehicleRequest= require('../models/VehicleRequest');
const AcceptedVehicleRequest = require('../models/AcceptedVehicleRequest');

//mobile vehicle request

router.post('/requestvehicle', verifyToken, async (req, res) => {
  const { driverNIC, vehicleNumber, ownerNIC } = req.body;
  
  try {
      const newRequest = await VehicleRequest.create({ driverNIC, vehicleNumber, ownerNIC });
      res.status(201).json({ message: 'Request created successfully', request: newRequest });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create the request', error: error.message });
  }
});
  
  
  // Change from req.user.engineno to req.params.engineno
  router.get('/requestvehicle/:vehicleNumber', verifyToken, async (req, res) => {
    const { vehicleNumber } = req.params;
    try {
        const requestvehicle = await VehicleRequest.find({ vehicleNumber: vehicleNumber });
        res.status(200).json(requestvehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch requests' });
    }
  });

  router.delete('/rejectRequest/:requestId', verifyToken, async (req, res) => {
    try {
        const { requestId } = req.params;
        const deletedRequest = await VehicleRequest.findByIdAndDelete(requestId);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete the request' });
    }
});

router.delete('/acceptRequestdelete/:id', verifyToken, async (req, res) => {
  try {
      const { id } = req.params;
      const deletedRequest = await AcceptedVehicleRequest.findByIdAndDelete(id);
      if (!deletedRequest) {
          return res.status(404).json({ message: 'Request not found' });
      }
      res.json({ message: 'Request deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete the request' });
  }
});




 

 
  

  
router.post('/acceptRequest/fordriver', verifyToken, async (req, res) => {
  const { driverNIC, vehicleNumber, ownerNIC, startDate, expiryDate, revenueDetails, insuranceDetails } = req.body;
  
  try {
    const newRequest = await AcceptedVehicleRequest.create({ 
      driverNIC,
      vehicleNumber,
      ownerNIC,
      startDate,
      expiryDate,
      revenueDetails,
      insuranceDetails,
    });
    await newRequest.save();
    res.status(201).json({ message: 'Request accepted successfully', request: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create the request' });
  }
});

router.get('/acceptRequestss/:vehicleNumber', async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    
    const driverDetails = await AcceptedVehicleRequest.find({ vehicleNumber:vehicleNumber }).populate('revenueDetails insuranceDetails');
    
    if (!driverDetails) {
      return res.status(404).send('Driver details not found');
    }
    res.status(200).json(driverDetails);
  } catch (error) {
    console.error('Failed to fetch driver details:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/acceptRequest/:driverNIC', async (req, res) => {
  try {
    const { driverNIC } = req.params;
    
    const driverDetails = await AcceptedVehicleRequest.find({ driverNIC:driverNIC }).populate('revenueDetails insuranceDetails');
   
    if (!driverDetails) {
      return res.status(404).send('Driver details not found');
    }
    res.status(200).json(driverDetails);
  } catch (error) {
    console.error('Failed to fetch driver details:', error);
    res.status(500).send('Internal Server Error');
  }
});



  
  
  
  
  module.exports = router;