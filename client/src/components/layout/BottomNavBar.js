import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  CardTravelOutlined,
  ListAltOutlined,
  PersonOutlineOutlined
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: '0'
  }
}));

const BottomNavBar = ({ auth, auth: { user, isAuthenticated, loading } }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('trips');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Fragment>
      {user && (
        <BottomNavigation
          className={classes.root}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            value="trips"
            icon={<CardTravelOutlined />}
            to={`/profiles/${user._id}/trips`}
            component={Link}
          />
          <BottomNavigationAction
            value="activities"
            icon={<ListAltOutlined />}
            to={`/profiles/${user._id}/activities`}
            component={Link}
          />
          <BottomNavigationAction
            value="profile"
            icon={<PersonOutlineOutlined />}
            to="/account"
            component={Link}
          />
        </BottomNavigation>
      )}
    </Fragment>
  );
};

BottomNavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(BottomNavBar);
