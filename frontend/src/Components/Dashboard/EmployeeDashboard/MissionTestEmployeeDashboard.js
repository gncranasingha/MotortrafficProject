import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import DriverRDCard from '../Card/DriverRDCard';
import ResponsiveAppBar from '../Navbar';
import Sidebar from '../Sidebar';
import Emptable from '../../Pages/Employee/Emptable';

const drawerWidth = 240;

const DriverEmployeeDashboard = (props) => {
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
      {/* Import Content of dashboard */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Toolbar />
        {/* Card Component in a Row */}
        <div className="row" style={{ paddingBottom: '56px' }}>
          <div className="col-12">
            <DriverRDCard />
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}} >Drivers Table</h3>
          </div>
        </div>
        {/* Driver Table in a Bootstrap Card with Scrollbar */}
        <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <Emptable userRole={userRole} officeLocation={officeLocation}   />
  
          </div>
        </div>
        {/* Additional Rows if needed */}
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

export default DriverEmployeeDashboard;
