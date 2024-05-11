import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import VehicleRDCard from '../Card/VehicleRDCard';

import ResponsiveAppBar from '../Navbar';
import Sidebar from '../Sidebar';
import VehicleTable from '../../Pages/Vehicle/VehicleTable';

const drawerWidth = 240;

const VehicleEmployeeDashboard = (props) => {
  const { userRole, officeLocation } = props;

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', backgroundColor:'#e5d4fe' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <ResponsiveAppBar />
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
        <Sidebar userRole={userRole} officeLocation={officeLocation} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Toolbar />
        <div className="row" style={{ paddingBottom: '56px' }}>
          <div className="col-12">
            <VehicleRDCard userRole={userRole} officeLocation={officeLocation} />
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}} >Vehicles Table</h3>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <VehicleTable userRole={userRole} officeLocation={officeLocation}   />
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12">
           
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12">
            
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default VehicleEmployeeDashboard;
