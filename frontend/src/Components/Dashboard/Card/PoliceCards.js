import React,{useEffect, useState} from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import axios from 'axios';

const Card = () => {

  const [officersCount, setofficersCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);

  const checkUserRole = () => {
    
    const userRole = localStorage.getItem('userRole');
    return userRole === 'police'  ; 
  };



  useEffect(() => {


    if(checkUserRole()) {

    const token = localStorage.getItem("token");
    

    
      axios
      .get(`http://localhost:5000/api/police/getpoliceofficerData`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        
        setofficersCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching Employee:", error);
      });
    }
   
  }, []);


  useEffect(() => {

    if(checkUserRole()) {

    const token = localStorage.getItem("token");
   
    axios
      .get(`http://localhost:5000/api/drivers/getDriverData`, {
        headers: { Authorization: token },
      })
      .then((response) => {
     
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


  
  return (
    <div>
    <div className="row">
      <div className="col-md-4">
        <div className="card" style={{ backgroundColor: 'lightblue' }}>
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Officers Count</h5>
                <div className="d-flex align-items-center">
                <DirectionsCarIcon style={{ fontSize: 46, color: 'red' }} />

                    <p className="card-text" style={{ fontSize: '30px' }} >{officersCount}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
      <div className="card" style={{ backgroundColor: 'lightgreen' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Drivers</h5>
                <div className="d-flex align-items-center">
                <GroupAddIcon style={{ fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >{driversCount}</p>
                </div>
            </div>
        </div>
      </div>
      <div className="col-md-4">
      <div className="card" style={{ backgroundColor: 'lightyellow' }} >
            <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '40px' }} >Vehicle</h5>
                <div className="d-flex align-items-center">
                <PersonIcon style={{  fontSize: 46, color: 'red' }} />
                    <p className="card-text" style={{ fontSize: '30px' }} >{vehiclesCount}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Card;
