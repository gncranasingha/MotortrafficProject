const express = require('express');
const router = express.Router();
const { MTDVehicle } = require('../models/User');
const verifyToken = require('../middleware/verifyToken')



router.post('/register/vehicleregistration',verifyToken, async (req, res) => {
  try {
    if(req.user.role === 'motortrafficregistrationdepartment' || 'vregistrationdepartment' ) {
      
      const existingVehicle = await  MTDVehicle.findOne({
         chassisno: req.body.chassisno
         });
         if (existingVehicle) {
          return res.status(409).json({ message: 'Id is already taken' });
          
        }

        const newVehicle = new MTDVehicle(req.body);
        await newVehicle.save();

      return res.status(201).json(newVehicle);
         
    }
    return res.status(403).json({ message: "Access forbidden. Insufficient role." });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
   
   
});


router.get('/getVehicleData',verifyToken, async (req, res) => {
  try {
    if(req.user.role === 'motortrafficregistrationdepartment' ||  'vregistrationdepartment' ){

      const officeLocation = req.user.officelocation;
      
      const Vehicles = await MTDVehicle.find({ officelocation: officeLocation });
      res.status(200).json(Vehicles);
    } else {
      // If the user does not have the required role, return a 403 Forbidden response
      res.status(403).json({ message: "Access forbidden. Insufficient role." });
    }
   
  }  catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get('/getAllVehicleData' ,verifyToken, async (req, res) => {
    try {
       if(req.user.role === 'motortrafficregistrationdepartment' || 'police' ) {

       

        const Vehicles = await MTDVehicle.find();
        res.status(200).json(Vehicles);
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
      
      if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role ==='vregistrationdepartment') {
        const existingVehicle = await MTDVehicle.findOne({
          _id: req.params.id
        });
  
        if (!existingVehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }
  
        // Check if the chassisno is already taken by another vehicle
        if (req.body.chassisno && req.body.chassisno !== existingVehicle.chassisno) {
          const chassisnoTaken = await MTDVehicle.findOne({ chassisno: req.body.chassisno });
          if (chassisnoTaken) {
            return res.status(409).json({ message: 'Chassisno is already taken' });
          }
        }
  
        // Update the existing vehicle data
        await MTDVehicle.findByIdAndUpdate(req.params.id, req.body);
  
        // Fetch and send the updated vehicle data
        const updatedVehicle = await MTDVehicle.findById(req.params.id);
        res.status(200).json(updatedVehicle);
      } else {
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error('Error updating vehicle data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  

  // router.get('/:id', async (req, res) => {
  //   try {
  //     if(req.user.role === 'motortrafficregistrationdepartment' ||  'vregistrationdepartment' ){
  //     const vehicle = await MTDVehicle.findOne({ id: req.params.id });
  
  //     if (vehicle) {
  //       // Only send necessary user data, modify this based on your schema
  //       const vehicleData = {
  //         chassisno: vehicle.chassisno,
  //         engineno: vehicle.engineno,
  //         seatingcapacity: vehicle.seatingcapacity,
  //         ownerfullname: vehicle.ownerfullname,
  //         nic: vehicle.nic,
  //         address: vehicle.address,
  //         phoneno: vehicle.phoneno,
  //         officelocation: vehicle.officelocation,
  //         vehicleclass: vehicle.vehicleclass,
  //         vehiclemodel: vehicle.vehiclemodel,
  //         vehiclecolor: vehicle.vehiclecolor,
  //         vehicleprovince: vehicle.vehicleprovince,
  //         vehicletaxationclass: vehicle.vehicletaxationclass,
  //         vehicleorigincountry: vehicle.vehicleorigincountry,
  //         vehiclecylindercapacity: vehicle.vehiclecylindercapacity,
  //         vehiclestatus: vehicle.vehiclestatus,
  //         vehiclefueltype: vehicle.vehiclefueltype,
          
  //       };
  
  //       res.status(200).json(vehicleData);
      
  //     } else {
  //       res.status(404).json({ message: 'Vehicle not found' });
  //     }
  //   } else {
  //     res.status(403).json({ message: "Access forbidden. Insufficient role." });
  //   }
  //   } catch (error) {
  //     console.error('Error fetching vehicle data:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });

  // Delete vehicle data
router.delete('/delete/:_id', verifyToken, async (req, res) => {
  try {
    // Check if user role is allowed
    if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role === 'vregistrationdepartment') {
      const vehicleId = req.params._id;
      const deletedVehicle = await MTDVehicle.findByIdAndDelete(vehicleId);

    
      if (deletedVehicle) {
        return res.status(200).json({ message: 'Vehicle deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
    } else {
      return res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
    }
  } catch (error) {
    console.error('Error deleting vehicle data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


  
  module.exports = router;