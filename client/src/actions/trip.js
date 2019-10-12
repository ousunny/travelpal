import axios from 'axios';

import {
  TRIP_GET,
  TRIP_UPDATE,
  TRIP_ERROR,
  ACTIVITY_UPDATE,
  ACTIVITY_ERROR
} from '../actions/types';

import { setAlert } from '../actions/alert';

export const getTripById = tripId => async dispatch => {
  try {
    const res = await axios.get(`/api/trips/${tripId}`);

    dispatch({
      type: TRIP_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateActivity = (
  tripId,
  date,
  activityId,
  formData
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      op: 'edit',
      date,
      ...formData
    });

    const res = await axios.patch(
      `/api/trips/${tripId}/activities/${activityId}`,
      body,
      config
    );

    dispatch({
      type: ACTIVITY_UPDATE,
      payload: res.data
    });

    dispatch(setAlert('Changes saved!', 'success'));
  } catch (err) {
    dispatch({
      type: ACTIVITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const interested = (tripId, date, activityId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({
      op: 'edit',
      date,
      interested: true
    });

    const res = await axios.patch(
      `/api/trips/${tripId}/activities/${activityId}`,
      body,
      config
    );

    dispatch({
      type: TRIP_UPDATE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRIP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
