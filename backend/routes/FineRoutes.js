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
    const { createstatus } = req.query; // Get the createstatus from query parameters
    const officelocation = req.user.officelocation; // Get the officelocation from the authenticated user

    // Create a query object that includes both officelocation and any provided createstatus
    const query = {
      officelocation: officelocation,
      ...(createstatus ? { createstatus: createstatus } : {}) // Conditionally add createstatus to the query
    };

    console.log("Fetching fines for location:", officelocation, "with status:", createstatus);
    const fines = await Fines.find(query);
    res.status(200).json(fines);
  } catch (error) {
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





  router.put('/update/:_id', verifyToken, async (req, res) => {
    const {_id} = req.params;
    const {fineid} = req.body;
  
    try {
      // Check if fineid is taken by another record
      const existingFine = await Fines.findOne({ fineid: fineid, _id: { $ne: _id } });
      if (existingFine) {
        return res.status(409).json({ message: 'Fine ID is already taken by another record' });
      }
  
      const updatedFine = await Fines.findByIdAndUpdate(_id, req.body, {new: true});
      if (!updatedFine) {
        return res.status(404).json({ message: 'Fine not found' });
      }
  
      res.status(200).json(updatedFine);
    } catch (error) {
      console.error('Error updating Fine:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.delete('/delete/:_id', verifyToken, async (req, res) => {
    try {
      // Check if user role is allowed
      if (req.user.role === 'police' || req.user.role === 'Police') {
        const FinesId = req.params._id;
        const deletedFines = await Fines.findByIdAndDelete(FinesId);
  
      
        if (deletedFines) {
          return res.status(200).json({ message: 'Fines deleted successfully' });
        } else {
          return res.status(404).json({ message: 'Fines not found' });
        }
      } else {
        return res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
      }
    } catch (error) {
      console.error('Error deleting Fines data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/search', verifyToken, async (req, res) => {
    try {
      if (req.user.role === 'police' || req.user.role === 'Police' ) {
        const { userRole, officeLocation, searchInput } = req.query;
  
        const searchResults = await Fines.find({
          officelocation: officeLocation,
          // Add other search criteria based on your schema
          $or: [
            { nic: { $regex: new RegExp(searchInput, 'i') } },
            { fullname: { $regex: new RegExp(searchInput, 'i') } },
            // Add more fields as needed
          ],
        });
  
        res.status(200).json(searchResults);
      } else {
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error("Error searching Fines:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  


  

  
  module.exports = router;