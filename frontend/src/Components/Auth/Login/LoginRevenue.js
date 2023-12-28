import React, { useState } from 'react';
import axios from 'axios';
import './login.css'

function LoginRevenue({ setIsAuthenticated, setUserRole, history }) {
  const [loginData, setLoginData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  

  const Rlocations = [
    { value: 'rajanganaya', label: 'Rajanganaya' },
    { value: 'galgamuwa', label: 'Galgamuwa' },
    { value: 'thalawa', label: 'talawa' },
    { value: 'nochchiyagama', label: 'Nochchiyagama' },
    { value: 'anuradhapura', label: 'Anuradhapura' },
    { value: 'saliyawewa', label: 'Saliyawewa' },
    
  ];


  const inputval = [
    { type:'text', name:'officeid', placeholder:'Office ID' },
    { type:'email', name:'email', placeholder:'Email' },
    { type:'password', name:'password', placeholder:'Password' },
  ]



  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login/revenueld', loginData);
      

      
      if (response.data.token) {
        // Authentication successful
        setIsAuthenticated(true);
        setUserRole(loginData.role);
        localStorage.setItem('token', response.data.token);
        history.push(`/${loginData.role}/${loginData.officelocation}/dashboard`);
      }
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid credentials. Please check your username, password, and role.');
      } else {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }
    }
  };

  return (
    <div className="form-container" >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <select name="role" onChange={handleChange} required className="form-control" >
          <option value="">Select your role</option>
          <option value="rregistrationdepartment">Revenue Licence Registration Department</option>
        </select>
        {inputval.map((option,index) => (
            <div key={index}  className="inputfeald mb-3" >
                <label className='form-label'>{option.placeholder}</label>
                <input type={option.type} name={option.name} placeholder={option.placeholder} onChange={handleChange} required className="form-control" />
            </div>
        ))}
        <select name="officelocation" onChange={handleChange} required className="form-control">
          <option value="">Select your location</option>
          {Rlocations.map((option,index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default  LoginRevenue;