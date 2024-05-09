const express = require('express');
const router = express.Router();
const {  DRDEmployee, MTRDEmployee, Insurance, Police, RRDEmployee } = require('../models/User');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware/verifyToken')


router.post('/register/mteregistration',verifyToken, async (req, res) => {
  try {
    if(req.user.role === "motortrafficregistrationdepartment"){
      const {officeid, id,fullname, address, officelocation, phoneno ,email, password, role } = req.body;

    // Check if the id is already taken
    const existingUser = await DRDEmployee.findOne({ id });

    if (existingUser) {
      return res.status(409).json({ message: 'Id is already taken' });
      
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newEmployee = new DRDEmployee({
      officeid,
      id,
      fullname,
      address,
      officelocation,
      phoneno,
      email,
      password: hashedPassword,
      role, // Make sure to validate the role value against predefined roles
    });

    // Save the user to the database
    await newEmployee.save();
    return res.status(201).json(newEmployee);
    }
    

    return res.status(403).json({ message: "Access forbidden. Insufficient role." });
  }  catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/getEmployeeData',verifyToken, async (req, res) => {
    try {
      if(req.user.role === 'motortrafficregistrationdepartment' || 'rregistrationdepartment'){

        const officeLocation = req.user.officelocation;

        const employees = await DRDEmployee.find({ officelocation: officeLocation });
        res.status(200).json(employees);
      } else {
        // If the user does not have the required role, return a 403 Forbidden response
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
      
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.put('/update/:id', verifyToken, async (req, res) => {
    
    try {
      
      if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role ==='vregistrationdepartment' || req.user.role === 'dregistrationdepartment') {
        const existingEmployee = await DRDEmployee.findOne({
          _id: req.params.id
        });
  
        if (!existingEmployee) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }
  
        // Check if the chassisno is already taken by another vehicle
        if (req.body.id && req.body.id !== existingVehicle.id) {
          const idTaken = await DRDEmployee.findOne({ id: req.body.id });
          if (idTaken) {
            return res.status(409).json({ message: 'Chassisno is already taken' });
          }
        }
  
        // Update the existing vehicle data
        await DRDEmployee.findByIdAndUpdate(req.params.id, req.body);
  
        // Fetch and send the updated vehicle data
        const updatedEmployee = await DRDEmployee.findById(req.params.id);
        res.status(200).json(updatedEmployee);
      } else {
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error('Error updating Employee data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/delete/:_id', verifyToken, async (req, res) => {
    try {
      // Check if user role is allowed
      if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role === 'dregistrationdepartment') {
        const employeeid = req.params._id;
        const deletedEmployee = await DRDEmployee.findByIdAndDelete(employeeid);
  
      
        if (deletedEmployee) {
          return res.status(200).json({ message: 'Employee deleted successfully' });
        } else {
          return res.status(404).json({ message: 'Employee not found' });
        }
      } else {
        return res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
      }
    } catch (error) {
      console.error('Error deleting Employee data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/search', verifyToken, async (req, res) => {
    try {
      if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role === 'vregistrationdepartment' ) {
        const { userRole, officeLocation, searchInput } = req.query;
  
        const searchResults = await DRDEmployee.find({
          officelocation: officeLocation,
          // Add other search criteria based on your schema
          $or: [
            { officeid: { $regex: new RegExp(searchInput, 'i') } },
            { id: { $regex: new RegExp(searchInput, 'i') } },
            { fullname: { $regex: new RegExp(searchInput, 'i') } },
            // Add more fields as needed
          ],
        });
  
        res.status(200).json(searchResults);
      } else {
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error("Error searching vehicles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Dynamic Profile Endpoint
router.get('/:role/profile/:officeid', verifyToken, async (req, res) => {
  const { role, officeid } = req.params;
  try {
    const model = getModelBasedOnRole(role);  // You need to implement this function
    const user = await model.findOne({ officeid });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching user details', error: error.toString() });
  }
});

function getModelBasedOnRole(role) {
  switch (role) {
    case 'police': return Police;
    case 'insurance': return Insurance;
    case 'rregistrationdepartment': return RRDEmployee;
    case 'motortrafficregistrationdepartment': return MTRDEmployee;
    // Add other cases as needed
    default: throw new Error('Invalid role');
  }
}

  
  
  
  






  module.exports = router;