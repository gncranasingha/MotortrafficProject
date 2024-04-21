const express = require('express');
const router = express.Router();
const { Insurancedetails } = require('../models/User');
const verifyToken = require('../middleware/verifyToken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const verifyToken1 = require('../middleware/verifyToken1');

router.post('/register/addInsurance',verifyToken, async (req, res) => {
    try {
      if(req.user.role === "insurance"){
        const { companyid,companyname,vehicleno, chassisno, engineno,id ,fullname, address,email,officelocation,phoneno,issuedate,expdate,vehicleclass,vehiclemodel,vehicleprovince, role } = req.body;
  
      // Check if the id is already taken
      const existinginsu = await Insurancedetails.findOne({ vehicleno });
  
      if (existinginsu) {
        return res.status(409).json({ message: 'Id is already taken' });
        
      }
      
      
      // Create a new user
      const newInsurance = new Insurancedetails({
        companyid,
                companyname,
                vehicleno,
                chassisno,
                engineno,
                id,
                fullname,
                address,
                officelocation,
                email,
                phoneno,
                issuedate,
                expdate,
                vehicleclass,
                vehiclemodel,
                vehicleprovince,
       
        role, // Make sure to validate the role value against predefined roles
      });
  
      // Save the user to the database
      await newInsurance.save();
      return res.status(201).json(newInsurance);
      }
      
  
      return res.status(403).json({ message: "Access forbidden. Insufficient role." });
    }  catch (error) {
      console.error("Error adding Insurance:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.get('/getInsuraceData', verifyToken, async (req, res) => {
    try {
        if (req.user.role === 'insurance') {
            const officeLocation = req.user.officelocation;
            const companyId = req.user.companyid; 
            const insurances = await Insurancedetails.find({ companyid: companyId, officelocation: officeLocation });
            res.status(200).json(insurances);
        } else {
           
            res.status(403).json({ message: "Access forbidden. Insufficient role." });
        }

    } catch (error) {
        console.error("Error fetching insurances:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});









  router.put('/update/:id', verifyToken, async (req, res) => {
    
    try {
      
      if (req.user.role === 'rregistrationdepartment' || req.user.role ==='vregistrationdepartment' || req.user.role === 'dregistrationdepartment') {
        const existingEmployee = await Insurancedetails.findOne({
          _id: req.params.id
        });
  
        if (!existingEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
  
       
        if (req.body.vehicleno && req.body.vehicleno !== existingEmployee.vehicleno) {
          const vehiclenoToken = await RRDEmployeeEmp.findOne({ vehicleno: req.body.vehicleno });
          if (vehiclenoToken) {
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


  //mobile part

router.get('/getinsurance/:engineno',verifyToken, async (req, res) => {
  try {
    const { engineno } = req.params;
    const insuranceDetail = await Insurancedetails.findOne({ engineno }); // Find insurance details by vehicle number
    if (!insuranceDetail) {
      return res.status(404).json({ message: 'Insurance details not found' });
    }
    res.status(200).json(insuranceDetail);
  } catch (error) {
    console.error('Error fetching insurance details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = router;