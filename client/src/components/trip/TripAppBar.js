import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import TripInformation from './TripInformation';
import TripMember from './TripMember';

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
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [membersOpen, setMembersOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleInformationClickOpen = () => {
    setInfoOpen(true);
  };

  const handleInformationClose = () => {
    setInfoOpen(false);
  };

  const handleMembersClickOpen = () => {
    setMembersOpen(true);
  };

  const handleMembersClose = () => {
    setMembersOpen(false);
  };

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = e => {
    setAnchorEl(e.currentTarget);

    switch (e.currentTarget.id) {
      case 'members':
        handleMembersClickOpen();
        break;
      case 'edit':
        break;
      default:
        handleMenuClose();
    }

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
          <IconButton
            className={classes.icon}
            onClick={handleInformationClickOpen}
          >
            <InfoOutlined />
          </IconButton>
          <IconButton className={classes.icon} onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TripInformation
        open={infoOpen}
        onClose={handleInformationClose}
        trip={trip}
      />
      <TripMember
        open={membersOpen}
        onClose={handleMembersClose}
        tripId={trip._id}
        members={trip.members}
      />
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
