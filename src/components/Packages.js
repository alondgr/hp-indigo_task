import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { Button, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppContext } from '../App';

export default function Packages() {


  const { appData: { customers, packages }, setAppData } = useContext(AppContext);




  function handleDeletePackage(id) {
    setAppData({
      customers: [...customers].filter(({ customerId }) => customerId !== id),
      packages: [...packages].filter(({ id: customerId }) => customerId !== id)
    })
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>
              <IconButton
                //  onClick={() => handlePackageAdd()}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"><Link className='link' to="/addpackage">
                  <AddIcon /></Link>
              </IconButton></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.sort((a, b) => {
            return a.shippingOrder - b.shippingOrder
          }).map((row) => {
            return (
              <TableRow key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell >{row.customerName}</TableCell>
                <TableCell >{row.weight}</TableCell>
                <TableCell >{row.price}</TableCell>
                <TableCell ><Button variant="contained"
                  onClick={() => handleDeletePackage(row.id)}
                >Delete</Button>
                  <Button><ArrowUpwardIcon /></Button>
                  <Button> <ArrowDownwardIcon /></Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
