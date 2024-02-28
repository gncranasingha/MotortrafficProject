import React, { useState } from 'react';


function RegisterVehicleForm({ fields, vclass, onSubmit, Bikemodel,
  weelModel, CarModel, JeepModel, vcolor, VehicleProvince, VehicleTaxationClass,
  Vehicleorigincountry, VehicleCylinderCapacity, VehicleStatus, VehicleFuelType, officelocation }) {

  const [formData, setUserData] = useState({
    officelocation:officelocation
  });
  const [selectedVehicleClass, setSelectedVehicleClass] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...formData, [name]: value });

    // If the selected field is 'vehicleclass', update the selected vehicle class state
    if (name === 'vehicleclass') {
      setSelectedVehicleClass(value);
    }

  };

  const getVehicleModelOptions = () => {
    if (selectedVehicleClass === 'motorcycle') {
      return Bikemodel;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setUserData({});
  };

  return (
    <div className='container' style={{backgroundColor: "#d4e8ec"}}>


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


        <input type='text' className='form-control' name="officelocation" onChange={handleChange} required value={formData.officelocation} readOnly/>
        <input type='text' className='form-control' name="role" onChange={handleChange} required value='VehicleOwner' readOnly/>
        
        
          <div className='form-group'>
            <label>Select Vehicle Class:</label>
            <select className='form-control' name="vehicleclass" onChange={handleChange} required value={formData.vehicleclass} >
              <option value="">Select Vehicle Class</option>
              {vclass.map((option,index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {fields.map((field, index) => (
            <div className='form-group' key={index}>
              <label>{field.label}</label>
              <input
                type={field.type}
                className='form-control'
                name={field.name}
                onChange={handleChange}
                value={formData.name}
              />
            </div>
          ))}

          <div className='form-group'>
            <label>Select Vehicle Model:</label>
            <select className='form-control' name="vehiclemodel" onChange={handleChange}  >
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
            <select className='form-control' name="vehiclecolor" onChange={handleChange}>
              <option value="">Select Vehicle Color</option>
              {vcolor.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className='form-group'>
            <label>Select Vehicle Province:</label>
            <select className='form-control' name="vehicleprovince" onChange={handleChange}>
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
            <select className='form-control' name="vehicletaxationclass" onChange={handleChange}>
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
            <select className='form-control' name="vehicleorigincountry" onChange={handleChange}>
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
            <select className='form-control' name="vehiclecylindercapacity" onChange={handleChange}>
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
            <select className='form-control' name="vehiclestatus" onChange={handleChange}>
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
            <select className='form-control' name="vehiclefueltype" onChange={handleChange}>
              <option value="">Select Vehicle Fuel Type</option>
              {VehicleFuelType.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
       
      </form>
    </div>
  );
}

export default RegisterVehicleForm;
