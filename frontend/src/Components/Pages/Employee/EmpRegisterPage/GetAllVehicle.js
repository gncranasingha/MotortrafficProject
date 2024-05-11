import React, { useState, useEffect,useContext } from 'react'

import axios from "axios";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const GetAllVehicleTable = () => {

   const [VehicleData, setVehicleData] = useState([]);
   
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios
      .get(`http://localhost:5000/api/vehicle/getAllVehicleData`,{
      headers: { Authorization: token },
      
      
    })
    .then((response) => {
      
     
      setVehicleData(response.data);
    })
   
    .catch((error) => {
      console.error("Error fetching vehicles:", error);
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
                Vehicle No
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
                Engine No
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
                seatingcapacity
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
                 ownerfullname
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
                Nic
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
               address
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
                phoneno
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
                officelocation
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
               vehicleclass
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
                vehiclemodel
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
               vehiclecolor
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
               vehicleprovince
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
               vehicletaxationclass
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
               vehicleorigincountry
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
               vehiclecylindercapacity
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
               vehiclestatus
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
              vehiclefueltype
              </TableCell>
             
              
             
            </TableRow>
          </TableHead>
          <TableBody>
            {VehicleData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: '0', color: '#1471eb' }}
                >
                  {row.chassisno} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.engineno} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.seatingcapacity} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.ownerfullname} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.nic} 
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
                  {row.phoneno} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.officelocation} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicleclass} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclemodel} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclecolor} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicleprovince} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicletaxationclass} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicleorigincountry} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row. vehiclecylindercapacity} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclestatus} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclefueltype} 
                </TableCell>
               
               
                 
                
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default GetAllVehicleTable;