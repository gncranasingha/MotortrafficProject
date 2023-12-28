import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';


import ResponsiveAppBar from '../Navbar';
import Sidebar from '../Sidebar';
import ContentOfDashboard from '../ContentOfDashboard';

const drawerWidth = 240;

const RRDepartmentDashboard = (props) => {
  const { userRole, officeLocation } = props;
  return (
    <Box sx={{ display: 'flex' }}>
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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'blue' },
        }}
      >
        <Toolbar />
         {/*import Sidebar */}
        <Sidebar userRole={userRole} officeLocation={officeLocation} />


      </Drawer>
         {/*import Content of dashboard */}
      <ContentOfDashboard/>


    </Box>
  )
}

export default RRDepartmentDashboard