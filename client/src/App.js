import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BottomNavBar from './components/layout/BottomNavBar';
import Routes from './components/routing/Routes';
import Login from './components/auth/Login';

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
          <Switch>
            <Route exact path="/" component={Login} />
            <Route component={Routes} />
          </Switch>
          <BottomNavBar />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
