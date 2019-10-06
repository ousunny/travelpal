import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileTrip from './ProfileTrip';

import { getProfileTrips } from '../../actions/profile';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ProfileTrips = ({
  getProfileTrips,
  profile: { trips, loading },
  match
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProfileTrips(match.params.id);
  }, [getProfileTrips, match.params.id]);

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
            trips.map(trip => <ProfileTrip key={trip._id} trip={trip} />)
          ) : (
            <h4>No trips found</h4>
          )}
        </Fragment>
      )}
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
