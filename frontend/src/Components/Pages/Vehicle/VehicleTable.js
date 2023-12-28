import React, { useState, useEffect,useContext } from 'react'
import UserContext from '../../../UserContext'
import { useHistory } from 'react-router-dom';
import axios from "axios";



const VehicleTable = ({ userRole, officeLocation }) => {
  
  const history = useHistory();

   const [VehicleData, setVehicleData] = useState([]);
   
   const handleUpdate = (row) => {
   
    // Navigate to the BorrowBook form and pass selected row data as state
    history.push({
      pathname: `/${userRole}/${officeLocation}/addvehicle`,
      state: { isUpdateMode: true, selectedRow: row },
    });
  };

  const handleDelete = (vehicleId) => {
    // Add logic to delete the vehicle with the specified ID
    const token = localStorage.getItem('token');
    axios
      .delete(`http://localhost:5000/api/vehicle/delete/${vehicleId}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log('Vehicle deleted successfully');
        window.alert('Vehicle deleted successfully');
        // Fetch updated vehicle data after deletion
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting vehicle:', error);
      });
  };
  const fetchData = () => {
    const token = localStorage.getItem('token');
    // Fetch data from the server based on userRole and officeLocation
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
    const token = localStorage.getItem("token");
    
   
    
      // Fetch data from the server based on userRole and officeLocation
    axios
      .get(`http://localhost:5000/api/vehicle/getVehicleData`,{
      headers: { Authorization: token },
     
      
    })
    .then((response) => {
      
     
      setVehicleData(response.data);
    })
   
    .catch((error) => {
      console.error("Error fetching vehicles:", error);
    });
   
  }, [userRole, officeLocation]);

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
          <th>Action</th>
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
              <td>
                <button type="button" class="btn btn-outline-danger" onClick={() => handleDelete(row._id)} >Delete</button>
                <button type="button" class="btn btn-outline-warning" onClick={() => handleUpdate(row)} >Update</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
}

export default VehicleTable