const express = require('express');
const router = express.Router();
const { MTDVehicle } = require('../models/User');
const verifyToken = require('../middleware/verifyToken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');



router.post('/register/vehicleregistration',verifyToken, async (req, res) => {
  try {
    if(req.user.role === 'motortrafficregistrationdepartment' || 'vregistrationdepartment' || 'VehicleOwner' ) {
      
      const existingVehicle = await  MTDVehicle.findOne({
         chassisno: req.body.chassisno
         });
         if (existingVehicle) {
          return res.status(409).json({ message: 'Id is already taken' });
          
        }

        const generatedUsername = req.body.email.replace(/[@]/g, '').replace(/gmail.com/, '');
        const generatedPassword = Math.random().toString(36).slice(-5);
        const fullname = req.body.ownerfullname;
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
  

        const newVehicle = new MTDVehicle({
          chassisno: req.body.chassisno,
          engineno: req.body.engineno,
          seatingcapacity: req.body.seatingcapacity,
          ownerfullname: req.body.ownerfullname,
          nic: req.body.nic,
          email:req.body.email,
          address: req.body.address,
          phoneno: req.body.phoneno,
          officelocation: req.body.officelocation,
          vehicleclass:req.body.vehicleclass,
          vehiclemodel:req.body.vehiclemodel,
          vehiclecolor:req.body.vehiclecolor,
          vehicleprovince:req.body.vehicleprovince,
          vehicletaxationclass:req.body.vehicletaxationclass,
          vehicleorigincountry:req.body.vehicleorigincountry,
          vehiclecylindercapacity:req.body.vehiclecylindercapacity,
          vehiclestatus:req.body.vehiclestatus,
          vehiclefueltype:req.body.vehiclefueltype,
          username: generatedUsername,
          password: hashedPassword,
          role: "VehicleOwner"
        
        });
        await newVehicle.save();

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
            text: `Hello ${fullname},\n\nThank you for registering!\n\nYour username: ${generatedUsername}\nYour password: ${generatedPassword}`, // plain text body
               
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
    if(req.user.role === 'motortrafficregistrationdepartment' ||  'vregistrationdepartment' || 'VehicleOwner' ){

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
       if(req.user.role === 'motortrafficregistrationdepartment' || 'police' || 'rregistrationdepartment' ) {

       

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


router.get('/search', verifyToken, async (req, res) => {
  try {
    if (req.user.role === 'motortrafficregistrationdepartment' || req.user.role === 'vregistrationdepartment' || 'rregistrationdepartment' || 'VehicleOwner' ) {
      const { userRole, officeLocation, searchInput } = req.query;

      const searchResults = await MTDVehicle.find({
        officelocation: officeLocation,
        // Add other search criteria based on your schema
        $or: [
          { chassisno: { $regex: new RegExp(searchInput, 'i') } },
          { engineno: { $regex: new RegExp(searchInput, 'i') } },
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




  
  module.exports = router;