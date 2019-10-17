import axios from 'axios';

import { PROFILE_CREATE, PROFILE_GET_TRIPS, CLEAR_TRIP } from './types';

import { setAlert } from './alert';

import setAuthToken from '../utils/setAuthToken';

export const createProfile = () => async dispatch => {
  localStorage.token && setAuthToken(localStorage.token);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/profiles', config);

    dispatch({
      type: PROFILE_CREATE,
      payload: res.data
    });
  } catch (err) {
    const { errors } = err.response.data;

    errors && errors.map(error => dispatch(setAlert(error.msg, 'error')));
  }
};

export const getProfileById = userId => async dispatch => {};

export const getProfileTrips = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/profiles/${userId}/trips`);

    dispatch({
      type: PROFILE_GET_TRIPS,
      payload: res.data.trips
    });

    dispatch({
      type: CLEAR_TRIP
    });
  } catch (err) {}
};
