import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { getTripById } from '../../actions/trip';

import TripAppBar from './TripAppBar';
import Day from './Day';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  list: {
    paddingBottom: '5rem'
  }
}));

const Trip = ({ auth, getTripById, match, trip: { trip, loading, error } }) => {
  const classes = useStyles();

  useEffect(() => {
    getTripById(match.params.tripId);
  }, [getTripById, match.params.tripId]);

  if (!loading && !trip && error.msg) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {loading || !trip ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.list}>
          <TripAppBar trip={trip} />
          <Typography variant="h5">
            <Moment format="YYYY/MM/DD">{trip.date.start}</Moment> -{' '}
            <Moment format="YYYY/MM/DD">{trip.date.end}</Moment>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Destination: {trip.destination}
          </Typography>
          {trip.itinerary.length > 0 ? (
            trip.itinerary.map(day => (
              <Day key={day._id} tripId={match.params.tripId} day={day} />
            ))
          ) : (
            <h4>Add a start and end date</h4>
          )}
        </div>
      )}
    </Fragment>
  );
};

Trip.propTypes = {
  getTripById: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getTripById }
)(Trip);
