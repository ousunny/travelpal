import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import PrivateRoute from './PrivateRoute';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Profile from '../layout/Profile';

const Routes = () => {
  return (
    <Container>
      <Alert />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </Container>
  );
};

export default Routes;
