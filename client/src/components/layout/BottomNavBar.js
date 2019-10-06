import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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

const BottomNavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('trips');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Fragment>
      <BottomNavigation
        className={classes.root}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value="trips"
          icon={<CardTravelOutlined />}
          to="/profile/trips"
          component={Link}
        />
        <BottomNavigationAction
          value="activities"
          icon={<ListAltOutlined />}
          to="/profile/activities"
          component={Link}
        />
        <BottomNavigationAction
          value="profile"
          icon={<PersonOutlineOutlined />}
          to="/account"
          component={Link}
        />
      </BottomNavigation>
    </Fragment>
  );
};

export default BottomNavBar;
