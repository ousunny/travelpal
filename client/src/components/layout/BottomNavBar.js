import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  CardTravelOutlined,
  ListAltOutlined,
  PersonOutlineOutlined
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({}));

const BottomNavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('trips');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Fragment>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value="trips" icon={<CardTravelOutlined />} />
        <BottomNavigationAction value="activities" icon={<ListAltOutlined />} />
        <BottomNavigationAction
          value="profile"
          icon={<PersonOutlineOutlined />}
        />
      </BottomNavigation>
    </Fragment>
  );
};

export default BottomNavBar;
