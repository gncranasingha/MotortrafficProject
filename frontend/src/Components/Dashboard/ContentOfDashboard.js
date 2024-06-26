import React from 'react'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import RequestListTable from '../Pages/Revenue/RequestListTable'

import RevenueLRDCard from './Card/RevenueLRDCard';
import RevenueEmpTable from '../Pages/Revenue/RevenueEmpTable';
import ExpListTable from '../Pages/Revenue/ExpListTable';
import RevenueViewTable from '../Pages/Revenue/Revenuetable';


const ContentOfDashboard = (props) => {
  const { userRole, officeLocation } = props;
 
    
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 , overflowY: 'auto', paddingBottom:'146px'}}>
    <Toolbar />

    <div className="row" style={{ paddingBottom: '56px' }}>
      <div className='col-12' >
      <RevenueLRDCard/>
      </div>
    </div>
    <div className="row" style={{ paddingBottom: '16px'  }}>
          <div className="col-12 text-center">
            <h3  style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}} >Revenue License Table</h3>
          </div>
        </div>
      
    <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <RevenueViewTable  userRole={userRole} officeLocation={officeLocation}  />
   
          </div>
    </div>

    <div className="row" style={{ paddingBottom: '16px'  }}>
          <div className="col-12 text-center">
            <h3  style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}} >Employee Table</h3>
          </div>
        </div>

    <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <RevenueEmpTable/>
          </div>
    </div>
   
  </Box>
  )
}

export default ContentOfDashboard