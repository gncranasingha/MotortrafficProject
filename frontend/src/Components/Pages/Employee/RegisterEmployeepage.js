import React, { useState } from 'react';
import '../Formstyle.css'
function RegisterEmployeePage({ fields, locations, onSubmit, role }) {
  const [formData, setUserData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setUserData({});
  };

  return (
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
          <select className='form-control' id="officelocation" name="officelocation" onChange={handleChange} required>
            <option value="">Select Employee location</option>
            {locations.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {fields.map((field, index) => (
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
          <select className='form-control' id="role" name="role" onChange={handleChange}>
            <option value="">Select Employee Role</option>
            {role.map((option, index) => (
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

export default RegisterEmployeePage;
