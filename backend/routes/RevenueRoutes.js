const express = require('express');
const router = express.Router();
const {  RRDEmployeeEmp, Revenue } = require('../models/User');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middleware/verifyToken')
const verifyToken1 = require('../middleware/verifyToken1');

router.post('/register/addrevenueemp',verifyToken, async (req, res) => {
    try {
      if(req.user.role === "rregistrationdepartment"){
        const {officeid, id,fullname, address, officelocation, phoneno ,email, password, role } = req.body;
  
      // Check if the id is already taken
      const existingUser = await RRDEmployeeEmp.findOne({ id });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Id is already taken' });
        
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newEmployee = new RRDEmployeeEmp({
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
  
  router.get('/getRevenueEmployeeData',verifyToken, async (req, res) => {
    try {
      if(req.user.role === 'rregistrationdepartment' ){

        const officeLocation = req.user.officelocation;

        const employees = await RRDEmployeeEmp.find({ officelocation: officeLocation });
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


  router.delete('/delete/:_id', verifyToken, async (req, res) => {
    try {
      // Check if user role is allowed
      if (req.user.role === 'rregistrationdepartment' || req.user.role === 'dregistrationdepartment') {
        const employeeid = req.params._id;
        const deletedEmployee = await RRDEmployeeEmp.findByIdAndDelete(employeeid);
  
      
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


  router.put('/update/:id', verifyToken, async (req, res) => {
    
    try {
      
      if (req.user.role === 'rregistrationdepartment' || req.user.role ==='vregistrationdepartment' || req.user.role === 'dregistrationdepartment') {
        const existingEmployee = await RRDEmployeeEmp.findOne({
          _id: req.params.id
        });
  
        if (!existingEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
  
       
        if (req.body.id && req.body.id !== existingEmployee.id) {
          const idTaken = await RRDEmployeeEmp.findOne({ id: req.body.id });
          if (idTaken) {
            return res.status(409).json({ message: 'employee is already registerd..' });
          }
        }
  
        // Update the existing employee data
        await RRDEmployeeEmp.findByIdAndUpdate(req.params.id, req.body);
  
        // Fetch and send the updated employee data
        const updatedEmployee = await RRDEmployeeEmp.findById(req.params.id);
        res.status(200).json(updatedEmployee);
      } else {
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error('Error updating Employee data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/search', verifyToken, async (req, res) => {
    try {
      if (req.user.role === 'rregistrationdepartment' || req.user.role === 'vregistrationdepartment') {
        const { userRole, officeLocation, searchInput } = req.query;
  
        const searchResults = await RRDEmployeeEmp.find({
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
      console.error("Error searching Employee:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  //Revenue License Issue

  router.post('/register/revenueregistration', verifyToken, async (req, res) => {
    try {
      // Check user role
      if (req.user.role === 'rregistrationdepartment' || req.user.role === 'VehicleOwner' || req.user.role === 'police' || req.user.role === 'driver') {
        const existingRevenue = await Revenue.findOne({ engineno: req.body.engineno });
        if (existingRevenue) {
          return res.status(409).json({ message: 'vehicleno is already taken' });
        }
  
        // Retrieve other form data
        const {
          engineno,
          owner,
          email,
          address,
          officelocation,
          issuedate,
          expdate,
          amount,
          weight,
          seatno,
          vetnumber,
          vehicleclass,
          vehiclefueltype
        } = req.body;
  
       
  
        // Create new driver instance
        const newRevenue = new Revenue({
          engineno,
          owner,
          email,
          address,
          officelocation,
          issuedate,
          expdate,
          amount,
          weight,
          seatno,
          vetnumber,
          vehicleclass,
          vehiclefueltype
          
        });
  
        // Save the new driver
        await newRevenue.save();
  
        return res.status(201).json(newRevenue);
      } else {
        return res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error("Error adding Revenue:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.put('/revenueupdate/:id', verifyToken, async (req, res) => {
    
    try {
      
      if (req.user.role === 'rregistrationdepartment') {
        const existingRevenue = await Revenue.findOne({
          _id: req.params.id
        });
  
        if (!existingRevenue) {
          return res.status(404).json({ message: 'Revenue not found' });
        }
  
       
        if (req.body.engineno && req.body.engineno !== existingRevenue.engineno) {
          const vehiclenoTaken = await Revenue.findOne({ engineno: req.body.engineno });
          if (vehiclenoTaken) {
            return res.status(409).json({ message: 'Revenue is already registerd..' });
          }
        }
  
        // Update the existing Revenue data
        await Revenue.findByIdAndUpdate(req.params.id, req.body);
  
        // Fetch and send the updated Revenue data
        const updatedRevenue = await Revenue.findById(req.params.id);
        res.status(200).json(updatedRevenue);
      } else {
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error('Error updating Employee data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/revenuesearch', verifyToken, async (req, res) => {
    try {
      if (req.user.role === 'rregistrationdepartment' ) {
        const { userRole, officeLocation, searchInput } = req.query;
  
        const searchResults = await Revenue.find({
          officelocation: officeLocation,
          // Add other search criteria based on your schema
          $or: [
            { vehicleno: { $regex: new RegExp(searchInput, 'i') } },
            { owner: { $regex: new RegExp(searchInput, 'i') } },
            
          ],
        });
  
        res.status(200).json(searchResults);
      } else {
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
    } catch (error) {
      console.error("Error searching Employee:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.delete('/revenuedelete/:_id', verifyToken, async (req, res) => {
    try {
      // Check if user role is allowed
      if (req.user.role === 'rregistrationdepartment' ) {
        const revenueid = req.params._id;
        const deletedRevenue = await Revenue.findByIdAndDelete(revenueid);
  
      
        if (deletedRevenue) {
          return res.status(200).json({ message: 'Revenue deleted successfully' });
        } else {
          return res.status(404).json({ message: 'Revenue not found' });
        }
      } else {
        return res.status(403).json({ message: 'Access forbidden. Insufficient role.' });
      }
    } catch (error) {
      console.error('Error deleting Revenue data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.get('/getRevenueData',verifyToken, async (req, res) => {
    try {
      if(req.user.role === 'rregistrationdepartment' ){

        const officeLocation = req.user.officelocation;

        const revenues = await Revenue.find({ officelocation: officeLocation });
        res.status(200).json(revenues);
      } else {
        // If the user does not have the required role, return a 403 Forbidden response
        res.status(403).json({ message: "Access forbidden. Insufficient role." });
      }
      
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  //mobile part

router.get('/getrevenue/:engineno',verifyToken, async (req, res) => {
  try {
    const {engineno } = req.params;
    
    const revenueDetails = await Revenue.findOne({ engineno }); // Find revenue details by vehicle number
    if (!revenueDetails) {
      return res.status(404).json({ message: 'Revenue details not found' });
    }
    res.status(200).json(revenueDetails);
  } catch (error) {
    console.error('Error fetching revenue details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


  
  




  module.exports = router;