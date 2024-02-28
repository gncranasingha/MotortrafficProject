import React, { useState } from 'react';
import './Driverstyle.css'

function RegisterDriverForm({ fields, locations, onSubmit, Bloodtype }) {
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
                <select className='form-control' name="officelocation" onChange={handleChange} required>
                  <option value="">Select office location</option>
                  {locations.map((option, index) => (
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
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className='form-group'>
                <label>Select your Blood Group:</label>
                <select className='form-control' name="bloodtype" onChange={handleChange} required>
                  <option value="">Select your Blood Group</option>
                  {Bloodtype.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterDriverForm;
