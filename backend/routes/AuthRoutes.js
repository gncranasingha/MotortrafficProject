const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const { Police, MTRDEmployee, RRDEmployee,  DRDEmployee,  MTDVehicle, Driver } = require('../models/User');
dotenv.config()
// Route for user registration

router.post('/register/police', async (req, res) => {
  try {
    const {officeid, id,fullname,  address, officelocation, phoneno, email, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await  Police.findOne({ id });

    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
      
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new  Police({
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



router.post('/register/vrdemployee', async (req, res) => {
  try {
    const {officeid, id,fullname, address, officelocation, phoneno ,email, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await MTRDEmployee.findOne({ id });

    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
      
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new MTRDEmployee({
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




router.post('/register/rlrdemployee', async (req, res) => {
  try {
    const {officeid, id,fullname, address, officelocation, phoneno ,email, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await RRDEmployee.findOne({ id });

    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' });
      
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new RRDEmployee({
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



router.post('/login/vehicleld', async (req, res) => {
  try {
    const { officeid, email, password, role, officelocation } = req.body;

    // Find the user by username
    let user;
   // Check the user's role and find them based on the role
   switch (role) {
    
    case 'motortrafficregistrationdepartment':
      user = await MTRDEmployee.findOne({ officeid });
      break;
    default:
      return res.status(401).json({ message: 'Invalid role' });
  }

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided role matches the user's role
  if (user.role !== role) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided officelocation matches the user's officelocation
  if (user.officelocation !== officelocation) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

   // Check if the provided email matches the user's email
  if (user.email !== email) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign (
      { id: user._id, 
        officeid: user.officeid,
        email: user.email, 
        role: user.role, 
        officelocation: user.officelocation, 
       
      }, 
      process.env.secretKey, 
      {
      expiresIn: '1h', // Token expiration time
      }
    );

    

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});



router.post('/login/revenueld', async (req, res) => {
  try {
    const { officeid, email, password, role, officelocation } = req.body;

    // Find the user by username
    let user;
   // Check the user's role and find them based on the role
   switch (role) {
    
    case 'rregistrationdepartment':
      user = await RRDEmployee.findOne({ officeid });
      break;
    default:
      return res.status(401).json({ message: 'Invalid role' });
  }

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided role matches the user's role
  if (user.role !== role) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided officelocation matches the user's officelocation
  if (user.officelocation !== officelocation) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

   // Check if the provided email matches the user's email
  if (user.email !== email) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, officeid: user.officeid, email: user.email, role: user.role, officelocation: user.officelocation }, process.env.secretKey, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});
router.post('/login/police', async (req, res) => {
  try {
    const { officeid, email, password, role, officelocation } = req.body;

    // Find the user by username
    let user;
   // Check the user's role and find them based on the role
   switch (role) {
    
    case 'police':
      user = await Police.findOne({ officeid });
      break;
    default:
      return res.status(401).json({ message: 'Invalid role' });
  }

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided role matches the user's role
  if (user.role !== role) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided officelocation matches the user's officelocation
  if (user.officelocation !== officelocation) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

   // Check if the provided email matches the user's email
  if (user.email !== email) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, officeid: user.officeid, email: user.email, role: user.role, officelocation: user.officelocation }, process.env.secretKey, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});






router.post('/register/mteregistration', async (req, res) => {
  try {
    const {officeid, id,fullname, address, officelocation, phoneno ,email, password, role } = req.body;

    // Check if the id is already taken
    const existingUser = await DRDEmployee.findOne({ id });

    if (existingUser) {
      return res.status(409).json({ message: 'Id is already taken' });
      
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new DRDEmployee({
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

    res.status(201).json({ message: 'Employee registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});













router.post('/login/mtdemployee', async (req, res) => {
  try {
    const { officeid, email, password, role, officelocation } = req.body;

    // Find the user by username
    let user;
   // Check the user's role and find them based on the role
   switch (role) {
    
    case 'dregistrationdepartment':
      user = await DRDEmployee.findOne({ officeid });
      break;
    case 'vregistrationdepartment':
      user = await DRDEmployee.findOne({ officeid });
      break;
    default:
      return res.status(401).json({ message: 'Invalid role' });
  }

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided role matches the user's role
  if (user.role !== role) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Check if the provided officelocation matches the user's officelocation
  if (user.officelocation !== officelocation) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

   // Check if the provided email matches the user's email
  if (user.email !== email) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, officeid: user.officeid, email: user.email, role: user.role, officelocation: user.officelocation }, process.env.secretKey, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});


//mobile login
router.post('/login/driver', async (req, res) => {
  try {
    const { officeid, password, role } = req.body;

    // Find the driver by officeid
    const driver = await Driver.findOne({ officeid });

    if (!driver || driver.role !== role) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, driver.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: driver._id,
        officeid: driver.officeid,
        role: driver.role,
      },
      process.env.secretKey,
      {
        expiresIn: '1h', // Token expiration time
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Driver Login error:', error);
    res.status(500).json({ message: 'Driver Login failed' });
  }
});



module.exports = router;

