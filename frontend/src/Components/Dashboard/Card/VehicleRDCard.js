import React,{useEffect, useState} from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from 'axios';

const VehicleRDCard = ({userRole, officeLocation}) => {

  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);


  const checkUserRole = () => {
    // Replace this logic with your actual role-checking mechanism
    const userRole = localStorage.getItem('userRole');
    return userRole === 'motortrafficregistrationdepartment'|| 'dregistrationdepartment' || 'vregistrationdepartment'  ; // Adjust the condition based on your roles
  };

  

  useEffect(() => {

    if(checkUserRole()) {

    const token = localStorage.getItem("token");
    

    
      // Fetch data from the server based on userRole and officeLocation
    axios
      .get(`http://localhost:5000/api/vehicle/getVehicleData`,{
      headers: { Authorization: token },
    })
    .then((response) => {
      
      // Update the state with the fetched data
      setVehiclesCount(response.data.length);
    })
   
    .catch((error) => {
      console.error("Error fetching vehicles:", error);
    });
  }
  }, []);


  useEffect(() => {

    if(checkUserRole()) {

    const token = localStorage.getItem("token");
    

    
      // Fetch data from the server based on userRole and officeLocation
    axios
      .get(`http://localhost:5000/api/employee/getEmployeeData`,{
      headers: { Authorization: token },
    })
    .then((response) => {
      
      // Update the state with the fetched data
      setEmployeesCount(response.data.length);
    })
   
    .catch((error) => {
      console.error("Error fetching vehicles:", error);
    });
  }
  }, []);


  return (
    <div>
    <div className="row">
      <div className="col-md-6">
        <div className="card" style={{ backgroundColor: 'lightblue' }}>
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Vehicle Count</h5>
                <div className="d-flex align-items-center">
                <DirectionsCarIcon style={{ fontSize: 46, color: 'red' }} />

                    <p className="card-text" style={{ fontSize: '30px' }} >{vehiclesCount}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md-6">
      <div className="card" style={{ backgroundColor: 'lightgreen' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Employees Count</h5>
                <div className="d-flex align-items-center">
                <GroupAddIcon style={{ fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >{employeesCount}</p>
                </div>
            </div>
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default VehicleRDCard;
