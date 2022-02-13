import { React, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../App';

export default function AddPackage() {
    const { appData: { customers, packages }, setAppData } = useContext(AppContext);
    const history = useHistory();
    const [formState, setFormState] = useState({
        id: (Math.floor(Math.random()*90000) + 10000).toString(),
        weight: '',
        customerIndex: '',
        price: '',
        shippingOrder: ''
    });
    function addPackage() {
        Object.values(formState).forEach((value) => {
            Number(value);
            if (!value > 0) return;
        });
        const newPackage = { 
            id: formState.id,
            weight: formState.weight + 'kg',
            customerid: customers[formState.customerIndex].id,
            price: Number(formState.price),
            shippingOrder: Number(formState.shippingOrder),
            customerName: customers[formState.customerIndex].name
        }
    
        const updatedCustomers = [ ...customers ]
        updatedCustomers[formState.customerIndex].totalPrice += newPackage.price;
        updatedCustomers[formState.customerIndex].totalWeight += newPackage.weight;

        setAppData({ 
            customers: updatedCustomers, 
            packages: [...packages, newPackage] 
        });
        history.push('/packages')
    }

    function handleFormChange(field, value) {
        setFormState((state) => {
            const newFormState = {...state};
            newFormState[field] = value;
            return newFormState; 
        })
    }
    
    return (
        <div className="add-package">
            <h2>Add Package</h2>
            <div>
                <label htmlFor="id">Id</label>
                <input type="text" name='id' id="id" disabled defaultValue={formState.id} />
            </div>
            <div>
                <label htmlFor="weight">Weight</label>
                <input type="number" name='weight' id="weight" value={formState.weight} onChange={(e) => handleFormChange('weight', e.target.value)} />
            </div>
            <label htmlFor="customerIndex">Customer</label>
            <select name='customerIndex' id="customerIndex" onChange={(e) =>  handleFormChange('customerIndex', e.target.value)}>
                <option value="" hidden>--Please choose a customer--</option>
                {customers.map((customer, index) => <option key={customer.id} label={customer.name} value={index} />)}
            </select>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" name='price' id="price" value={formState.price} onChange={(e) =>  handleFormChange('price', e.target.value)} />
            </div>
            <div>
                <label htmlFor="shippingOrder">Shipping Order</label>
                <input type="number" name='shippingOrder' id="shippingOrder" value={formState.shippingOrder} onChange={(e) =>  handleFormChange('shippingOrder', e.target.value)} />
            </div>
            <button onClick={() => addPackage()}>Submit</button>
        </div>
    )
}
