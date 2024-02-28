import React, { useState, useEffect } from 'react';
import { VehicleFields, VehicleClass, BikeModel,weelModel,
   CarModel, JeepModel , VehicleColor, VehicleProvince, 
   VehicleTaxationClass,Vlocations, Vehicleorigincountry, VehicleCylinderCapacity, VehicleStatus, VehicleFuelType } from '../../Auth/AdminTEMPRegister/FormStruct';
import axios from 'axios';

import { useHistory, useLocation } from 'react-router-dom'; // Import useHistory and useLocation from react-router-dom




function RegisterVehiclePage({userRole, officeLocation}) {

  const history = useHistory();
  const location = useLocation();
  const isUpdateMode = location.state && location.state.isUpdateMode; // Check if in update mode
 
  const [selectedVehicleClass, setSelectedVehicleClass] = useState('');

  const [formData, setUserData] = useState({
    chassisno: "",
    engineno: "",
    seatingcapacity: "",
    ownerfullname: "",
    nic: "",
    email:"",
    address: "",
    phoneno: "",
    officelocation: officeLocation,
    vehicleclass:"",
    vehiclemodel:"",
    vehiclecolor:"",
    vehicleprovince:"",
    vehicletaxationclass:"",
    vehicleorigincountry:"",
    vehiclecylindercapacity:"",
    vehiclestatus:"",
    vehiclefueltype:"",
   
  });
  

  useEffect(() => {
    if (isUpdateMode && location.state && location.state.selectedRow) {
      setUserData(location.state.selectedRow);
      setSelectedVehicleClass(location.state.selectedRow.vehicleclass);
    }
  }, [isUpdateMode, location.state]);


  const handleChange = async(e) => {
    const { name, value } = e.target;
    setUserData({ ...formData, [name]: value });

    // if (name === 'id' && value.trim() !== '') {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/api/vehicle/${value}`);
    //     const vehicleData = response.data;
    //     setUserData({
    //       ...formData,
    //       chassisno: vehicleData.chassisno,
    //       engineno: vehicleData.engineno,
    //       seatingcapacity: vehicleData.seatingcapacity,
    //       ownerfullname: vehicleData.ownerfullname,
    //       nic: vehicleData.nic,
    //       address: vehicleData.address,
    //       phoneno: vehicleData.phoneno,
    //       officelocation: vehicleData.officelocation,
    //       vehicleclass: vehicleData.vehicleclass,
    //       vehiclemodel: vehicleData.vehiclemodel,
    //       vehiclecolor: vehicleData.vehiclecolor,
    //       vehicleprovince: vehicleData.vehicleprovince,
    //       vehicletaxationclass: vehicleData.vehicletaxationclass,
    //       vehicleorigincountry: vehicleData.vehicleorigincountry,
    //       vehiclecylindercapacity: vehicleData.vehiclecylindercapacity,
    //       vehiclestatus: vehicleData.vehiclestatus,
    //       vehiclefueltype: vehicleData.vehiclefueltype,

    //       // Add other fields based on your user schema
          
    //     });
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // }

    // If the selected field is 'vehicleclass', update the selected vehicle class state
    if (name === 'vehicleclass') {
      setSelectedVehicleClass(value);
    }

  };
 

  const getVehicleModelOptions = () => {
    
    if (selectedVehicleClass === 'motorcycle') {
      return  BikeModel;
    } else if (selectedVehicleClass === 'car') {
      return CarModel;
    }
    else if (selectedVehicleClass === 'threeweel') {
      return weelModel;
    }
    else if (selectedVehicleClass === 'jeep') {
      return JeepModel;
    }
    // Add more conditions for other vehicle classes if needed
    return [];
  };

 




    const handleSubmit =async (e) => {
      e.preventDefault();

      if (!formData.chassisno || formData.chassisno.trim() === ""){
        console.error("chassisno is required");
        return;
      }
      console.log(formData);

      const token = localStorage.getItem("token");

        
            if(isUpdateMode) {
              axios
              .put(`http://localhost:5000/api/vehicle/update/${formData._id}`, 
              formData,
              { headers: {Authorization: token}}
              )
              .then((response) => {
                console.log('Vehicle Updated successfully');
                window.alert('Vehicle Updated successfully');
                history.push(`/${userRole}/${officeLocation}/dashboard`); // Redirect to the BorrowBookTable after update
              })
              .catch((error) => {
                console.error('Error updating Vehicle:', error);
              });
            }
            else {

              axios
              .post('http://localhost:5000/api/vehicle/register/vehicleregistration',
           formData,
          { headers: {Authorization: token}}
          )
          .then((response) => {
            // Handle success (e.g., show a success message, reset the form)
            console.log("Vehicle added successfully");
            window.alert('Vehicle added successfully');
            // Reset the form fields
            setUserData({
              chassisno: "",
              engineno: "",
              seatingcapacity: "",
              ownerfullname: "",
              nic: "",
              email:"",
              address: "",
              phoneno: "",
              vehicleclass:"",
              vehiclemodel:"",
              vehiclecolor:"",
              vehicleprovince:"",
              vehicletaxationclass:"",
              vehicleorigincountry:"",
              vehiclecylindercapacity:"",
              vehiclestatus:"",
              vehiclefueltype:"",
              
            });
          })
          .catch((error) => {
            // Handle error (e.g., show an error message)
            console.error("Error adding vehicle:", error);
          });

            }
    }

   
  
  
    return (
      <div style={{backgroundColor: "#d4e8ec"}} >
        <h2>Motor Traffic Vehicle Registration</h2><br/><br/>
        
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



    <h2 className="mb-4">{isUpdateMode ? 'UpdateVehicle' : 'Vehicle Registration'}</h2>
      <form onSubmit={handleSubmit}>
      <input type='text' className='form-control' name="officelocation" onChange={handleChange} required value={formData.officelocation} readOnly>
         
      </input>
      
          <div className='form-group'>
            <label>Select Vehicle Class:</label>
            <select className='form-control' name="vehicleclass" onChange={handleChange} required value={formData.vehicleclass} >
              <option value="">Select Vehicle Class</option>
              {VehicleClass.map((option,index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {VehicleFields.map((field, index) => (
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

          <div className='form-group'>
            <label>Select Vehicle Model:</label>
            <select className='form-control' name="vehiclemodel" onChange={handleChange} value={formData.vehiclemodel} >
              <option value="">Select Vehicle Model</option>
              {getVehicleModelOptions().map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Vehicle Color:</label>
            <select className='form-control' name="vehiclecolor" onChange={handleChange} value={formData.vehiclecolor}>
              <option value="">Select Vehicle Color</option>
              {VehicleColor.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Vehicle Province:</label>
            <select className='form-control' name="vehicleprovince" onChange={handleChange} value={formData.vehicleprovince}>
              <option value="">Select Vehicle Province</option>
              {VehicleProvince.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Vehicle Taxation Class:</label>
            <select className='form-control' name="vehicletaxationclass" onChange={handleChange} value={formData.vehicletaxationclass}>
              <option value="">Select Vehicle Taxation Class</option>
              {VehicleTaxationClass.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Vehicle Origin Country:</label>
            <select className='form-control' name="vehicleorigincountry" onChange={handleChange} value={formData.vehicleorigincountry}>
              <option value="">Select Vehicle Origin Country</option>
              {Vehicleorigincountry.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Vehicle Cylinder Capacity:</label>
            <select className='form-control' name="vehiclecylindercapacity" onChange={handleChange} value={formData.vehiclecylindercapacity}>
              <option value="">Select Vehicle Cylinder Capacity</option>
              {VehicleCylinderCapacity.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Vehicle Status:</label>
            <select className='form-control' name="vehiclestatus" onChange={handleChange} value={formData.vehiclestatus}>
              <option value="">Select Vehicle Status</option>
              {VehicleStatus.map((option, index) => (
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

          <button type="submit" className="btn btn-primary">
          {isUpdateMode ? 'Update' : 'Register'}
        </button>
      </form>
    </div>
    </div>
    );
  }

  export default RegisterVehiclePage;

  