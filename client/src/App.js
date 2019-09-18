import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Login from './components/auth/Login';

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Container>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </Container>
    </Fragment>
  </Router>
);

export default App;
