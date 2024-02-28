import React, { useState, useEffect } from 'react';
import {DriverFields, Vlocations, Bloodtype } from '../../Auth/AdminTEMPRegister/FormStruct';
import { useHistory, useLocation } from 'react-router-dom'; // Import useHistory and useLocation from react-router-dom

import axios from 'axios';

function RegisterDriverPage({userRole, officeLocation}) {

  const history = useHistory();
  const location = useLocation();
  const isUpdateMode = location.state && location.state.isUpdateMode; // Check if in update mode
 

  const [formData, setUserData] = useState({
   
    nic:'',
    fullname:'',
    email:'',
    address:'',
    officelocation:officeLocation,
    bloodtype:'',
    phoneno:'',
    birthday:'',
    issuedate:'',
    expdate:''

  });

  useEffect(() => {
    if (isUpdateMode && location.state && location.state.selectedRow) {
      setUserData(location.state.selectedRow);
      
    }
  }, [isUpdateMode, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...formData, [name]: value });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(!formData.nic || formData.nic.trim() === "") {
        console.error("Nic is required");
        return;
      }
      console.log(formData);

      const token = localStorage.getItem("token");

      if(isUpdateMode) {
        axios
        .put(`http://localhost:5000/api/drivers/update/${formData._id}`, 
        formData,
        { headers: {Authorization: token}}
        )
        .then((response) => {
          console.log('Driver Updated successfully');
          window.alert('Driver Updated successfully');
          history.push(`/${userRole}/${officeLocation}/dashboard`); // Redirect to the BorrowBookTable after update
        })
        .catch((error) => {
          console.error('Error updating Driver:', error);
        });
      }
      else{
        axios.post('http://localhost:5000/api/drivers/register/driversregistration', 
        formData,
        {headers: {Authorization: token}}
        )
        .then((response) => {
          // Handle success (e.g., show a success message, reset the form)
          console.log("Driver added successfully");
          window.alert("Driver added successfully");
          // Reset the form fields
          setUserData({
            nic:'',
            email:'',
            fullname:'',
            address:'',
            officelocation:officeLocation,
            bloodtype:'',
            phoneno:'',
            birthday:'',
            issuedate:'',
            expdate:''
          });
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
          console.error("Error adding Driver:", error);
        });
        
      }
       
           
    }

   
  
  
    return (
      <div>
        <h2 className="mb-4">{isUpdateMode ? 'Update Driver' : 'Driver Registration'}</h2><br/><br/>
        
        <div className='container-fluid'>

<style>
  {`
    /* Formstyle.css */

    body {
        background-color: #f0f0f0;
      }
      
      .container-fluid {
        padding: 20px;
        margin-top: 10px; /* Add some padding to the container if needed */
      }
      
      .formbody {
        background-color: #ffffff; /* Change to white or any other color you prefer */
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
        background-color: #007bff;
        border: 1px solid #007bff;
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

        {DriverFields.map((field, index) => (
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
          <label>Select your Blood Group:</label>
          <select className='form-control' name="bloodtype" onChange={handleChange} required value={formData.Bloodtype}>
            <option value="">Select your Blood Group</option>
            {Bloodtype.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {isUpdateMode ? 'Update' : 'Register'}
        </button>
      </div>
    </form>
  </div>
</div>
</div>
      </div>
    );
  }

  export default RegisterDriverPage;

  