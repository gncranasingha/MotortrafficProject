import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Emptable from '../Employee/Emptable';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';

import axios from "axios";
import  { useState, useEffect } from 'react'
import RevenueEmpTable from './RevenueEmpTable';

const RevenueEMp = ({ userRole, officeLocation }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);


    let baseUrl = "";

   if (userRole === "rregistrationdepartment") {
     baseUrl = `/${userRole}/${officeLocation}/addrevenueemp`;
   
   }

   const handleSearch = () => {
    const token = localStorage.getItem('token');
    axios
      .get(`http://localhost:5000/api/revenue/search`, {
        headers: { Authorization: token },
        params: { userRole, officeLocation, searchInput },
      })
      .then((response) => {
        setSearchResults(response.data);
        
      })
      .catch((error) => {
        console.error('Error searching vehicles:', error);
      });
  };

  useEffect(()=>{
    handleSearch();
  },[searchInput]);

  

  return (
    <Container fluid style={{paddingLeft:"20px", paddingRight:"20px", backgroundColor: "#e5d4fe", minHeight: "100vh"}} >


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




      <h2>Add Revenue Employee</h2>

      <Form>
        <Row className="mb-3"  >
          <Col xs={8}>
            <Form.Control 
              type="text" 
              placeholder="Search" 
              className="search-bar" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            
               />
          </Col>
          <Col xs={4}>
            <Button variant="outline-primary" className="search-button" onClick={() => handleSearch()} >
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
        Add Revenue Employee
      </ListItemButton>
          <br/><br/>
      <RevenueEmpTable userRole={userRole} officeLocation={officeLocation} searchResults={searchResults}  />
    </Container>
  );
};

export default RevenueEMp;
