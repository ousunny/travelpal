import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TripInformation from './TripInformation';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import {
  ArrowBackIosOutlined,
  InfoOutlined,
  MoreVert
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1
  },
  icon: {
    color: '#fff'
  }
}));

const TripAppBar = ({ trip, trip: { title, information }, props }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleDialogClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = e => {
    setAnchorEl(e.currentTarget);
    handleMenuClose();
  };

  return (
    <Fragment>
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
          <IconButton className={classes.icon} onClick={handleDialogClickOpen}>
            <InfoOutlined />
          </IconButton>
          <IconButton className={classes.icon} onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TripInformation open={open} onClose={handleDialogClose} trip={trip} />
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem id="members" onClick={handleMenuClick}>
          <p>Members</p>
        </MenuItem>
        <MenuItem id="edit" onClick={handleMenuClick}>
          <p>Edit</p>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

TripAppBar.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripAppBar;
