import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container } from '@material-ui/core';

import PrivateRoute from './PrivateRoute';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import ProfileTrips from '../profile/ProfileTrips';
import Trip from '../trip/Trip';
import Account from '../layout/Account';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute
          exact
          path="/profiles/:id/trips"
          component={ProfileTrips}
        />
        <PrivateRoute exact path="/trips/:tripId" component={Trip} />
        <PrivateRoute exact path="/account" component={Account} />
        <Route component={Login} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
