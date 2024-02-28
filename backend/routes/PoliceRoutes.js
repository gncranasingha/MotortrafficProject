const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const tls = require('tls');
const { PoliceEmp } = require('../models/User');
const verifyToken = require ('../middleware/verifyToken')


router.post('/register/policeofficerregistration', async (req, res) => {
  try {
    const { officeid,id, fullname, address, officelocation, phoneno, email } = req.body;

    // Generate a username (assuming it's based on the email address)
    const username = email.split('@')[0];

    // Generate a random password (you can customize this logic as needed)
    const generatedPassword = Math.random().toString(36).slice(-8);

    // Hash the generated password
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create a new user
    const newUser = new PoliceEmp({
      officeid,
      id,
      username, // Assign the generated username
      fullname,
      address,
      officelocation,
      phoneno,
      email,
      password: hashedPassword,
      role: 'police', // Assuming a default role for police officers
    });

    // Save the user to the database
    await newUser.save();

    // Send email to the relevant police officer
    await sendEmail(email, username, generatedPassword);

    res.status(201).json({
      message: 'User registered successfully',
      username: newUser.username, // Return the generated username
      // Do not return the generated password for security reasons
      // Instead, inform the user that their password has been sent to their email
      password: 'Password has been sent to your email',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

async function sendEmail(to, username, password) {
  // Nodemailer setup (replace with your email provider's configuration)
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

  // Email content
  const mailOptions = {
    from: {
      name: 'Nipun',
      address:'chanakanipun10@gmail.com'
    }, // replace with your email
    to,
    subject: 'Police Officer Registration',
    text: `Your username: ${username}\nYour password: ${password}`,
  };

  // Send email
  const sendMail = async (transporter ,mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log('email has send successfully..');
  
    } catch (error) {
      console.log(error);
    }
  }
  sendMail(transporter, mailOptions)
}

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

  router.get('/search', verifyToken, async (req, res) => {
    try {
      if (req.user.role === 'police' ) {
        const { userRole, officeLocation, searchInput } = req.query;
  
        const searchResults = await PoliceEmp.find({
          officelocation: officeLocation,
          // Add other search criteria based on your schema
          $or: [
            { officeid: { $regex: new RegExp(searchInput, 'i') } },
            { id: { $regex: new RegExp(searchInput, 'i') } },
            { username: { $regex: new RegExp(searchInput, 'i') } },
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
  


  
  module.exports = router;