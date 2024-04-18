import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import GetAllDrivers from '../Employee/EmpRegisterPage/GetAllDrivers';
import { Link } from 'react-router-dom';


const DriverView = ({ userRole, officeLocation }) => {

   
   



  return (
    <Container fluid style={{paddingLeft:"20px", paddingRight:"20px",paddingBottom:"303px", backgroundColor:'#e5d4fe'}} >


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
          color: #6905fa; /* Text color */
          font-size: 2rem; /* Font size */
          margin-bottom: 1rem; /* Bottom margin */
        }
          
          /* Styles for the search button */
          .search-button {
            width: 100%;
          }
          
          /* Custom styles for the link button */
          .custom-link-style {
            background-color: #6905fa; /* Bootstrap primary color */
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




      <h2> Drivers </h2>

      <Form>
        <Row className="mb-3"  >
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

          <br/><br/>
      < GetAllDrivers />
    </Container>
  );
};

export default DriverView;
