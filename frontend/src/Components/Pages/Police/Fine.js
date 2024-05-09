import React, { useState, useEffect } from 'react';
import {FineFields, LisanceStatus, NewClass, OldClass} from '../../Auth/AdminTEMPRegister/FormStruct';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom'; // Import useHistory and useLocation from react-router-dom



function FineForm({userRole, officeLocation}) {

  const history = useHistory();
  const location = useLocation();
  const isUpdateMode = location.state && location.state.isUpdateMode; // Check if in update mode
 

  const [formData, setFineData] = useState({
            dateoffence: "",
            fineid:"",
            createstatus:"manual",
            id: "",
            DLNo: "",
            fullname: "",
            email: "",
            officelocation:officeLocation,
            address: "",
            phoneno: "",
            vehicleno:"",
            offenceplace:"",
            natureoffence:"",
            court:"",
            courtdate:"",
            issuingofficers:"",
            rank:"",
            timenow:"",
            amount:""
           
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
    if (isUpdateMode && location.state && location.state.selectedRow) {
      setFineData(location.state.selectedRow);
     }
  }, [isUpdateMode, location.state]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFineData({ ...formData, [name]: value });

    // If the selected field is 'vehicleclass', update the selected vehicle class state
    // if (name === 'vehicleclass') {
    //   setSelectedVehicleClass(value);
    // }
   

  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert fineid to string and trim it to ensure proper formatting
    const trimmedFineId = String(formData.fineid).trim();
  
    if (!trimmedFineId) {
      console.error("fineid is required");
      window.alert("Fine ID is required."); // Provide user feedback
      return;
    }
  
    console.log("Processed form data:", formData);
  
    const token = localStorage.getItem("token"); // Retrieve the authentication token
  
    // Define API endpoints based on whether updating or adding a new fine
    const endpoint = isUpdateMode ?
      `http://localhost:5000/api/fine/update/${formData._id}` : // Endpoint for updating
      'http://localhost:5000/api/fine/register/fineregistration'; // Endpoint for registering
  
    // Prepare headers with authorization
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    // Decide the HTTP method based on operation mode
    const method = isUpdateMode ? axios.put : axios.post;
  
    // Execute the HTTP request using axios
    method(endpoint, {...formData, fineid: trimmedFineId}, config)
      .then(response => {
        console.log(`${isUpdateMode ? 'Fine updated' : 'Fine registered'} successfully`);
        window.alert(`${isUpdateMode ? 'Fine updated' : 'Fine registered'} successfully`);
        history.push(`/${userRole}/${officeLocation}/dashboard`); // Redirect after successful operation
      })
      .catch(error => {
        console.error('Error submitting fine:', error);
        window.alert('Error submitting fine: ' + error.message);
      });
  }
  

  return (
    <div><br/><br/>
        <h2 className="mb-4">{isUpdateMode ? 'Update Fine' : 'Fine Registration'}</h2>
    
        
    <div className='container' style={{}}>
        

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
          background-color: #d4e8ec;
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
        
          
      <label> office location:</label>
        <input type='text' className='form-control' name="officelocation" onChange={handleChange} required value={formData.officelocation} readOnly/>
        
        
          {FineFields.map((field, index) => (
            <div className='form-group' key={index}>
              <label>{field.label}</label>
              <input
                type={field.type}
                className='form-control'
                name={field.name}
                onChange={handleChange}
                value={formData[field.name]}
              />
            </div>
          ))}
               

          

        <button type="submit" className="btn btn-primary">
          {isUpdateMode ? 'Update' : 'Add Fine'}
        </button>
      </form>
    </div>
    </div>
  );
}

export default FineForm;
