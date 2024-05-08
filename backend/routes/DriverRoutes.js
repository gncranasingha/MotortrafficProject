const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Driver } = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const verifyToken1 = require('../middleware/verifyToken1');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {Fines} = require('../models/User')
const paypal = require('paypal-rest-sdk');


paypal.configure ({
  mode: "sandbox",
  client_id : "AbJ32mws4gFotoCudPzjuAaVBMHLpK5Lo0MtMvTIb2yhFCf4X1iWrQY_j4cCuQFBkopZtc-9VEzu8rJO",
  client_secret: "EA3KajWrZ96YuTKDEv4M_rnPVmMfft5g4DpBNwNYwMjfeLbmVOGc3V_jeqJWBBxSiiqQN8_bx4BbNXzJ"
});


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
        text: `Hello ${fullname},\n\nThank you for registering as Driver!\n\nYour username: ${generatedUsername}\nYour password: ${generatedPassword}`,
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



router.get('/getdriverdetails/:nic', verifyToken, async (req, res) => {
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

router.get('/getFinesByDriverId/:nic',verifyToken, async (req, res) => {
  try {
    const fines = await Fines.find({ id: req.params.nic });
    res.json(fines);
  } catch (error) {
    console.error('Error fetching fines:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/create-payment', verifyToken, (req, res) => {
  const create_payment_json = {
      intent: 'sale',
      payer: {
          payment_method: 'paypal'
      },
      redirect_urls: {
          return_url: 'http://172.20.10.6:5000/api/drivers/success',
          cancel_url: 'http://172.20.10.6:5000/api/drivers/cancel'
      },
      transactions: [{
          item_list: {
              items: [{
                  name: "Item Name",
                  sku: "Item sku",
                  price: "5.00",
                  currency: "USD",
                  quantity: 1
              }]
          },
          amount: {
              currency: "USD",
              total: "5.00"
          },
          description: "This is pay fine"
      }],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
          console.error('Payment Error:', error);
          return res.status(500).json({ error: error.toString() });
      }
      const approvalUrl = payment.links.find(link => link.rel === "approval_url").href;
      res.json({ approvalUrl });
  });
});


router.post("/execute-payment", verifyToken, async (req, res) => {
  const { payerId, paymentId } = req.body;
  const execute_payment_json = {
      payer_id: payerId,
      transactions: [{
          amount: {
              currency: "USD",
              total: "10.00"
          }
      }]
  };

  try {
      const payment = await new Promise((resolve, reject) => {
          paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
              if (error) {
                  reject(error);
              } else {
                  resolve(payment);
              }
          });
      });
      res.json({ message: "Payment completed successfully", payment });
  } catch (error) {
      console.error('Execute Payment Error:', error);
      res.status(500).json({ error: error.toString() });
  }
});


router.get("/success",verifyToken, (req, res) => {
  res.send("Success payment was completed");
})
router.get("/cancel",verifyToken, (req, res) => {
  res.send(" payment was cancelled.");
})


module.exports = router;
