import React, { useEffect, useState } from "react";
import axios from "axios";



const GetAllDrivers = () => {
 
  const [drivers, setDrivers] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
   
    axios
      .get(`http://localhost:5000/api/drivers/getAllDriverData`, {
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
        /* GetAllDrivers.css */

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
              
            </tr>
          ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllDrivers;
