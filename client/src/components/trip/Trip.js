import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { getTripById } from '../../actions/trip';

import Day from './Day';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const Trip = ({ getTripById, match, trip: { trip, loading, error } }) => {
  const classes = useStyles();

  useEffect(() => {
    getTripById(match.params.tripId);
  }, [getTripById, match.params.tripId]);

  if (error.msg)
    return (
      <Fragment>
        {error.status} - {error.msg}
      </Fragment>
    );

  return (
    <Fragment>
      {loading || !trip ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <h1>{trip.title}</h1>
          <h3>
            <Moment format="YYYY/MM/DD">{trip.date.start}</Moment> -{' '}
            <Moment format="YYYY/MM/DD">{trip.date.end}</Moment>
          </h3>
          <h4>Destination: {trip.destination}</h4>
          {trip.itinerary.length > 0 ? (
            trip.itinerary.map(day => (
              <Day key={day._id} tripId={match.params.tripId} day={day} />
            ))
          ) : (
            <h4>Add a start and end date</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Trip.propTypes = {
  getTripById: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip
});

export default connect(
  mapStateToProps,
  { getTripById }
)(Trip);
