import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import FineTable from './FineTable';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ManualFineTable from './ManualFine';
import AutoFineTable from './AutoFIne';

const FinePage = ({ userRole, officeLocation }) => {
 
 

  return (
    <Container fluid  style={{paddingLeft:"20px", paddingRight:"20px",backgroundColor: "#e5d4fe"}}>


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




      <h2>Fines</h2>

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
        to={`/${userRole}/${officeLocation}/addfine`}
        className="custom-link-style"
      >
        Add Fine
      </ListItemButton>
          <br/><br/>

        <div className="row" style={{ paddingBottom: '36px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}}> All Fines Table</h3>
          </div>
        </div>
          
      <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <FineTable userRole={userRole} officeLocation={officeLocation} />
          </div>
      </div>

      <div className="row" style={{ paddingBottom: '36px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}}>Manual Fines Table</h3>
          </div>
        </div>


      <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <ManualFineTable userRole={userRole} officeLocation={officeLocation} />
          </div>
      </div>

      <div className="row" style={{ paddingBottom: '36px' }}>
          <div className="col-12 text-center ">
            <h3 style={{color:'#6905fa',fontWeight:'bold', fontFamily:'serif'}}>Auto Fines Table</h3>
          </div>
        </div>


      <div className="row" style={{ paddingBottom: '16px', paddingRight:'20px' }}>
          <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <AutoFineTable userRole={userRole} officeLocation={officeLocation} />
          </div>
        </div>
    </Container>
  )
}

export default FinePage