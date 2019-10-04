import axios from 'axios';

import { PROFILE_CREATE } from './types';

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
