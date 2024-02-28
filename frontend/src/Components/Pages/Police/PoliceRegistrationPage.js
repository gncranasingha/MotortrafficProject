import React,{useState} from 'react';
import {policeFields, Plocations, PRole } from '../../Auth/AdminTEMPRegister/FormStruct';

import axios from 'axios';

function PoliceRegistrationPage({userRole, officeLocation}) {

  
    const [formData, setUserData] = useState({
      officeid:"",
                id:"",
                fullname:"",
                email:"",
                address:"",
                officelocation:officeLocation,
                phoneno:"",
                role:userRole,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...formData, [name]: value });
    };
  


    const handleSubmit =async (e) => {

      e.preventDefault();
     
      if(!formData.id || formData.id.trim() === "") {
        console.error("NIc is required");
        return;
      }
      console.log(formData);
      
      const token = localStorage.getItem("token");
        
       
            axios.post('http://localhost:5000/api/police/register/policeofficerregistration',
             formData,
             { headers: {Authorization: token}}

             ).then((response)=>{
              console.log('Registration successful');

              setUserData({
                officeid:"",
                id:"",
                fullname:"",
                email:"",
                address:"",
                officelocation:"",
                phoneno:"",
                role:"",
              })
            })
           .catch ((error) => {
            console.error('Registration failed:', error);
          })
          setUserData({});
    }

   
  
  
    return (
      <div style={{backgroundColor: "#d4e8ec"}}>
        <h2>Police Offcer Registration</h2><br/><br/>
        
        <div className='container' style={{}} >

    <style>
      {`
        /* RegisterEmployeeStyles.css */

        body {
            background-color: #f0f0f0;
          }
        
        .container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
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
            width: 100%; /* Set the button width to 100% */
            padding: 10px; /* Adjusted padding for button height */
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




      <form onSubmit={handleSubmit}>
        
        <div className='form-group'>
          <label htmlFor="officelocation">Select Employee location:</label>
          <input type='text' className='form-control' name="fficelocation" onChange={handleChange} required value={formData.officelocation} readOnly/>
         
        </div>

        {policeFields.map((field, index) => (
          <div className='form-group' key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              className='form-control'
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className='form-group'>
          <label htmlFor="role">Select Employee Role:</label>
          <input type='text' className='form-control' name="role" onChange={handleChange} required value={formData.role} readOnly/>
         
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
      </div>
    );
  }

  export default PoliceRegistrationPage;

  