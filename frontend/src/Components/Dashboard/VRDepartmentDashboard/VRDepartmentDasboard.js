import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Card from '../Card/MotorTrafficCards';
import VehicleTable from '../../Pages/Vehicle/VehicleTable';
import Emptable from '../../Pages/Employee/Emptable';
import MotorTrafficEmpTable from '../../Pages/Employee/EmpRegisterPage/MotorTrafficEmpTable'
import ResponsiveAppBar from '../Navbar';
import Sidebar from '../Sidebar';

const drawerWidth = 240;

const VRDepartmentDasboard = (props) => {
  const { userRole, officeLocation } = props;

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <ResponsiveAppBar />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'blue' },
        }}
      >
        <Toolbar />
        <Sidebar userRole={userRole} officeLocation={officeLocation} />
      </Drawer>
      {/* Import Content of dashboard */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Toolbar />
        {/* Card Component in a Row */}
        
        <div className="row" style={{ paddingBottom: '56px' }}>
          <div className="col-12">
            <Card />
          </div>
        </div>

        {/* Vehicle Table in a Bootstrap Card with Scrollbar */}
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center">
            <h3 className="font-weight-bold text-primary" >Vehicle Table</h3>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '36px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <VehicleTable userRole={userRole} officeLocation={officeLocation}/>
          </div>
        </div>
        {/* Additional Rows if needed */}
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center ">
            <h3 className="font-weight-bold text-primary" >Drivers Table</h3>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '36px' }}>
          <div className="col-12">
            <Emptable userRole={userRole} officeLocation={officeLocation} />
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center ">
            <h3 className="font-weight-bold text-primary" >Motor Traffic Employee Table</h3>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12">
            <MotorTrafficEmpTable userRole={userRole} officeLocation={officeLocation} />
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default VRDepartmentDasboard;
