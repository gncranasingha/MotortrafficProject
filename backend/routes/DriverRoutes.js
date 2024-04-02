const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Driver } = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const verifyToken1 = require('../middleware/verifyToken1');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const AccessRequest = require('../models/socket'); // Import the AccessRequest model




// POST endpoint for registering drivers with image upload
router.post('/register/driversregistration', verifyToken, async (req, res) => {
  try {
    // Check user role
    if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role === 'dregistrationdepartment') {
      const existingDriver = await Driver.findOne({ nic: req.body.nic });
      if (existingDriver) {
        return res.status(409).json({ message: 'Nic is already taken' });
      }

      // Retrieve other form data
      const {
        nic,
        fullname,
        email,
        address,
        officelocation,
        bloodtype,
        phoneno,
        birthday,
        issuedate,
        expdate,
        drivingLicenseTypes,
      } = req.body;

      // Generate username and password
      const generatedUsername = email.replace(/[@]/g, '').replace(/gmail.com/, '');
      const generatedPassword = Math.random().toString(36).slice(-5);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Create new driver instance
      const newDriver = new Driver({
        nic,
        fullname,
        email,
        address,
        officelocation,
        bloodtype,
        phoneno,
        birthday,
        issuedate,
        expdate, 
        drivingLicenseTypes,   
        username: generatedUsername,
        password: hashedPassword,
        
        role: 'driver'
      });

      // Save the new driver
      await newDriver.save();

      // Send welcome email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "chanakanipun10@gmail.com",
          pass: "fxmb znod jpsl vbth",
        },
        tls: {
          rejectUnauthorized: false
        },
      });

      const mailOptions = {
        from: {
          name: 'Nipun',
          address: 'chanakanipun10@gmail.com'
        },
        to: email,
        subject: "Welcome to DriveEasyConnect System",
        text: `Hello ${fullname},\n\nThank you for registering!\n\nYour username: ${generatedUsername}\nYour password: ${generatedPassword}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(201).json(newDriver);
    } else {
      return res.status(403).json({ message: "Access forbidden. Insufficient role." });
    }
  } catch (error) {
    console.error("Error adding driver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.get('/getDriverData',verifyToken, async (req, res) => {
    try {
      if(req.user.role === 'motortrafficregistrationdepartment' || "dregistrationdepartment" || "driver" ){

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

      
      if (req.body.nic && req.body.nic !== existingDriver.nic) {
        const nicTaken = await Driver.findOne({ nic: req.body.nic });
        if (nicTaken) {
          return res.status(409).json({ message: 'nic is already taken' });
        }
      }

      
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

router.get('/search', verifyToken, async (req, res) => {
  try {
    if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role === 'dregistrationdepartment' || req.body.role === 'driver') {
      const { userRole, officeLocation, searchInput } = req.query;

      const searchResults = await Driver.find({
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
    console.error("Error searching Driver:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/getdriverdetails/:nic', verifyToken1, async (req, res) => {
  try {
    const { nic } = req.user; // Assuming NIC is stored in the JWT token
    const driver = await Driver.findOne({ nic });
    console.log(nic);
    if (!driver) {
      return res.status(404).send({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching driver details' });
  }
});


//Vehicle request route related to mobile




router.post('/access-request', async (req, res) => {
  try {
    const { driverId, vehicleNumber, ownerId, accessPeriod } = req.body;

    // Create a new access request
    const accessRequest = new AccessRequest({
      driverId,
      vehicleNumber,
      ownerId,
      accessPeriod,
    });

    // Save the access request to the database
    await accessRequest.save();

    res.status(201).json({ message: 'Access request submitted successfully' });
  } catch (error) {
    console.error('Error handling access request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/access-requests/:id/accept', async (req, res) => {
  try {
    const { id } = req.params;
    // Find the access request by ID
    const accessRequest = await AccessRequest.findById(id);
    if (!accessRequest) {
      return res.status(404).json({ message: 'Access request not found' });
    }
    // Implement your logic here to handle the accepted access request, such as granting access to the requested documents
    // For example, you can update the access request status in the database
    accessRequest.status = 'accepted';
    await accessRequest.save();
    res.status(200).json({ message: 'Access request accepted successfully' });
  } catch (error) {
    console.error('Error accepting access request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/access-requests', async (req, res) => {
  try {
    // Retrieve all access requests from the database
    const accessRequests = await AccessRequest.find();
    res.status(200).json(accessRequests);
  } catch (error) {
    console.error('Error fetching access requests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});







module.exports = router;
