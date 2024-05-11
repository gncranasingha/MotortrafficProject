import React, { useState,useEffect } from 'react';
import { RevenueLFeald, VehicleClass,VehicleFuelType } from '../../Auth/AdminTEMPRegister/FormStruct';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom'; 


function RegisterRevenu({ userRole, officeLocation }) {
  const [formData, setRevenueData] = useState({
   
    engineno:'',
    owner:'',
    email:'',
    address:'',
    officelocation:officeLocation,
    issuedate:'',
    expdate:'',
    amount:'',
    weight:'',
    seatno:'',
    vetnumber:'',
    vehicleclass:'',
    vehiclefueltype:''


  });
  const history = useHistory();
  const location = useLocation();
  const isUpdateMode = location.state && location.state.isUpdateMode; 
  
  useEffect(() => {
    if (isUpdateMode && location.state && location.state.selectedRow) {
      const formData = {
        ...location.state.selectedRow,
        issuedate: location.state.selectedRow.issuedate.split('T')[0],
        expdate: location.state.selectedRow.expdate.split('T')[0],
        };
      setRevenueData(formData);
    }
  }, [isUpdateMode, location.state]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRevenueData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!formData.engineno || formData.engineno.trim() === ""){
      console.error(" vehicleno is required");
      return;
    }
    console.log(formData);

    const token = localStorage.getItem("token");

      
          if(isUpdateMode) {
            axios
            .put(`http://localhost:5000/api/revenue/revenueupdate/${formData._id}`, 
            formData,
            { headers: {Authorization: token}}
            )
            .then((response) => {
              console.log('revenue Updated successfully');
              window.alert('revenue Updated successfully');
              history.push(`/${userRole}/${officeLocation}/dashboard`); 
            })
            .catch((error) => {
              console.error('Error updating revenue:', error);
            });
          }
          else {

            axios
            .post('http://localhost:5000/api/revenue/register/revenueregistration',
         formData,
        { headers: {Authorization: token}}
        )
        .then((response) => {
         
          console.log("revenue added successfully");
          window.alert('revenue added successfully');
         
          setRevenueData({
            engineno:'',
            owner:'',
            email:'',
            address:'',
            officelocation:officeLocation,
            issuedate:'',
            expdate:'',
            amount:'',
            weight:'',
            seatno:'',
            vetnumber:'',
            vehicleclass:'',
            vehiclefueltype:''
            
          });
        })
        .catch((error) => {
          console.error("Error adding vehicle:", error);
        });

          }
  }

  return (
    <div className='container-fluid'>
         <h2>Fist Revenue Registration</h2><br/><br/>
      <style>
        {`
          /* Formstyle.css */

          body {
              background-color: #e5d4fe;
            }
            
            .container-fluid {
              padding: 20px;
              margin-top: 10px; /* Add some padding to the container if needed */
            }
            
            .formbody {
              background-color: #d4e8ec; /* Change to white or any other color you prefer */
              padding: 20px;
              margin-top: 10px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            
            .form-group {
              margin-bottom: 15px;
            }
            
            label {
              display: block;
              margin-bottom: 5px;
              font-weight: bold;
            }
            
            .form-control {
              width: 100%;
              padding: 8px;
              box-sizing: border-box;
              border-radius: 4px;
              border: 1px solid #ccc;
            }
            
            .btn {
              width: 100%;
              padding: 10px;
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              text-decoration: none;
              border-radius: 4px;
              cursor: pointer;
            }
            
            .btn-primary {
              color: #fff;
              background-color:#6905fa;
              border: 1px solid #007bff;
            }
            h2{
              color:#6905fa;
            }
            
        `}
      </style>




      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={handleSubmit}>
            <div className='formbody'>
              <div className='form-group'>
                <label>Select office location:</label>
                <input type='text' className='form-control' name="officelocation" onChange={handleChange} required value={formData.officelocation} readOnly/>
        
              </div>

              {RevenueLFeald.map((field, index) => (
                <div className='form-group' key={index}>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    className='form-control'
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                  />
                </div>
              ))}

          <div className='form-group'>
            <label>Select Vehicle Type:</label>
            <select className='form-control' name="vehicleclass" onChange={handleChange} required value={formData.vehicleclass} >
              <option value="">Select Vehicle Type</option>
              {VehicleClass.map((option,index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>


          <div className='form-group'>
            <label>Select Vehicle Fuel Type:</label>
            <select className='form-control' name="vehiclefueltype" onChange={handleChange} value={formData.vehiclefueltype}>
              <option value="">Select Vehicle Fuel Type</option>
              {VehicleFuelType.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

             

              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterRevenu;
