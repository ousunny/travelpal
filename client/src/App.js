import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
