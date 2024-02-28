import React, { useEffect, useState } from "react";
import axios from "axios";


const PoliceOfficersTable = ({ userRole, officeLocation, searchResults }) => {
    
  const [employee, setEmployees] = useState(searchResults ||[]);
  

  const fetchData =() => {
    const token = localStorage.getItem("token");
    

    
      axios
      .get(`http://localhost:5000/api/police/getpoliceofficerData`, {
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
              <th>Police ID</th>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>address</th>
              <th>officeLocation</th>
              <th>Phone No</th>
             
            </tr>
          </thead>
          <tbody>
          {employee.map((employee, index) => (
            <tr key={index}>
              <td>{employee.officeid}</td>
              <td>{employee.id}</td>
              <td>{employee.fullname}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              <td>{employee.officelocation}</td>
              <td>{employee.phoneno}</td>
             
              
            </tr>
          ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoliceOfficersTable;
