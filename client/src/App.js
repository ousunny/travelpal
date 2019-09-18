import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Container>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Container>
    </Fragment>
  </Router>
);

export default App;
