import React from 'react';
import { InsuranceFields, Plocations } from '../FormStruct';
import RegistrationForm from '../Registration';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


function InsuranceeRegistrationPage() {




    const handleBasicRegistration = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register/insurance', formData);
            console.log('Registration successful:', response.data);
            
          } catch (error) {
            console.error('Registration failed:', error);
           
          }
    }

   
  
    return (
      <div>
        <h2>Insurance Registration</h2><br/><br/>
        
        <RegistrationForm fields={InsuranceFields} onSubmit={handleBasicRegistration} locations={Plocations} />
      </div>
    );
  }

  export default InsuranceeRegistrationPage;