import React, {useState, useEffect} from 'react';
import { VRDEmployeeFields, Vlocations, MTERole } from '../../../Auth/AdminTEMPRegister/FormStruct';
import { useHistory, useLocation } from 'react-router-dom';

import axios from 'axios';

function MTERegistrationPage({userRole, officeLocation}) {

  const history = useHistory();
  const location = useLocation();
  const isUpdateMode = location.state && location.state.isUpdateMode; 
 


  const [formData, setUserData] = useState({
    officelocation:officeLocation
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
        .put(`http://localhost:5000/api/motortraffic/update/${formData._id}`, 
        formData,
        { headers: {Authorization: token}}
        )
        .then((response) => {
          console.log('Employee Updated successfully');
          window.alert('Employee Updated successfully');
          history.push(`/${userRole}/${officeLocation}/dashboard`); 
        })
        .catch((error) => {
          console.error('Error updating Employee:', error);
        });
      }
      else {
        axios.post('http://localhost:5000/api/motortraffic/register/mteregistration',
        formData,
       { headers: {Authorization: token}}
       
       )
       .then((response)=>{
         console.log('Registration successful');
         window.alert('Registration successful')

         setUserData({
           officeid:"",
           id:"",
           fullname:"",
           email:"",
           address:"",
           officelocation:officeLocation,
           phoneno:"",
           role:"",
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
        <h2>Motor Traffic Employee Registration</h2><br/><br/>
        
        <div className='container' style={{}} >

    <style>
      {`
        /* RegisterEmployeeStyles.css */

        body {
            background-color: #e5d4fe;
          }
        
        .container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background-color:#d4e8ec;
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
            background-color: #6905fa;
            border: 1px solid #007bff;
          }
          h2{
            color:#6905fa;
          }
          
      `}
    </style>



    <h2 className="mb-4">{isUpdateMode ? 'Update Employee' : 'Employee Registration'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="officelocation">Select Employee location:</label>
          <input type='text' className='form-control' name="officelocation" onChange={handleChange} required value={formData.officelocation} readOnly/>
         
        </div>

        {VRDEmployeeFields.map((field, index) => (
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
          <select className='form-control' id="role" name="role" onChange={handleChange} value={formData.role} >
            <option value="">Select Employee Role</option>
            {MTERole.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {isUpdateMode ? 'Update' : 'Register'}
        </button>
      </form>
    </div>
      </div>
    );
  }

  export default MTERegistrationPage;

  