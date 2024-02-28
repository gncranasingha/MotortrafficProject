import React, { useState, useEffect } from 'react';
import {FineFields, LisanceStatus, NewClass, OldClass} from '../../Auth/AdminTEMPRegister/FormStruct';
import axios from 'axios';
function FineForm({userRole, officeLocation}) {

  const [formData, setFineData] = useState({
            dateoffence: "",
            fineid:"",
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
            drivermodel:""
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDriverClass, setSelectedDriverClass] = useState('');

  //const [selectedVehicleClass, setSelectedVehicleClass] = useState('');


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
    if (name === 'driverclass') {
      setSelectedDriverClass(value);
    }

  };

  const getDriverModelOptions = () => {
    if (selectedDriverClass === 'new') {
      return NewClass;
    } else if (selectedDriverClass === 'old') {
      return OldClass;
    }
    
    // Add more conditions for other vehicle classes if needed
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // onSubmit(formData);

   if (!formData.fineid || formData.fineid.trim() === ""){
    console.error("fineid is required");
    return;
  }
  console.log(formData);

  const token = localStorage.getItem("token");

    
         axios
            .post('http://localhost:5000/api/Fine/register/fineregistration',
         formData,
        { headers: {Authorization: token}}
        )
        .then((response) => {
          // Handle success (e.g., show a success message, reset the form)
          console.log("Fine added successfully");
          // Reset the form fields
          setFineData({
            dateoffence: "",
            fineid:"",
            id: "",
            DLNo: "",
            fullname: "",
            email: "",
            officelocation:"",
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
            drivermodel:""
            
          });
        })
        .catch((error) => {
          // Handle error (e.g., show an error message)
          console.error("Error adding Fine:", error);
        });


        setFineData({});
  };

  return (
    <div><br/><br/>
        <h2>Add Fine</h2><br/>
        
    <div className='container' style={{}}>
        

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
              />
            </div>
          ))}

         {/* i want to fetch office location use UserContext */}
         <div className='form-group'>
            <label>Select Driving Lisence Status :</label>
            <select className='form-control' name="driverclass" onChange={handleChange} required  >
              <option value="">Select  Class</option>
              {LisanceStatus.map((option,index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Driver Lisence Type:</label>
            <select className='form-control' name="drivermodel" onChange={handleChange}  >
              <option value="">Select Vehicle Model</option>
              {getDriverModelOptions().map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

         
        
          

          

          

         

          

          <button type="submit" className="btn btn-primary">Add Fine</button>
       
      </form>
    </div>
    </div>
  );
}

export default FineForm;
