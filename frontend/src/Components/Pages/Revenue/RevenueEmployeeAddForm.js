import React, {useState, useEffect} from 'react';
import {RRDEmployeeFields, MTERole } from '../../Auth/AdminTEMPRegister/FormStruct';
import { useHistory, useLocation } from 'react-router-dom'; // Import useHistory and useLocation from react-router-dom

import axios from 'axios';

function RevenueEmpAddForm({userRole, officeLocation}) {

  const history = useHistory();
  const location = useLocation();
  const isUpdateMode = location.state && location.state.isUpdateMode; // Check if in update mode
 


  const [formData, setUserData] = useState({
    officeid:"",
    id:"",
    fullname:"",
    email:"",
    address:"",
    officelocation:officeLocation,
    phoneno:"",
    role:userRole
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

  


    const  handleSubmit =async (e) => {
      e.preventDefault();
     
      if(!formData.id || formData.id.trim() === "") {
        console.error("NIc is required");
        return;
      }
      console.log(formData);
      
      const token = localStorage.getItem("token");

      if(isUpdateMode) {
        axios
        .put(`http://localhost:5000/api/revenue/update/${formData._id}`, 
        formData,
        { headers: {Authorization: token}}
        )
        .then((response) => {
          console.log('Employee Updated successfully');
          window.alert('Employee Updated successfully');
          history.push(`/${userRole}/${officeLocation}/dashboard`); // Redirect to the BorrowBookTable after update
        })
        .catch((error) => {
          console.error('Error updating Employee:', error);
        });
      }
      else {
        axios.post('http://localhost:5000/api/revenue/register/addrevenueemp',
        formData,
       { headers: {Authorization: token}}
       
       )
       .then((response)=>{
         console.log('Registration successful');

         setUserData({
           officeid:"",
           id:"",
           fullname:"",
           email:"",
           address:"",
           officelocation:officeLocation,
           phoneno:"",
           role:userRole,
         })
       })
      .catch ((error) => {
       console.error('Registration failed:', error);
     })
     setUserData({});
      }
        
          
    }

   
  
  
    return (
      <div>
        <h2>Revenue Employee Registration</h2><br/><br/>
        
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



    <h2 className="mb-4">{isUpdateMode ? 'Update Employee' : 'Employee Registration'}</h2>
      <form onSubmit={handleSubmit}>
        
          <input type='text' className='form-control' name="officelocation" onChange={handleChange} required value={formData.officelocation} readOnly/>
         
        

        {RRDEmployeeFields.map((field, index) => (
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

          <input type='text' className='form-control' name="role" onChange={handleChange} required value={formData.role} readOnly/>
         
        

        <button type="submit" className="btn btn-primary">
          {isUpdateMode ? 'Update' : 'Register'}
        </button>
      </form>
    </div>
      </div>
    );
  }

  export default RevenueEmpAddForm;

  