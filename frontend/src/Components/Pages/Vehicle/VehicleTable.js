import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const VehicleTable = ({ userRole, officeLocation, searchResults }) => {
  const history = useHistory();
  const [vehicleData, setVehicleData] = useState([]);

  const handleUpdate = (row) => {
    history.push({
      pathname: `/${userRole}/${officeLocation}/addvehicle`,
      state: { isUpdateMode: true, selectedRow: row },
    });
  };

  const handleDelete = (vehicleId) => {
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/vehicle/delete/${vehicleId}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log('Vehicle deleted successfully');
        window.alert('Vehicle deleted successfully');
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting vehicle:', error);
      });
  };

  const fetchData = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5000/api/vehicle/getVehicleData`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setVehicleData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setVehicleData(searchResults || []);
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
              {userRole === 'motortrafficregistrationdepartment' | userRole ==='vregistrationdepartment'   && (
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
            {vehicleData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: '0', color: '#1471eb' }}
                >
                  {row.chassisno} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.engineno} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.seatingcapacity} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.ownerfullname} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.nic} {/* Replace with the actual property from your data */}
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
                  {row.phoneno} {/* Replace with the actual property from your data */}
                </TableCell>
                
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicleclass} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclemodel} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclecolor} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicleprovince} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicletaxationclass} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehicleorigincountry} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row. vehiclecylindercapacity} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclestatus} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.vehiclefueltype} {/* Replace with the actual property from your data */}
                </TableCell>
                {/* Repeat for other columns */}
               
                   <TableCell
                   align="right"
                   sx={{ border: '0', color: 'blue', fontWeight: '#1471eb', fontSize: '16px', display:'flex' }}
                 >
                    {userRole === 'motortrafficregistrationdepartment' | userRole === 'vregistrationdepartment'  &&(
    <>
      <Button
        variant="contained"
        style={{ backgroundColor: 'green', color: 'white', marginRight: '8px' }}
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
    </>
  )}
                 </TableCell>
                
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VehicleTable;
