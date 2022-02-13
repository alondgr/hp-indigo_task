import React, { useMemo, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../App';
import { v4 as uuidv4 } from 'uuid';
import '../Invoice.css';

export default function Invoice() {

    const { appData: { packages }, selectedCustomer } = useContext(AppContext);
    const invoiceData = useMemo(() => {
        return ({
            date: new Date().toLocaleDateString('en-US'),
            customerName: selectedCustomer.name,
            customerPackages: packages.filter((p) => p.customerid === selectedCustomer.id),
            totalPrice: selectedCustomer.totalPrice,
            totalWeight: selectedCustomer.totalWeight
        });
    }, [selectedCustomer])
    const history = useHistory();
    useEffect(() => {
        if (Object.keys(selectedCustomer).length === 0) {
            history.push('/customers')
        }
    }, [selectedCustomer]);

    return (
        <div className='invoice'>
        <div className="invoice-header">
            <div className='header-details'>
                <strong>{invoiceData.date}</strong><br />
                {invoiceData.customerName}
            </div>
            <div className='header-id'>
                <h4>Invoice</h4> No. {uuidv4().slice(0, 5)}
            </div>
            </div>
            <div className="main-title main-packages">
                    <div>ID</div>
                    <div>Weight</div>
                    <div>Price</div>
                     
                 </div>
            {invoiceData.customerPackages.map((p) => (
                <div className="main-details">
         
                    <div className="main-packages">
                        <div>
                            {p.id}
                        </div>
                        <div>
                            {p.weight}
                        </div>
                        <div className='column-details'>
                            {p.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </div>
                    </div>
                   
                </div>
            ))}
            <div className="totals">
                <div className="main-total">
                    Total package/s weight: <strong>{invoiceData.totalWeight}KGs</strong>
                </div>
                <div className="column-total">
                    Total: {invoiceData.totalPrice?.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                </div>
            </div>
            {invoiceData && <div className='footer-notes div8'>You've got {invoiceData.customerPackages.length} packages!</div>}
        </div>
    )
}

