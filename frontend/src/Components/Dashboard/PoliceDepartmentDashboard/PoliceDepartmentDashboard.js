import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Card from '../Card/PoliceCards';
import PoliceOfficersTable from '../../Pages/Police/PoliceOfficersTable'
import GetAllDrivers from '../../Pages/Employee/EmpRegisterPage/GetAllDrivers'
import GetAllVehicleTable from '../../Pages/Employee/EmpRegisterPage/GetAllVehicle'
import ResponsiveAppBar from '../Navbar';
import Sidebar from '../Sidebar';

const drawerWidth = 240;

const PoliceDepartmentDashboard = (props) => {
  const { userRole, officeLocation } = props;
 
  return (
    <Box sx={{ display: 'flex',  overflow:'hidden', backgroundColor:'#e5d4fe'}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        {/*import navbar */}
        <ResponsiveAppBar/>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#6905fa' },
        }}
      >
        <Toolbar />
         {/*import Sidebar */}
        <Sidebar userRole={userRole} officeLocation={officeLocation} />


      </Drawer>
         {/*import Content of dashboard */}
         <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
          <Toolbar />

            <div className="row" style={{ paddingBottom: '56px' }}>
              <div className='col-12' >
                <Card />
              </div>
            
            </div>


            <div className="row" style={{ paddingBottom: '36px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}}> Police Officers Table</h3>
          </div>
        </div>


            <div className="row" style={{ paddingBottom: '36px' }}>
              <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <PoliceOfficersTable   userRole={userRole} officeLocation={officeLocation}/>
              </div>
              
            </div>

            <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}} >Drivers Table</h3>
          </div>
        </div>


            <div className="row" style={{ paddingBottom: '36px' }}>
              
              <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <GetAllDrivers/>
              </div>
              
            </div>


            <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}} >Vehicle Table</h3>
          </div>
        </div>

            <div className="row" style={{ paddingBottom: '16px' }}>
             
              <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <GetAllVehicleTable/>
              </div>
              
            </div>
         </Box>


    </Box>
  )
}

export default PoliceDepartmentDashboard