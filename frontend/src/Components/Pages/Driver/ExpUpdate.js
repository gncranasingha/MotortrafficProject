import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const ExpUpdate = () => {
  const location = useLocation();
  const history = useHistory();
  const { driverDetails, userRole, officeLocation } = location.state;
  const [issuedate, setIssueDate] = useState(driverDetails.issuedate);
  const [expdate, setExpDate] = useState(driverDetails.expdate);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token'); 
    try {
      await axios.put(`http://localhost:5000/api/drivers/updateDates/${driverDetails.nic}`, {
        issuedate,
        expdate,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Update successful');
      history.push(`/${userRole}/${officeLocation}/dashboard`); 
    } catch (error) {
      console.error('Failed to update dates:', error);
      alert('Failed to update dates');
    }
  };

  return (
    <div>
      <TextField
        label="Issue Date"
        type="date"
        value={issuedate}
        onChange={(e) => setIssueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Exp Date"
        type="date"
        value={expdate}
        onChange={(e) => setExpDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button onClick={handleUpdate} variant="contained" color="primary">
        Update
      </Button>
    </div>
  );
}

export default ExpUpdate
