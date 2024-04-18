import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Container from '@mui/material/Container';
import Navpage from './NavContent';


function ResponsiveAppBar() {
 
  return (
    <AppBar position="static" sx={{ backgroundColor: '#6905fa' }} >
      <Container maxWidth="xl">
        <Navpage/>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;