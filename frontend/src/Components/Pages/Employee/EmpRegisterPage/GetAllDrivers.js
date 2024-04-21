import React, { useEffect, useState } from "react";
import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { ref, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../../Driver/firebase-config';

const GetAllDrivers = () => {
 
  const [drivers, setDrivers] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
   
    axios
      .get(`http://localhost:5000/api/drivers/getAllDriverData`, {
        headers: { Authorization: token },
      })
      .then(async(response) => {

        const driversWithImages = await Promise.all(response.data.map(async (driver) => {
          const imgRef = ref(imageDb, `images/${driver.nic}`);
          try {
            const imgUrl = await getDownloadURL(imgRef);
            return { ...driver, imgUrl };
          } catch (error) {
            console.error("Error fetching image URL:", error);
            return { ...driver, imgUrl: '' }; // Handle missing images or errors gracefully
          }
        }));
  
       // Update the state with the fetched data
       setDrivers(driversWithImages);
        
      })
      .catch((error) => {
        console.error("Error fetching Drivers:", error);
      });
  
   
  }, []);


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
              NIC
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
             Full Name
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
               Blood Type
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
              Phone No
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
             Birth Day
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
            Issue Date
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
             Exp Date
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
             user image
            </TableCell>
           

           
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ border: '0', color: '#1471eb', fontSize: '19px' }}
              >
                {row.nic} {/* Replace with the actual property from your data */}
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
              >
                {row.fullname} {/* Replace with the actual property from your data */}
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
              >
                {row.address} {/* Replace with the actual property from your data */}
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
              >
                {row.bloodtype} {/* Replace with the actual property from your data */}
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
              >
                {row.phoneno} {/* Replace with the actual property from your data */}
              </TableCell>
             
              <TableCell
                align="right"
                sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
              >
                {row. birthday} {/* Replace with the actual property from your data */}
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
              >
                {row.issuedate} {/* Replace with the actual property from your data */}
              </TableCell>
              <TableCell
                align="right"
                sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
              >
                {row.expdate} {/* Replace with the actual property from your data */}
              </TableCell>
              <TableCell align="right" sx={{ border: '0' }}>
      <img src={row.imgUrl || 'path/to/default/image'} alt="Driver" style={{ width: 50, height: 50, borderRadius: '50%' }} />
    </TableCell>
              
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
};

export default GetAllDrivers;
