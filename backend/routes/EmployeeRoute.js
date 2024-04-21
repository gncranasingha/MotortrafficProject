const express = require('express');
const router = express.Router();
const { DRDEmployee } = require('../models/User');

router.get('/getEmployeeData', async (req, res) => {
  try {
      const { officeLocation } = req.query; // Access officeLocation from query string
      const EmployeeData = await DRDEmployee.find({ officeLocation, role: 'vregistrationdepartment' });
      res.json(EmployeeData);
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getEmployeeDataDriver', async (req, res) => {
  try {
      const { officeLocation } = req.query; // Access officeLocation from query string
      const EmployeeData = await DRDEmployee.find({ officeLocation, role: 'dregistrationdepartment' });
      res.json(EmployeeData);
  } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
