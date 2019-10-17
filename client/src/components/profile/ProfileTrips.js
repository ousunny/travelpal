import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileTripItem from './ProfileTripItem';
import TripCreate from '../trip/TripCreate';

import { getProfileTrips } from '../../actions/profile';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: theme.spacing(2)
  },
  addIcon: {
    height: '4rem',
    width: '4rem'
  }
}));

const ProfileTrips = ({
  getProfileTrips,
  profile: { trips, loading },
  match
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getProfileTrips(match.params.id);
  }, [getProfileTrips, match.params.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <h2>Trips</h2>
          {trips.length > 0 ? (
            trips.map(trip => <ProfileTripItem key={trip._id} trip={trip} />)
          ) : (
            <h4>No trips found</h4>
          )}
          <IconButton className={classes.icon} onClick={handleClickOpen}>
            <AddCircle className={classes.addIcon} color="primary" />
          </IconButton>
        </Fragment>
      )}
      <TripCreate open={open} onClose={handleClose} />
    </Fragment>
  );
};

ProfileTrips.propTypes = {
  getProfileTrips: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileTrips }
)(ProfileTrips);
