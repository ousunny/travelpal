import axios from 'axios';

import { TRIP_GET, TRIP_ERROR } from '../actions/types';

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
