import React, { useContext, useState } from 'react';
import axios from 'axios';
import './login.css';
import { Vlocations, inputvalinsurance } from '../AdminTEMPRegister/FormStruct';
import UserContext from '../../../UserContext';

function LoginInsurance({ setIsAuthenticated, setUserRole, setOfficeLocation, history }) {
  const [loginData, setLoginData] = useState({
    role: 'insurance', // Set the default user role
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { setOfficeLocation: setUserContextOfficeLocation } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "officelocation") {
      setLoginData({ ...loginData, [name]: value });
      setUserContextOfficeLocation(value);
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login/insuranceadmin', loginData);

      if (response.data.token) {
        setIsAuthenticated(true);
        setUserRole(loginData.role);
        setOfficeLocation(loginData.officelocation);

       
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', loginData.role);
        localStorage.setItem('officeLocation', loginData.officelocation);
        localStorage.setItem('officeid', loginData.officeid);

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
    <div style={{backgroundColor: '#e5d4fe', height: '100vh'}} >
    <div className="form-container" style={{backgroundColor: "#d4e8ec"}}>
      <h2 className='heading'>Login</h2>
      <form onSubmit={handleSubmit}>
        <select name="role" onChange={handleChange} required className="form-control" value={loginData.role}>
          <option value="insurance">Insurance Company</option>
        </select>
        {inputvalinsurance.map((option, index) => (
          <div key={index} className="inputfeald mb-3">
           <input type={option.type} name={option.name} placeholder={option.placeholder} onChange={handleChange} required className="form-control" />
          </div>
        ))}
        <select name="officelocation" onChange={handleChange} required className="form-control location">
          <option value="">Select your location</option>
          {Vlocations.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary mt-3"  style={{backgroundColor:'#6905fa'}}>Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </div>
  );
}

export default LoginInsurance;
