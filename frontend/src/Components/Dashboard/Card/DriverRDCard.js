import React,{useEffect, useState} from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from 'axios';

const DriverRDCard = () => {

    const [driversCount, setDriversCount] = useState(0);
    const [employee, setEmployee] = useState(0);
    const checkUserRole = () => {
        // Replace this logic with your actual role-checking mechanism
        const userRole = localStorage.getItem('userRole');
        return userRole === 'dregistrationdepartment' || "motortrafficregistrationdepartment"; // Adjust the condition based on your roles
      };
    
      useEffect(() => {
    
        if(checkUserRole()) {
    
        const token = localStorage.getItem("token");
       
        axios
          .get(`http://localhost:5000/api/drivers/getDriverData`, {
            headers: { Authorization: token },
          })
          .then((response) => {
           // Update the state with the fetched data
           
            setDriversCount(response.data.length);
          })
          .catch((error) => {
            console.error("Error fetching Drivers:", error);
          });
      
        }
      }, []);


      useEffect(() => {
    
        if(checkUserRole()) {
    
        const token = localStorage.getItem("token");
       
        axios
          .get(`http://localhost:5000/api/employee/getEmployeeDataDriver`, {
            headers: { Authorization: token },
          })
          .then((response) => {
           // Update the state with the fetched data
           
           setEmployee(response.data.length);
          })
          .catch((error) => {
            console.error("Error fetching Drivers:", error);
          });
      
        }
      }, []);
    

 

 



  return (
    <div>
    <div className="row">
      
      <div className="col-md-6">
      <div className="card" style={{ backgroundColor: 'lightgreen' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Drivers Count</h5>
                <div className="d-flex align-items-center">
                <GroupAddIcon style={{ fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >{driversCount}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md-6">
      <div className="card" style={{ backgroundColor: 'lightyellow' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Employees Count</h5>
                <div className="d-flex align-items-center">
                <PersonIcon style={{  fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >{employee}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DriverRDCard;
