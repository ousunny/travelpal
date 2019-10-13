import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { ArrowBackIosOutlined, InfoOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  },
  icon: {
    color: '#fff'
  }
}));

const TripAppBar = ({ title, props }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          className={classes.icon}
          edge="start"
          to="/trips"
          component={Link}
        >
          <ArrowBackIosOutlined />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        <IconButton className={classes.icon}>
          <InfoOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

TripAppBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default TripAppBar;
