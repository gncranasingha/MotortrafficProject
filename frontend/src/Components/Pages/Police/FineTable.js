import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const FineTable = ({ userRole, officeLocation }) => {

 
 const [fines, setFines] = useState([]);
 

  useEffect(() => {
    const token = localStorage.getItem("token");
   
    axios
      .get(`http://localhost:5000/api/fine/register/fineregistration`, {
        headers: { Authorization: token },
      })
      .then((response) => {
       // Update the state with the fetched data
       setFines(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching Drivers:", error);
      });
  
   
  }, []);


  return (
    <div className="container-fluid">
      
    <style>
      {`
        /* FineTable.css */

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
              <th>Fine Id</th>
              <th>Driver Id</th>
              <th>Driver License No</th>
              <th>Driver Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone No</th>
              <th>Vehicle No</th>
              <th>Offence Place</th>
              <th>Offence Date</th>
              <th>Nature Offence</th>
              <th>Court Name</th>
              <th>Caurt Date</th>
              <th>Issuing Officer</th>
              <th>Rank</th>
              <th>Time Now</th>
              <th>Driver License Type</th>
            </tr>
          </thead>
          <tbody>
          {fines.map((fine, index) => (
            <tr key={index}>
              <td>{fine.fineid}</td>
              <td>{fine.id}</td>
              <td>{fine.DLNo}</td>
              <td>{fine.fullname}</td>
              <td>{fine.email}</td>
              <td>{fine.address}</td>
              <td>{fine.phoneno}</td>
              <td>{fine.vehicleno}</td>
              <td>{fine. offenceplace}</td>
              <td>{fine. dateoffence}</td>
              <td>{fine. natureoffence}</td>
              <td>{fine.court}</td>
              <td>{fine.courtdate}</td>
              <td>{fine.issuingofficer}</td>
              <td>{fine.rank}</td>
              <td>{fine.timenow}</td>
              <td>{fine.drivermodel}</td>
             
            </tr>
          ))}
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FineTable;
