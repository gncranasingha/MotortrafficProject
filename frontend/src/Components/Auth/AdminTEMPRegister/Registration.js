import React, { useState } from 'react';
import './Register.css';

function Register({fields, locations, onSubmit}) {
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
    <div className='register-container'>
      
      <form onSubmit={handleSubmit}>
      <div className='formbody' >
      <select className='selectlocation' name="officelocation" onChange={handleChange} required>
          <option value="">Select your location</option>
          {locations.map((option,index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
        
        {fields.map((field, index) => (
          <div key={index} >
            <label>{field.label}</label>
            <input 
              type={field.type}
              name={field.name}
              value={formData[field.name] || '' }
              onChange={handleChange}
            />
          </div>
        ))}
        
       
        <select className='selectRole' name="role" onChange={handleChange}>
          <option value="">Select Your Role</option> 
          <option value="police">Police</option>
          <option value="motortrafficregistrationdepartment">Motor Traffic Registration Department</option>
          <option value="rregistrationdepartment">Revenue Licence Registration Department</option>
          <option value="insurance">insuarance company</option>
          </select>
        <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;

