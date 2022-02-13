import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppContext } from '../App';

export default function Customers() {

    const { appData: { customers, packages }, setAppData, setSelectedCustomer } = useContext(AppContext);
    function handleDeleteCustomer(id) {
        setAppData({
            customers: [...customers].filter(({ id: customerId }) => customerId !== id),
            packages: [...packages].filter(({ customerid }) => customerid !== id)
        })
    }

    function handleCustomerSelect(customer) {
        setSelectedCustomer(customer);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >id</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers && customers.map((row) => {
                        return (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell ><Button variant="contained" onClick={() => handleCustomerSelect(row)}>
                                    <Link className='link' to="/invoice" id={row.id}>
                                        Create Invoice
                                    </Link>
                                </Button>
                                </TableCell>
                                <TableCell ><Button variant="contained"
                                    onClick={() => handleDeleteCustomer(row.id)}>Delete</Button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


