import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import '../Employee/Emptable.css';

const RevenueViewTable = ({ userRole, officeLocation, searchResults }) => {

  const history = useHistory();
 
  const [revenue, setrevenue] = useState(searchResults || []);

  const handleUpdate = (row) => {
   
    history.push({
      pathname: `/${userRole}/${officeLocation}/addrevenue`,
      state: { isUpdateMode: true, selectedRow: row },
    });
  };

  const handleDelete = (RevenueId) => {
    
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/revenue/revenuedelete/${RevenueId}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log('Driver deleted successfully');
        window.alert('Driver deleted successfully');
       
       fetchData();
      })
      .catch((error) => {
        console.error('Error deleting Driver:', error);
      });
  };
  

  const fetchData = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5000/api/revenue/getRevenueData`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setrevenue(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  };


  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(() => {
    setrevenue(searchResults || []);
  }, [searchResults]);


  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            fontSize: '1.2rem',
            border: '0',
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
                Vehicleno
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
              owner Full Name
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
                Email
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
                 Address
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
                 Issuedate
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
               Expire date
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
              Amount
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
               Weight
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
               Seat Number
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
               Vet Number
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
               Vehicle Class
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
               Fuel Type
              </TableCell>
             

              {userRole === 'rregistrationdepartment' && (
              <TableCell
                align="right"
                sx={{
                  bgcolor: '#6905fa',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  border: '0',
                }}
              >
                Action
              </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {revenue.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: '0', color: '#1471eb', fontSize: '19px' }}
                >
                  {row.engineno} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row. owner} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.email} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.address} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.issuedate} 
                </TableCell>
               
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row. expdate} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.amount} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row. weight} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.  seatno} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.  vetnumber} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.  vehicleclass} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row. vehiclefueltype} 
                </TableCell>
                
                
                {userRole === 'rregistrationdepartment' && (
              
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb', fontSize: '16px', display:'flex' }}
                >
                  
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'green', color: 'white' }}
                    onClick={() => handleUpdate(row)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'red', color: 'white' }}
                    onClick={() => handleDelete(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RevenueViewTable;
