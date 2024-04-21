import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import ResponsiveAppBar from '../Navbar';
import Sidebar from '../Sidebar';
import InsuranceCard from '../Card/InsuranceCard';
import NewInsurance from '../../Pages/Insurance/NewInsurance';

const drawerWidth = 240;

const InsuranceCompanyDashboard = (props) => {
  const { userRole, officeLocation } = props;
  return (
    <Box sx={{ display: 'flex',  overflow:'hidden'}}>
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
         <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' , backgroundColor:'#e5d4fe', paddingBottom:'177px'}}>
          <Toolbar />

            <div className="row" style={{ paddingBottom: '56px' }}>
              <div className='col-12' >
                <InsuranceCard />
              </div>
            
            </div>

            <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}} >New Insurance</h3>
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '16px' }}>
          <div className="col-12">
            <NewInsurance userRole={userRole} officeLocation={officeLocation} />
          </div>
        </div>

            <div className="row" style={{ paddingBottom: '16px' }}>
              
              <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                
              </div>
              
            </div>
            <div className="row" style={{ paddingBottom: '16px' }}>
             
              <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
             
              </div>
              
            </div>
         </Box>


    </Box>
  )
}

export default InsuranceCompanyDashboard