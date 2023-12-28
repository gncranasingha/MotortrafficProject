import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import './Emptable.css';

const Emptable = ({ userRole, officeLocation }) => {

  const history = useHistory();
 
  const [drivers, setDrivers] = useState([]);

  const handleUpdate = (row) => {
   
    // Navigate to the BorrowBook form and pass selected row data as state
    history.push({
      pathname: `/${userRole}/${officeLocation}/adddriver`,
      state: { isUpdateMode: true, selectedRow: row },
    });
  };

  const handleDelete = (DriverId) => {
    // Add logic to delete the Driver with the specified ID
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/drivers/delete/${DriverId}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log('Driver deleted successfully');
        window.alert('Driver deleted successfully');
       
       
      })
      .catch((error) => {
        console.error('Error deleting Driver:', error);
      });
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
   
    axios
      .get(`http://localhost:5000/api/drivers/getDriverData`, {
        headers: { Authorization: token },
      })
      .then((response) => {
       // Update the state with the fetched data
        setDrivers(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching Drivers:", error);
      });
  
   
  }, []);


  return (
    <div className="container-fluid">
      
    <style>
      {`
        /* Emptable.css */

        /* Custom styles for the entire table */
        .table {
            width: 100%; /* Make the table full-width */
            font-size: 16px;
            background-color: lightblue;
            border: 2px solid black; /* Add border to the entire table */
            margin: 0; /* Remove any margin */
            padding: 0; /* Remove any padding */
        }
        
        /* Custom styles for table headers */
        .table th {
            background-color: #ff000d; /* Header background color */
            color: white; /* Header text color */
            border: 1px solid black; /* Add border to header cells */
        }
        
        /* Custom styles for table rows */
        .table tr {
            border: 1px solid black; /* Add border to all cells in a row */
        }
        
        .table tr:nth-child(even) {
            background-color: #f2f2f2; /* Alternate row background color */
        }
        
        /* Define more custom styles as needed */
        
      `}
    </style>





      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>NIC</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Blood Type</th>
              <th>Phone No</th>
              <th>Birth Day</th>
              <th>Issue Date</th>
              <th>Expire Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {drivers.map((driver, index) => (
            <tr key={index}>
              <td>{driver.nic}</td>
              <td>{driver.fullname}</td>
              <td>{driver.address}</td>
              <td>{driver.bloodtype}</td>
              <td>{driver.phoneno}</td>
              <td>{driver.birthday}</td>
              <td>{driver.issuedate}</td>
              <td>{driver.expdate}</td>
              <td>
                <button type="button" class="btn btn-outline-danger"  onClick={() => handleDelete(driver._id)}  >Delete</button>
                <button type="button" class="btn btn-outline-warning" onClick={() => handleUpdate(driver)} >Update</button>
              </td>
            </tr>
          ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Emptable;
