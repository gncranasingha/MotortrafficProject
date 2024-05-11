import React from 'react';
import {RRDEmployeeFields, Rlocations } from '../FormStruct';
import RegistrationForm from '../Registration';
import axios from 'axios';

const RRDEmployeeRegistrationPage = () => {

 

    const handleBasicRegistration = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register/rlrdemployee', formData);
            console.log('Registration successful:', response.data);
            
          } catch (error) {
            console.error('Registration failed:', error);
          }
    }

    
  
    return (
      <div>
        <h2>Revenue License Registration Department</h2><br/><br/>
       
        <RegistrationForm fields={RRDEmployeeFields} onSubmit={handleBasicRegistration} locations={Rlocations} />
      </div>
    );
}

export default RRDEmployeeRegistrationPage