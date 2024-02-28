const express = require('express');
const router = express.Router();
const { DRDEmployee } = require('../models/User');

router.get('/:officeLocation/getEmployeeData', async (req, res) => {
    try {
        const { officeLocation } = req.params;
      const EmployeeData = await DRDEmployee.find({officeLocation}); // Retrieve data from the database
      res.json(EmployeeData); // Send the data as JSON response
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;