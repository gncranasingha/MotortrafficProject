

import React from "react";

const ExpListTable = () => {
  return (
    <div className="container-fluid">
      <style>
        {`
          /* ExpListTable.css */

          /* Custom styles for the entire table */
          .table {
              width: 100%; /* Make the table full-width */
              font-size: 16px;
              background-color: lightblue;
              border: 2px solid black; /* Add border to the entire table */
              margin: 0; /* Remove any margin */
              padding: 0; /* Remove any padding */
          }
          
          /* Custom styles for table headers */
          .table th {
              background-color: #ff000d; /* Header background color */
              color: white; /* Header text color */
              border: 1px solid black; /* Add border to header cells */
          }
          
          /* Custom styles for table rows */
          .table tr {
              border: 1px solid black; /* Add border to all cells in a row */
          }
          
          .table tr:nth-child(even) {
              background-color: #f2f2f2; /* Alternate row background color */
          }
          
          /* Define more custom styles as needed */
          
        `}
      </style>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Office ID</th>
              <th>ID</th>
              <th>ID</th>
              <th>ID</th>
              <th>Full Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>234t43</td>
              <td>200011503175</td>
              <td>200011503175</td>
              <td>nipun chanaka</td>
              <td>nipun chanaka</td>
              <td>
                <button type="button" className="btn btn-outline-danger  " style={{marginLeft:'20px'}} >Delete</button>
                <button type="button" className="btn btn-outline-warning ml-3" style={{marginLeft:'20px'}} >Update</button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpListTable;
