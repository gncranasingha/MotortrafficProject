import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import VehicleTable from './VehicleTable';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';

const VehiclePage = ({ userRole, officeLocation }) => {
 
   // Define the base URL based on userRole
   let baseUrl = "";

   // Set the base URL based on userRole
   if (userRole === "motortrafficregistrationdepartment") {
     baseUrl = `/${userRole}/${officeLocation}/addvehicle`;
   } else if (userRole === "vregistrationdepartment") {
     baseUrl = `/${userRole}/${officeLocation}/vemployee/addvehicle`;
   }

  return (
    <Container fluid  style={{paddingLeft:"20px", paddingRight:"20px"}}>


    <style>
      {`
        /* YourCustomStyles.css */

        /* Styles for the search bar */
        .search-bar {
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
          }
          h2 {
          color: #007bff; /* Text color */
          font-size: 2rem; /* Font size */
          margin-bottom: 1rem; /* Bottom margin */
        }
          
          /* Styles for the search button */
          .search-button {
            width: 100%;
          }
          
          /* Custom styles for the link button */
          .custom-link-style {
            background-color: #007bff; /* Bootstrap primary color */
            color: #fff;
            border-radius: 0.25rem;
            padding: 0.375rem 20%;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s;
          }
          
          .custom-link-style:hover {
            background-color: #0056b3; /* Darker shade on hover */
            color: #fff;
          }
          
      `}
    </style>




      <h2>Add Vehicle</h2>

      <Form>
        <Row className="mb-3">
          <Col xs={8}>
            <Form.Control type="text" placeholder="Search" className="search-bar" />
          </Col>
          <Col xs={4}>
            <Button variant="outline-primary" className="search-button">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <ListItemButton
        component={Link}
        to={baseUrl}
        className="custom-link-style"
      >
        Add Vehicle
      </ListItemButton>
          <br/><br/>
          
      <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <VehicleTable userRole={userRole} officeLocation={officeLocation} />
          </div>
        </div>
    </Container>
  )
}

export default VehiclePage