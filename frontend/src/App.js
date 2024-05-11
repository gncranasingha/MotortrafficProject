import React, { useEffect } from 'react';
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
import PoliceEmployeePage from './Components/Pages/Police/PoliceEmployeePage'
import RegisterDriverPage from './Components/Pages/Driver/RegisterDriverPage';
import PoliceRegistrationPage from './Components/Pages/Police/PoliceRegistrationPage'


import  VehicleEmployeeDashboard from './Components/Dashboard/EmployeeDashboard/VehicleEmployeeDashboard'
import DriverEmployeeDashboard from './Components/Dashboard/EmployeeDashboard/DriverEmployeeDashboard'

import DriverView from './Components/Pages/Police/DriverView';
import VehicleView from './Components/Pages/Police/VehicleView';
import FinePage from './Components/Pages/Police/FinePage';
import RequesRevenuePage from './Components/Pages/Revenue/RequesRevenuePage';
import RevenueEMpPage from './Components/Pages/Revenue/RevenueEMpPage';
import RevenueEmpAddForm from './Components/Pages/Revenue/RevenueEmployeeAddForm';
import VehicleViewPage from './Components/Pages/Revenue/VehicleViewPage';

import RegisterRevenu from './Components/Pages/Revenue/RegisterRevenu';
import RegisterRevuenu from './Components/Pages/Revenue/RegisterRevenu';
import LoginInsurance from './Components/Auth/Login/LoginInsurance';
import InsuranceCompanyDashboard from './Components/Dashboard/InsuranceDashboard/InsuranceCompanyDashboard';
import AddInsurance from './Components/Pages/Insurance/AddInsurance';
import AddinsurancePage from './Components/Pages/Insurance/AddinsurancePage';
import MedicalEmployeeDashboard from './Components/Dashboard/EmployeeDashboard/MedicalEmployeeDashboard';
import ExpUpdate from './Components/Pages/Driver/ExpUpdate';
import UserProfile from './Components/Pages/UserProfile';
import MissionTestEmployeeDasgboard from './Components/Dashboard/EmployeeDashboard/MissionTestEmployeeDashboard';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') ||  null);
  const [officeLocation, setOfficeLocation] = useState(localStorage.getItem('officeLocation') || null);
  const [companyname, setcompanyname] = useState(localStorage.getItem('companyname') || null);
  const [companyid, setcompanyid] = useState(localStorage.getItem('companyid') || null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{userRole,setOfficeLocation, officeLocation,companyname,companyid}}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/adminpanel" component={AdminPanel} />
        <Route exact path="/employeepanel" component={EmployeePanel} />       
        <Route path="/login/vehiclerd" render={(props) => <LoginVehicle {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} setOfficeLocation={setOfficeLocation}  />} />
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/dashboard" component={(props) => (<VRDepartmentDasboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/addemp" component={(props) => (< MTERegistrationPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/employee"  component={(props) => (<EmployeePage {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation}/>   
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/vehicle"  component={(props) => (<VehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/addvehicle"  component={(props) => (<RegisterVehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/driver"  component={(props) => (<DriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/adddriver" component={(props) => (<RegisterDriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute  path="/motortrafficregistrationdepartment/:officeLocation/expupdate" component={(props) => (<ExpUpdate {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['motortrafficregistrationdepartment']}  officeLocation={officeLocation} />   
            
        <Route path="/login/revenuelrd" render={(props) => <LoginRevenue {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} setOfficeLocation={setOfficeLocation} />} />
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/dashboard" component={(props) => (<RRDepartmentDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>          
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/addrevenue" component={(props) => (<RegisterRevuenu {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>          
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/requestrevenue" component={(props) => (<RequesRevenuePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>  
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/revenueemppage" component={(props) => (<RevenueEMpPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>  
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/addrevenueemp" component={(props) => (<RevenueEmpAddForm {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>  
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/viewVehicle" component={(props) => (<VehicleViewPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>  
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/updaterevenue" component={(props) => (<RegisterRevenu {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>  
            <PrivateRoute  path="/rregistrationdepartment/:officeLocation/exprevenueupdate" component={(props) => (<RegisterRevenu {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['rregistrationdepartment']}  officeLocation={officeLocation}/>  
                   
        <Route path="/login/police" render={(props) => <LoginPolice {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole}  setOfficeLocation={setOfficeLocation}/>} />
            <PrivateRoute  path="/police/:officeLocation/dashboard" component={(props) => (<PoliceDepartmentDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/police/:officeLocation/policeofficer" component={(props) => (<PoliceEmployeePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/police/:officeLocation/addpoliceofficer" component={(props) => (<PoliceRegistrationPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/police/:officeLocation/fine" component={(props) => (<FinePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/police/:officeLocation/addfine" component={(props) => (<FineForm {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/police/:officeLocation/driver"  component={(props) => (<DriverView {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation} />
            <PrivateRoute  path="/police/:officeLocation/vehicle"  component={(props) => (<VehicleView {...props} userRole={userRole} officeLocation={officeLocation} />) } isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['police']}  officeLocation={officeLocation} />


        <Route path="/login/insurancecompany" render={(props) => <LoginInsurance {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole}  setOfficeLocation={setOfficeLocation}  setcompanyname={setcompanyname} setcompanyid={setcompanyid} />} />
            <PrivateRoute  path="/insurance/:officeLocation/dashboard" component={(props) => (<InsuranceCompanyDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['insurance']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/insurance/:officeLocation/addinsurance" component={(props) => (<AddInsurance {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['insurance']}  officeLocation={officeLocation} companyname={companyname} companyid={companyid} />
            <PrivateRoute  path="/insurance/:officeLocation/addinsurancepage" component={(props) => (<AddinsurancePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['insurance']}  officeLocation={officeLocation} companyname={companyname} companyid={companyid} />
            


        <Route exact path="/register" component={Register} />

        <Route path="/login/mtdemployee" render={(props) => <MTRDloginPage {...props} setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} setOfficeLocation={setOfficeLocation} />} />
            <PrivateRoute  path="/:userRole/:officeLocation/vemployee/dashboard" component={(props) => (<VehicleEmployeeDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['vregistrationdepartment']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/:userRole/:officeLocation/demployee/dashboard" component={(props) => (<DriverEmployeeDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['dregistrationdepartment']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/:userRole/:officeLocation/demployee/driver" component={(props) => (<DriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['dregistrationdepartment']}  officeLocation={officeLocation} /> 
            <PrivateRoute  path="/:userRole/:officeLocation/demployee/adddriver" component={(props) => (<RegisterDriverPage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['dregistrationdepartment']}  officeLocation={officeLocation} /> 
            <PrivateRoute  path="/:userRole/:officeLocation/vemployee/vehicle"  component={(props) => (<VehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['vregistrationdepartment']}  officeLocation={officeLocation} />   
            <PrivateRoute  path="/:userRole/:officeLocation/vemployee/addvehicle"  component={(props) => (<RegisterVehiclePage {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['vregistrationdepartment']}  officeLocation={officeLocation} />   
        
        


            <PrivateRoute  path="/medical/officeLocation/dashboard" component={(props) => (<MedicalEmployeeDashboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['medicaldepartment']}  officeLocation={officeLocation}/>
            <PrivateRoute  path="/missiontest/officeLocation/dashboard" component={(props) => (<MissionTestEmployeeDasgboard {...props} userRole={userRole} officeLocation={officeLocation} />) }  isAuthenticated={isAuthenticated} userRole={userRole} allowedRoles={['missiontestdepartment']}  officeLocation={officeLocation}/>
        

        <Route path="/profile" component={UserProfile} />

        
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
