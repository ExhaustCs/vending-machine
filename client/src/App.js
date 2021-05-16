import './App.css';
import { React } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Components
import { VendingMachinePage } from './Routes/Customer/VendingMachinePage';
import { AddItemPage } from './Routes/Vendor/AddItem/AddItemPage';
import { UpdateItemPage } from './Routes/Vendor/UpdateItem/UpdateItemPage';
import { Purchases } from './Routes/Vendor/Purchases/Purchases';

function App() {
  return (
    <div className='container'>
      <Router>
        <Switch>
          {/* <Route
            exact
            path='/'
            render={(props) => <Customer {...props} title='HEY'></Customer>}
          /> */}
          <Route exact path='/' render={() => <VendingMachinePage />} />
          <Route exact path='/vendor' render={() => <Purchases />} />
          <Route exact path='/vendor/add' render={() => <AddItemPage />} />
          <Route
            exact
            path='/vendor/update'
            render={() => <UpdateItemPage />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
