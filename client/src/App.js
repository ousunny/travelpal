import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/layout/Profile';
import Alert from './components/layout/Alert';
import BottomNavBar from './components/layout/BottomNavBar';
import PrivateRoute from './components/routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

localStorage.token && setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Container>
            <Alert />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/profile" component={Profile} />
            </Switch>
          </Container>
          <BottomNavBar />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
