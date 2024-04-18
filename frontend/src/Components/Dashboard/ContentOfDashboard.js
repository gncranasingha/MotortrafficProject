import React from 'react'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import RequestListTable from '../Pages/Revenue/RequestListTable'

import RevenueLRDCard from './Card/RevenueLRDCard';
import RevenueEmpTable from '../Pages/Revenue/RevenueEmpTable';
import ExpListTable from '../Pages/Revenue/ExpListTable';


const ContentOfDashboard = () => {

 
    
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 , overflowY: 'auto'}}>
    <Toolbar />

    <div className="row" style={{ paddingBottom: '56px' }}>
      <div className='col-12' >
      <RevenueLRDCard/>
      </div>
    </div>
      
    <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <RequestListTable/>
          </div>
    </div>

    <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <RevenueEmpTable/>
          </div>
    </div>
    <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          
          </div>
    </div>
  </Box>
  )
}

export default ContentOfDashboard