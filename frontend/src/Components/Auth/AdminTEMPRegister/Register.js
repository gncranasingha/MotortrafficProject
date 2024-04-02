import React, { useState } from 'react';
import PoliceRegistrationPage from './RegistrationPages/PoliceRegistrationPage';
import VRDEmployeeRegistrationPage from './RegistrationPages/VRDEmployeeRegistrationPage';

import RRDEmployeeRegistrationPage from './RegistrationPages/RRDEmployeeRegistrationPage';
import InsuranceeRegistrationPage from './RegistrationPages/InsuranceRegistrationPage';

function Register() {
  const [selectedForm, setSelectedForm] = useState('');

  const handleFormChange = (e) => {
    setSelectedForm(e.target.value);
  };

  return (
    <div>
      <h1>Registration Page Selector</h1>
      <select className='fistselectrole' onChange={handleFormChange} value={selectedForm}>
        <option value="">Select a Registration Form</option>
        <option value="police">Police Registration</option>
        <option value="vrdemployee">Motor Traffic Registration Department</option>
        <option value="rrdemployee">Revenue License Registration Department</option>
        <option value="insurance">Insurance Company</option>
      </select>
      {selectedForm === 'police' && <PoliceRegistrationPage />}
      {selectedForm === 'vrdemployee' && <VRDEmployeeRegistrationPage />}  
      {selectedForm === 'rrdemployee' && <RRDEmployeeRegistrationPage />}
      {selectedForm === 'insurance' && <InsuranceeRegistrationPage />}
    </div>
  );
}

export default Register;
