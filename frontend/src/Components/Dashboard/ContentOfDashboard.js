import React from 'react'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Card from './Card/MotorTrafficCards';


const ContentOfDashboard = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Toolbar />

    <div className="row" style={{ paddingBottom: '56px' }}>
      <Card />
    </div>

    <div className="row" style={{ paddingBottom: '16px' }}>
      
    </div>
    <div className="row" style={{ paddingBottom: '16px' }}>
      
    </div>
  </Box>
  )
}

export default ContentOfDashboard