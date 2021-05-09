import './App.css';
import { React, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Item } from './components/Item';
import { Purchases } from './components/Purchases';
import { AddItem } from './components/AddItem';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => <Item {...props} title='HEY'></Item>}
        />
        <Route exact path='/vendor' render={() => <Purchases />} />
        <Route exact path='/vendor/add' render={() => <AddItem />} />
      </Switch>
    </Router>
  );
}

export default App;
