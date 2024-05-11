import React from 'react';
import { policeFields, Plocations } from '../FormStruct';
import RegistrationForm from '../Registration';
import axios from 'axios';


function PoliceRegistrationPage() {




    const handleBasicRegistration = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register/police', formData);
            console.log('Registration successful:', response.data);
            
          } catch (error) {
            console.error('Registration failed:', error);
          }
    }

   
  
    return (
      <div>
        <h2>Police Registration</h2><br/><br/>
        
        <RegistrationForm fields={policeFields} onSubmit={handleBasicRegistration} locations={Plocations} />
      </div>
    );
  }

  export default PoliceRegistrationPage;