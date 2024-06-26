import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import GroupsIcon from '@mui/icons-material/Groups';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

const Sidebar = ({ userRole, officeLocation }) => {
  const getSidebarItems = () => {
    switch (userRole) {
      case 'motortrafficregistrationdepartment':
        return [
          { text: 'DashBoard', icon: <GridViewIcon />, path: `/${userRole}/${officeLocation}/dashboard` },
          { text: 'Employees', icon: <PersonIcon />, path: `/${userRole}/${officeLocation}/employee` }, 
          { text: 'Vehicles', icon: <DirectionsCarFilledIcon />, path: `/${userRole}/${officeLocation}/vehicle` },  
          { text: 'Drivers', icon: <GroupsIcon />, path:  `/${userRole}/${officeLocation}/driver`  },  
          { text: 'Exams', icon: <LibraryBooksIcon />, path: '/exams' },
          { text: 'Practical Test', icon: <AddToDriveIcon />, path: '/practical-test' },
          { text: 'L Drivers', icon: <ContactPageIcon />, path: '/l-drivers' },
          { text: 'About Us', icon: <EmojiTransportationIcon />, path: '/about-us' },
          { text: 'Setting', icon: <SettingsIcon />, path: '/settings' },
          
        ];
     
      case 'rregistrationdepartment':
        return [
          { text: 'DashBoard', icon: <GridViewIcon />, path: '/' }, 
          { text: 'First Revenue issue', icon: <DirectionsCarFilledIcon />, path: `/${userRole}/${officeLocation}/viewVehicle` }, 
          { text: 'Add Employee', icon: <PersonAddIcon />, path: `/${userRole}/${officeLocation}/revenueemppage` }, 
          { text: 'Requested revenue', icon: <AssignmentIcon style={{ color: 'green' }} />, path:  `/${userRole}/${officeLocation}/requestrevenue`  }, 
          { text: 'Expired revenue', icon: <DocumentScannerIcon style={{ color: 'red' }}  />, path: '#'  },     
          { text: 'Manual Issue', icon: <PostAddIcon  />, path: '#'  },     
          { text: 'About Us', icon: <EmojiTransportationIcon />, path: '/about-us' },
          { text: 'Setting', icon: <SettingsIcon />, path: '/settings' },
          
        ];
      case 'police':
        return [
          { text: 'DashBoard', icon: <GridViewIcon />, path: `/${userRole}/${officeLocation}/dashboard` },
          { text: 'Police Officers', icon: <PersonIcon />, path: `/${userRole}/${officeLocation}/policeofficer` }, 
          { text: 'Vehicles', icon: <DirectionsCarFilledIcon />, path: `/${userRole}/${officeLocation}/vehicle` },
          { text: 'Drivers', icon: <GroupsIcon />, path: `/${userRole}/${officeLocation}/driver`  }, 
          { text: 'Fines', icon: <LibraryBooksIcon />, path: `/${userRole}/${officeLocation}/fine` },  
          { text: 'Court', icon: <AddToDriveIcon />, path: `` },
          { text: 'About Us', icon: <EmojiTransportationIcon />, path: `` },
          { text: 'Setting', icon: <SettingsIcon />, path: `` },
          
        ];

      case 'vregistrationdepartment':
        return [
          { text: 'DashBoard', icon: <GridViewIcon />, path: `/${userRole}/${officeLocation}/dashboard` },
          { text: 'Add vehicle', icon: <PersonIcon />, path: `/${userRole}/${officeLocation}/vemployee/vehicle` },  
          { text: 'view apply vehicle', icon: <DirectionsCarFilledIcon />, path: `` },       
          { text: 'About Us', icon: <EmojiTransportationIcon />, path: `` },
          { text: 'Setting', icon: <SettingsIcon />, path: `` },
          
        ];

      case 'dregistrationdepartment':
        return [
          { text: 'DashBoard', icon: <GridViewIcon />, path: `/${userRole}/${officeLocation}/dashboard` },
          { text: 'Add Driver', icon: <PersonIcon />, path: `/${userRole}/${officeLocation}/demployee/driver` },  
          { text: 'Update Request', icon: <DirectionsCarFilledIcon />, path: `` },
          { text: 'Medicle', icon: <GroupsIcon />, path: ``  }, 
          { text: 'Exam', icon: <LibraryBooksIcon />, path: `` },  
          { text: 'Practical Test', icon: <AddToDriveIcon />, path: `` },
         
          
        ];


      case 'insurance':
        return [
          { text: 'DashBoard', icon: <GridViewIcon />, path: `/${userRole}/${officeLocation}/dashboard` },
          { text: 'Employee ', icon: <PersonIcon />, path: `/${userRole}/${officeLocation}/addemployee` },
          { text: 'First Registration ', icon: <PersonIcon />, path: `/${userRole}/${officeLocation}/addinsurancepage` },  
          { text: 'Request Update', icon: <DirectionsCarFilledIcon />, path: `` },
          { text: 'About Us', icon: <EmojiTransportationIcon />, path: `` },
          { text: 'Setting', icon: <SettingsIcon />, path: `` },
         
          
        ];
      
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {sidebarItems.map((item, index) => (
           <ListItem key={index} disablePadding>
           <ListItemButton component={Link} to={item.path}>
             <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
             <ListItemText primary={item.text} sx={{ color: 'white' }} />
           </ListItemButton>
         </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default Sidebar;
