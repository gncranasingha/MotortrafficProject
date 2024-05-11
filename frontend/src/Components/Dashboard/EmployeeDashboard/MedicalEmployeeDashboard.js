import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import ResponsiveAppBar from '../Navbar';
import RequestView from '../../Pages/Medical/RequestView';


const drawerWidth = 240;

const MedicalEmployeeDashboard = (props) => {
  const { userRole, officeLocation } = props;

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', backgroundColor:'#e5d4fe' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <ResponsiveAppBar />
      </AppBar>
     
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Toolbar />
       
        <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        
                <RequestView/>
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

export default MedicalEmployeeDashboard;
