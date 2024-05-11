import * as React from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';



function createData(name, calories, fat, carbs,Expdate, protein) {
  return { name, calories, fat, carbs,Expdate, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function RequestListTable({ userRole, officeLocation }) {

  const history = useHistory();

  const handleUpdateDate = () => {
   
    history.push(`/${userRole}/${officeLocation}/updaterevenue`);
  };


  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          fontSize: '1.2rem',
          border: '0',
        }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                bgcolor: '#1800ff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '0',
              }}
            >
              User Name
            </TableCell>
            <TableCell
              align="right"
              sx={{
                bgcolor: '#1800ff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '0',
              }}
            >
              Vehicle No
            </TableCell>
            <TableCell
              align="right"
              sx={{
                bgcolor: '#1800ff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '0',
              }}
            >
              chassisno
            </TableCell>
            <TableCell
              align="right"
              sx={{
                bgcolor: '#1800ff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '0',
              }}
            >
             Issue Date
            </TableCell>
            <TableCell
              align="right"
              sx={{
                bgcolor: '#1800ff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '0',
              }}
            >
             Exp Date
            </TableCell>
            <TableCell
              align="right"
              sx={{
                bgcolor: '#1800ff',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '0',
              }}
            >
             Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ border: '0', color: '#1471eb', fontSize:'19px' }}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ border: '0', color: 'blue', fontWeight: '#1471eb' }}>
                {row.calories}
              </TableCell>
              <TableCell align="right" sx={{ border: '0', color: 'blue',fontWeight: '#1471eb' }}>
                {row.fat}
              </TableCell>
              <TableCell align="right" sx={{ border: '0', color: 'blue',fontWeight: '#1471eb', }}>
                {row.carbs}
              </TableCell>
              <TableCell align="right" sx={{ border: '0', color: 'blue',fontWeight: '#1471eb', }}>
                {row.Expdate}
              </TableCell>
              <TableCell align="right" sx={{ border: '0', color: 'blue',fontWeight: '#1471eb', fontSize:'16px' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: 'green', color: 'white' }}
                  onClick={handleUpdateDate}
                >
                  Update Date
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
