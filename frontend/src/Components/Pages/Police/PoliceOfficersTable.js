import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const PoliceOfficersTable = ({ userRole, officeLocation, searchResults }) => {
  
  const history = useHistory();
  const [employee, setEmployees] = useState(searchResults ||[]);
  

  const handleUpdate = (row) => {
    
    history.push({
      
      pathname: `/${userRole}/${officeLocation}/addpoliceofficer`,
      state: { isUpdateMode: true, selectedRow: row },
    });
  };

  const handleDelete = (officerId) => {
   
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/police/delete/${officerId}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log('Officer deleted successfully');
        window.alert('Officer deleted successfully');
       
       fetchData();
      })
      .catch((error) => {
        console.error('Error deleting Driver:', error);
      });
  };


  const fetchData =() => {
    const token = localStorage.getItem("token");
    

    
      axios
      .get(`http://localhost:5000/api/police/getpoliceofficerData`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        
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
                Police ID
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
                Action
              </TableCell>
             
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
                  {row.officeid} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.id} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.fullname} 
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
                  {row.officelocation} 
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}
                >
                  {row.phoneno} 
                </TableCell>
                
               
            
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
           
               
              
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PoliceOfficersTable;
