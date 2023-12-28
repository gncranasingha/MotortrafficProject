const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PoliceEmp } = require('../models/User');

router.post('/register/policeofficerregistration', async (req, res) => {
  try {
    const {officeid, id,fullname,  address, officelocation, phoneno, email, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await  PoliceEmp.findOne({ id });

    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
      
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new  PoliceEmp({
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
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.get('/getpoliceofficerData', async (req, res) => {
  try {
    if(req.user.role === 'police' ){

      const officelocation = req.user.officelocation;
      
      const policeofficer = await PoliceEmp.find({ officelocation: officelocation });
      res.status(200).json(policeofficer);
    } else {
      // If the user does not have the required role, return a 403 Forbidden response
      res.status(403).json({ message: "Access forbidden. Insufficient role." });
    }
   
  }  catch (error) {
    console.error("Error fetching Police officers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  });
  
  module.exports = router;