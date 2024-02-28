import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from "axios";
import  { useState, useEffect } from 'react';
import './RequesRevenuPage.css';
import RequstListTable from './RequestListTable';

const RequesRevenuePage = ({userRole,officeLocation }) => {
  return (
    <Container fluid style={{ backgroundColor: "#d4e8ec", minHeight: "100vh" }}>
      <br />
      <h2>Request Revenues</h2>
      <br /><br />

      <Form>
        <Row className="mb-3">
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Search"
              className="search-bar"
            />
          </Col>
          <Col xs={4}>
            <Button style={{fontWeight:'bold'}} variant="outline-primary" className="search-button">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <br /><br />

      <div className="row" style={{ paddingBottom: '16px', paddingRight: '20px' }}>
        <div className="col-12" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <RequstListTable userRole={userRole} officeLocation={officeLocation}/>
        </div>
      </div>
    </Container>
  );
}

export default RequesRevenuePage;
