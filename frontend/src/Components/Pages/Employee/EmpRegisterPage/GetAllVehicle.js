import React, { useState, useEffect,useContext } from 'react'

import axios from "axios";


const GetAllVehicleTable = () => {

   const [VehicleData, setVehicleData] = useState([]);
   
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
   
    
      // Fetch data from the server based on userRole and officeLocation
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

     // Include userRole and officeLocation in the dependency array



  return (
    <div className="">

     {/* Your CSS styles for the table */}
     <style> 
      {`
        /* YourTableComponent.css */

        /* Custom styles for the entire table */
        .table {
            font-size: 16px;
            background-color: lightblue;
          }
          
          /* Custom styles for table headers */
          .table th {
            background-color: #ff000d; /* Header background color */
            color: white; /* Header text color */
          }
          
          /* Custom styles for table rows */
          .table tr:nth-child(even) {
            background-color: #f2f2f2; /* Alternate row background color */
          }
          
          /* Define more custom styles as needed */
          
      `}
     </style>




    <table className="table table-responsive">
      <thead>
        <tr>
          <th>Chassino</th>
          <th>Engine No</th>
          <th>Seating Capacity</th>
          <th>Owner fullname</th>
          <th>NIC</th>
          <th>Address</th>
          <th>Phone No</th>
          <th>Vehicle Class</th>
          <th>Vehicle model</th>
          <th>Vehicle Color</th>
          <th>Vehicle Province</th>
          <th>Vehicle taxationclass</th>
          <th>Vehicle origincountry</th>
          <th>Vehicle ClecylinderCapacity</th>
          <th>Vehicle status</th>
          <th>Vehicle fueltype</th>
        </tr>
      </thead>
      <tbody>
      {VehicleData.map((row,index) => (
           <tr key={index}>
              <td>{row.chassisno}</td>
              <td>{row.engineno}</td>
              <td>{row.seatingcapacity}</td>
              <td>{row.ownerfullname}</td>
              <td>{row.nic}</td>
              <td>{row.address}</td>
              <td>{row.phoneno}</td>
              <td>{row.vehicleclass}</td>
              <td>{row.vehiclemodel}</td>
              <td>{row.vehiclecolor}</td>
              <td>{row. vehicleprovince}</td>
              <td>{row.vehicletaxationclass}</td>
              <td>{row.vehicleorigincountry}</td>
              <td>{row.vehiclecylindercapacity}</td>
              <td>{row.vehiclestatus}</td>
              <td>{row.vehiclefueltype}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
}

export default GetAllVehicleTable;