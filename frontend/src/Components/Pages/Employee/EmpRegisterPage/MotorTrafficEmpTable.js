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

const Emptable = ({ userRole, officeLocation, searchResults  }) => {

  const history = useHistory();
    
  const [employee, setEmployees] = useState(searchResults ||[]);
  
  const handleUpdate = (row) => {
   
    // Navigate to the BorrowBook form and pass selected row data as state
    history.push({
      pathname: `/${userRole}/${officeLocation}/addemp`,
      state: { isUpdateMode: true, selectedRow: row },
    });
  };

  const handleDelete = (EmpId) => {
    // Add logic to delete the Driver with the specified ID
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/motortraffic/delete/${EmpId}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log('Employee deleted successfully');
        window.alert('Employee deleted successfully');
       
       fetchData();
      })
      .catch((error) => {
        console.error('Error deleting Employee:', error);
      });
  };

  const fetchData =() => {
    const token = localStorage.getItem("token");
    

    
      axios
      .get(`http://localhost:5000/api/motortraffic/getEmployeeData`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        
        // Update the state with the fetched data
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Employee:", error);
      });
    
   
  };
  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(() => {
    // Update the state when searchResults change
    setEmployees(searchResults || []);
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
                Office ID
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
                ID
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
                Office Location
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
                role
              </TableCell>
              { userRole === 'motortrafficregistrationdepartment' && (
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
            {employee.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: '0', color: '#1471eb', fontSize: '19px' }}
                >
                  {row.officeid} {/* Replace with the actual property from your data */}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ border: '0', color: '#1471eb', fontSize: '19px' }}
                >
                  {row.id} {/* Replace with the actual property from your data */}
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
                  {row.email} {/* Replace with the actual property from your data */}
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
                  {row.officelocation} {/* Replace with the actual property from your data */}
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
                  {row. role} {/* Replace with the actual property from your data */}
                </TableCell>
                {/* Repeat for other columns */}
                {userRole === 'motortrafficregistrationdepartment' && (
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

export default Emptable;
