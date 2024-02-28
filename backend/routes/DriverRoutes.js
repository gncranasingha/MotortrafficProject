// driverRoutes.js
const uuid = require('uuid');
const express = require('express');
const router = express.Router();
const { Driver } = require('../models/User');
const verifyToken = require('../middleware/verifyToken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

router.post('/register/driversregistration',verifyToken, async (req, res) => {
  try {
    if(req.user.role === "motortrafficregistrationdepartment" || "dregistrationdepartment"){

      

      const existingDriver = await Driver.findOne({ nic: req.body.nic });
      if (existingDriver) {
        return res.status(409).json({ message: 'Nic is already taken' });
        
      }

      const generatedUsername = req.body.email.replace(/[@]/g, '').replace(/gmail.com/, '');
       const fullnameE = req.body.fullname;
      const generatedPassword = Math.random().toString(36).slice(-5);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);


      const newDriver = new Driver({
        nic :req.body.nic,
        fullname:req.body.fullname,
        email:req.body.email,
        address:req.body.address,
        officelocation:req.body.officelocation,
        bloodtype:req.body.bloodtype,
        phoneno:req.body.phoneno,
        birthday:req.body.birthday,
        issuedate:req.body.issuedate,
        expdate:req.body.expdate,
        username: generatedUsername,
        password: hashedPassword,
         role: 'driver',
      });
      await newDriver.save();

      const transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // `true` for port 465, `false` for all other ports
        auth: {
          user: "chanakanipun10@gmail.com",
          pass: "fxmb znod jpsl vbth",
        },
        tls: {
          // Implement custom logic for handling self-signed certificates
          rejectUnauthorized: false, // Use 'false' to bypass certificate validation
        },
      });


      const mailOptions = {
        from: {
          name: 'Nipun',
          address:'chanakanipun10@gmail.com'
        }, // sender address
          to: req.body.email, // list of receivers
          subject: "Welcome to DriveEasyConnect System . you can use this password and username to log your account ✔", // Subject line
          text: `Hello ${fullnameE},\n\nThank you for registering!\n\nYour username: ${generatedUsername}\nYour password: ${generatedPassword}`, // plain text body
             
      };
      const sendMail = async (transporter ,mailOptions) => {
        try {
          await transporter.sendMail(mailOptions);
          console.log('email has send successfully..');
      
        } catch (error) {
          console.log(error);
        }
      }
      
      sendMail(transporter, mailOptions)
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





module.exports = router;
