import React from 'react';
import { VRDEmployeeFields, Vlocations } from '../FormStruct';
import RegistrationForm from '../Registration';
import axios from 'axios';

function VRDEmployeeRegistrationPage() {


    const handleExtendedRegistration =async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register/vrdemployee', formData);
            console.log('Registration successful:', response.data);
            
            // After successful registration, you can choose to navigate the user to the login page.
            // You can use the history object if you're using React Router.
          } catch (error) {
            console.error('Registration failed:', error);
          }
    }

   
  
  
    return (
      <div>
        <h2>Motor Traffic Registration Department</h2><br/><br/>
        
        <RegistrationForm fields={VRDEmployeeFields} onSubmit={handleExtendedRegistration} locations={Vlocations} />
      </div>
    );
  }

  export default VRDEmployeeRegistrationPage;

  