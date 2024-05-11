import React,{useEffect, useState} from 'react'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import axios from 'axios';

const RevenueLRDCard = () => {

    const [vehiclesCount, setVehiclesCount] = useState(0);
    const [employeesCount, setEmployeesCount] = useState(0);
  
    const checkUserRole = () => {
      const userRole = localStorage.getItem('userRole');
      return userRole === 'rregistrationdepartment';
    };
  
  
    useEffect(() => {
  
      if(checkUserRole()) {
  
      const token = localStorage.getItem("token");
      
  
        axios
        .get(`http://localhost:5000/api/vehicle/getVehicleData`,{
        headers: { Authorization: token },
      })
      .then((response) => {
        
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
      
  
      
        axios
        .get(`http://localhost:5000/api/motortraffic/getEmployeeData`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          
          setEmployeesCount(response.data.length);
        })
        .catch((error) => {
          console.error("Error fetching Employee:", error);
        });
      }
     
    }, []);
  
  

  return (
    <div>
    <div className="row">
      <div className="col-md-4">
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
      
      <div className="col-md-4">
      <div className="card" style={{ backgroundColor: 'lightgreen' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Employee Count</h5>
                <div className="d-flex align-items-center">
                <PersonIcon style={{  fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >{employeesCount}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
      <div className="card" style={{ backgroundColor: 'lightyellow' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Tax Unpaid Count</h5>
                <div className="d-flex align-items-center">
                <AccountBalanceWalletIcon style={{  fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >40</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RevenueLRDCard;
