import React from 'react';
import  { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContext from './UserContext';

import Home from './Components/Common/Home';
import AdminPanel from './Components/Admins/AdminPanel';
import EmployeePanel from './Components/Employees/EmployeePanel';

import LoginVehicle from './Components/Auth/Login/LoginVehicle';
import LoginRevenue from './Components/Auth/Login/LoginRevenue';
import LoginPolice from './Components/Auth/Login/LoginPolice';
import PrivateRoute from './Components/PrivateRoute';
import Register from './Components/Auth/AdminTEMPRegister/Register'

import VRDepartmentDasboard from './Components/Dashboard/VRDepartmentDashboard/VRDepartmentDasboard';

import PoliceDepartmentDashboard from './Components/Dashboard/PoliceDepartmentDashboard/PoliceDepartmentDashboard';
import FineForm from './Components/Pages/Police/Fine';
import EmployeePage from './Components/Pages/Employee/EmpRegisterPage/MotorTrafficEmployeePage';
import MTERegistrationPage from './Components/Pages/Employee/EmpRegisterPage/MTERegistrationPage';
import MTRDloginPage from './Components/Pages/Employee/EmployeeLoginPage/MTRDloginPage';
import VehiclePage from './Components/Pages/Vehicle/VehiclePage';
import DriverPage from './Components/Pages/Driver/DriverPage'
import RegisterVehiclePage from './Components/Pages/Vehicle/RegisterVehiclePage';
import RRDepartmentDashboard from './Components/Dashboard/RRDepartmentDashboard/RRDepartmentDashboard';
import PoliceEmployeePage from './Components/Pages/Employee/EmpRegisterPage/PoliceEmployeePage'
import RegisterDriverPage from './Components/Pages/Driver/RegisterDriverPage';
import PoliceRegistrationPage from './Components/Pages/Employee/EmpRegisterPage/PoliceRegistrationPage'
import { convertLength } from '@mui/material/styles/cssUtils';

import  VehicleEmployeeDashboard from './Components/Dashboard/EmployeeDashboard/VehicleEmployeeDashboard'
import DriverEmployeeDashboard from './Components/Dashboard/EmployeeDashboard/DriverEmployeeDashboard'

import DriverView from './Components/Pages/Police/DriverView';
import VehicleView from './Components/Pages/Police/VehicleView';
import FinePage from './Components/Pages/Police/FinePage';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [officeLocation, setOfficeLocation] = useState();

  return (
    <UserContext.Provider value={{userRole,setOfficeLocation, officeLocation}}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/adminpanel" component={AdminPanel} />
        <Route exact path="/employeepanel" component={EmployeePanel} />       
        <Route path="/login/vehiclerd" render={(props) => <LoginVehicle {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} setOfficeLocation={setOfficeLocation}  />} />
            <PrivateRoute path="/motortrafficregistrationdepartment/:officeLocation/dashboard" component={(props) => (<VRDepartmentDasboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />
            <PrivateRoute path="/motortrafficregistrationdepartment/:officeLocation/addemp" component={ MTERegistrationPage} isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/motortrafficregistrationdepartment/:officeLocation/employee"  component={(props) => (<EmployeePage {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation}/>   
            <PrivateRoute path="/motortrafficregistrationdepartment/:officeLocation/vehicle"  component={(props) => (<VehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute path="/:userRole/:officeLocation/addvehicle"  component={(props) => (<RegisterVehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute path="/motortrafficregistrationdepartment/:officeLocation/driver"  component={(props) => (<DriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute path="/motortrafficregistrationdepartment/:officeLocation/adddriver" component={(props) => (<RegisterDriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
        <Route path="/login/revenuelrd" render={(props) => <LoginRevenue {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} setOfficeLocation={setOfficeLocation} />} />
            <PrivateRoute path="/rregistrationdepartment/:officeLocation/dashboard" component={(props) => (<RRDepartmentDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>          
        <Route path="/login/police" render={(props) => <LoginPolice {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole}  setOfficeLocation={setOfficeLocation}/>} />
            <PrivateRoute path="/police/:officeLocation/dashboard" component={(props) => (<PoliceDepartmentDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/police/:officeLocation/policeofficer" component={(props) => (<PoliceEmployeePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/police/:officeLocation/addpoliceofficer" component={(props) => (<PoliceRegistrationPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/police/:officeLocation/fine" component={(props) => (<FinePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/police/:officeLocation/addfine" component={(props) => (<FineForm {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/:userRole/:officeLocation/driver"  component={(props) => (<DriverView {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation} />
            <PrivateRoute path="/:userRole/:officeLocation/vehicle"  component={(props) => (<VehicleView {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation} />



        <Route exact path="/register" component={Register} />

        <Route path="/login/mtdemployee" render={(props) => <MTRDloginPage {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} setOfficeLocation={setOfficeLocation} />} />
            <PrivateRoute path="/:userRole/:officeLocation/vemployee/dashboard" component={(props) => (<VehicleEmployeeDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['vregistrationdepartment']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/:userRole/:officeLocation/demployee/dashboard" component={(props) => (<DriverEmployeeDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['dregistrationdepartment']}  officeLocation={officeLocation}/>
            <PrivateRoute path="/:userRole/:officeLocation/demployee/driver" component={(props) => (<DriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['dregistrationdepartment']}  officeLocation={officeLocation} /> 
            <PrivateRoute path="/:userRole/:officeLocation/demployee/adddriver" component={(props) => (<RegisterDriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['dregistrationdepartment']}  officeLocation={officeLocation} /> 
            <PrivateRoute path="/:userRole/:officeLocation/vemployee/vehicle"  component={(props) => (<VehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['vregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute path="/:userRole/:officeLocation/vemployee/addvehicle"  component={(props) => (<RegisterVehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['vregistrationdepartment']}  officeLocation={officeLocation} />   
            
            
        
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
