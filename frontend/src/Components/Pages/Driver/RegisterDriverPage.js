import React, { useState, useEffect } from 'react';
import {DriverFields,  Bloodtype } from '../../Auth/AdminTEMPRegister/FormStruct';
import { useHistory, useLocation } from 'react-router-dom'; // Import useHistory and useLocation from react-router-dom

import axios from 'axios';
import { imageDb } from './firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const licenseTypes = [
  { label: "Motor Bike", value: "A" },
  { label: "3Weel", value: "B" },
  { label: "Car", value: "C" },
  { label: "Lorry", value: "D" },
  { label: "Truck", value: "E" },
  { label: "Long Truck", value: "F" },
  { label: "Bus", value: "G" },
  { label: "Tracktor", value: "H" },
  { label: "JCB", value: "I" },
];


  

 

function RegisterDriverPage({userRole, officeLocation}) {

  const history = useHistory();
  const location = useLocation();
  const isUpdateMode = location.state && location.state.isUpdateMode; // Check if in update mode
  
  const [image, setImage] = useState(null);

  
  




  
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
    expdate:'',
    drivingLicenseTypes: []

  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedLicenseTypes = [...formData.drivingLicenseTypes];
  
    if (checked) {
      // Add the license type to the array
      updatedLicenseTypes = [...updatedLicenseTypes, name];
    } else {
      // Remove the license type from the array
      updatedLicenseTypes = updatedLicenseTypes.filter((type) => type !== name);
    }
  
    setUserData({ ...formData, drivingLicenseTypes: updatedLicenseTypes });
  };

  useEffect(() => {
    if (isUpdateMode && location.state && location.state.selectedRow) {
      const formattedData = {
        ...location.state.selectedRow,
        birthday: location.state.selectedRow.birthday.split('T')[0],
        issuedate: location.state.selectedRow.issuedate.split('T')[0],
        expdate: location.state.selectedRow.expdate.split('T')[0],
        // Ensure drivingLicenseTypes is an array as expected by checkboxes
        drivingLicenseTypes: location.state.selectedRow.drivingLicenseTypes || [],
      };
      setUserData(formattedData);
    }
  }, [isUpdateMode, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nic || !image) {
      alert("NIC and Image are required.");
      return;
    }

    try {
      // Upload image to Firebase
      const imgRef = ref(imageDb, `images/${formData.nic}`);
      const snapshot = await uploadBytes(imgRef, image);
      const imageUrl = await getDownloadURL(snapshot.ref);
      console.log('Image URL:', imageUrl);

      // Prepare form data including the image URL
      const completeFormData = { ...formData, imageUrl };

      // Submit form data to your API
      const token = localStorage.getItem('token');
      const apiURL = isUpdateMode ? `http://localhost:5000/api/drivers/update/${formData._id}` : 'http://localhost:5000/api/drivers/register/driversregistration';
      
      await axios({
        method: isUpdateMode ? 'put' : 'post',
        url: apiURL,
        data: completeFormData,
        headers: { Authorization: token },
      });

      alert("Driver information submitted successfully.");
      history.push(`/${userRole}/${officeLocation}/demployee/dashboard`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };


   
  
  
    return (
      <div>
        <h2 className="mb-4">{isUpdateMode ? 'Update Driver' : 'Driver Registration'}</h2><br/><br/>
        
        <div className='container-fluid'>

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
        background-color: #6905fa;
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

          {/*image upload*/}
          <div className='form-group'>
  <label>Profile Image:</label>
  <input type="file" onChange={e => setImage(e.target.files[0])} />
        {/* More form inputs based on your state */}
      
</div>


        <div className='form-group'>
  <label>Driving License Types:</label>
  <div>
    {licenseTypes.map((type, index) => (
      <div key={index}>
        <input
          type="checkbox"
          id={type.value}
          name={type.value}
          checked={formData.drivingLicenseTypes.includes(type.value)}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={type.value}>{type.label}</label>
      </div>
    ))}
  </div>
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

  