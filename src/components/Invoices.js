
import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppContext } from '../App';

export default function Invoices() {

    const { appData: { customers } } = useContext(AppContext);





    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name </TableCell>
                        <TableCell>Total Weight</TableCell>
                        <TableCell>Total Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.filter((c) => c.totalPrice).map((row) => {
                        return (
                            <TableRow key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell> {row.totalWeight} Kg</TableCell>
                                <TableCell>{row.totalPrice}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
