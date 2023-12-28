// driverRoutes.js

const express = require('express');
const router = express.Router();
const { Driver } = require('../models/User');
const verifyToken = require('../middleware/verifyToken')

router.post('/register/driversregistration',verifyToken, async (req, res) => {
  try {
    if(req.user.role === "motortrafficregistrationdepartment" || "dregistrationdepartment"){

      

      const existingDriver = await Driver.findOne({ nic: req.body.nic });
      if (existingDriver) {
        return res.status(409).json({ message: 'Nic is already taken' });
        
      }

      const newDriver = new Driver(req.body);
      await newDriver.save();

      return res.status(201).json(newDriver);
    }
   

   
    return res.status(403).json({ message: "Access forbidden. Insufficient role." });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.get('/getDriverData',verifyToken, async (req, res) => {
    try {
      if(req.user.role === 'motortrafficregistrationdepartment' || "dregistrationdepartment" ){

        const officeLocation = req.user.officelocation;
        
        const drivers = await Driver.find({ officelocation: officeLocation });
        res.status(200).json(drivers);
      } else {
        // If the user does not have the required role, return a 403 Forbidden response
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
     
    }  catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getAllDriverData',verifyToken, async (req, res) => {
    try {
      if(req.user.role === 'motortrafficregistrationdepartment' || 'police' ){

        
        
        const drivers = await Driver.find();
        res.status(200).json(drivers);
      } else {
        // If the user does not have the required role, return a 403 Forbidden response
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
     
    }  catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    
  try {
    
    if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role ==='dregistrationdepartment') {
      const existingDriver = await Driver.findOne({
        _id: req.params.id
       
      });
      
      if (!existingDriver) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      // Check if the chassisno is already taken by another vehicle
      if (req.body.nic && req.body.nic !== existingDriver.nic) {
        const nicTaken = await Driver.findOne({ nic: req.body.nic });
        if (nicTaken) {
          return res.status(409).json({ message: 'nic is already taken' });
        }
      }

      // Update the existing vehicle data
      await Driver.findByIdAndUpdate(req.params.id, req.body);

      // Fetch and send the updated vehicle data
      const updatedDriver = await Driver.findById(req.params.id);
      res.status(200).json(updatedDriver);
    } else {
      res.status(403).json({ message: "Access forbidden. Insufficient role." });
    }
  } catch (error) {
    console.error('Error updating Driver data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:_id', verifyToken, async (req, res) => {
  try {
    // Check if user role is allowed
    if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role === 'dregistrationdepartment') {
      const driverId = req.params._id;
      const deletedDriver = await Driver.findByIdAndDelete(driverId);

    
      if (deletedDriver) {
        return res.status(200).json({ message: 'Driver deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Driver not found' });
      }
    } else {
      return res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
    }
  } catch (error) {
    console.error('Error deleting Driver data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});





module.exports = router;
