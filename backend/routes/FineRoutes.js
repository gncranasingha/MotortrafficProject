const express = require('express');
const router = express.Router();
const { Fines, MTDVehicle } = require('../models/User');
const verifyToken = require('../middleware/verifyToken')



router.post('/register/fineregistration',verifyToken, async (req, res) => {
  try {
    
      const existingVehicle = await  Fines.findOne({
        fineid: req.body.fineid
         });
         if (existingVehicle) {
          return res.status(409).json({ message: 'Id is already taken' });
          
        }

        const newFine = new Fines(req.body);
        await newFine.save();

      return res.status(201).json( newFine);
         
    } catch (error) {
    console.error("Error adding Fine:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
   
   
});

router.get('/register/fineregistration', async (req, res) => {
  try {
   

      const officelocation = req.user.officelocation;
      console.log(officelocation);
      const fine = await Fines.find({ officelocation: officelocation });
      res.status(200).json(fine);
   
   
  }  catch (error) {
    console.error("Error fetching Fines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  });




router.get('/getVehicleData',verifyToken, async (req, res) => {
  try {
    if(req.user.role === 'motortrafficregistrationdepartment' ){

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


  // PUT endpoint to update fine status to 'paid'
  router.put('/updateFineStatus/:id', verifyToken, async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      // Find the fine associated with the provided NIC
      const fine = await Fines.findOne({ id });
  
      // If fine not found, return 404 Not Found
      if (!fine) {
        return res.status(404).json({ message: 'Fine not found for this NIC' });
      }
  
      // Update the fine status to 'paid'
      fine.status = 'paid';
      await fine.save();
  
      // Respond with success message
      res.json({ message: 'Fine status updated successfully', fine });
    } catch (error) {
      console.error('Error updating fine status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


  

  
  module.exports = router;