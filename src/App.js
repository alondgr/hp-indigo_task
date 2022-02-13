import React, { useState, useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './App.css';
import Customers from './components/Customers';
import Packages from './components/Packages';
import Invoices from './components/Invoices';
import Invoice from './components/Invoice';
import AddPackage from './components/AddPackage';

export const AppContext = createContext();


const LOCAL_STORAGE_KEY = 'delivery-app';

function App() {
  const [appData, setAppData] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(saved) || { customers: [], packages: [] };
  });

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function getAppData() {
      const res = await fetch("/data.json");
      const data = await res.json();
      setAppData({
        customers: data.customers,
        packages: data.packages.map((p) => ({
          ...p, 
          customerName: data.customers.find((c) => c.id === p.customerid).name
        }))
      });
    }
    if (!appData.customers.length || !appData.packages.length) {
      getAppData();
    }
  }, []);



  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData))
  }, [appData]);



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  const toggleDrawer = (open) => () => {
    setIsMenuOpen(open);
  }

  const appContextValue = {
    appData, setAppData, invoices, setInvoices, selectedCustomer, setSelectedCustomer
  }


  const sumInvoice = (customer, i) => {
    setAppData((prevState) => {
        const data = { ...prevState };
        data.customers[i].totalPrice = 0;
        data.customers[i].totalWeight = 0; 
        data.packages.forEach((p) => {
            if (p.customerid === customer.id) {
                customer.totalPrice += p.price;
                customer.totalWeight += parseFloat(p.weight);
            }
        });
        return data;
    })
}


useEffect(() => {
    appData.customers.forEach((customer, i) => {
        sumInvoice(customer, i);
    })
}, [appData.packages])


  return (
    <AppContext.Provider value={appContextValue}>
      <Router>
        <div className="App">
          <Box sx={{ flexGrow: 3 }}>
            <AppBar position="static">
              <Toolbar onClick={toggleDrawer(true)}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Mail Delivery Service
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>


          <Drawer anchor={"left"} open={isMenuOpen} onClose={toggleDrawer(false)}>
            <List style={{ width: "300px" }}>
              <ListItem button onClick={toggleDrawer(false)}>
                <Link to="/customers" className='link'>
                  <ListItemText primary={"Customer list"} />
                </Link>
              </ListItem>
              <ListItem button onClick={toggleDrawer(false)}>
                <Link to="/packages" className='link'>
                  <ListItemText primary={"Packsage list"} />
                </Link>
              </ListItem>
              <ListItem button onClick={toggleDrawer(false)}>
                <Link to="/invoices" className='link'>
                  <ListItemText primary={"Invoices"} />
                </Link>
              </ListItem>
            </List>
          </Drawer>
          <Switch>
            <Route path='/customers'>
              <Customers />
            </Route>
            <Route path='/packages'>
              <Packages />
            </Route>
            <Route path='/invoices'>
              <Invoices />
            </Route>
            <Route path='/addpackage'>
              <AddPackage />
            </Route>
            <Route path='/invoice'>
              <Invoice />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppContext.Provider>

  );
}

export default App;