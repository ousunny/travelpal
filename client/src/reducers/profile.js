import { PROFILE_CREATE, PROFILE_GET_TRIPS } from '../actions/types';

const initialState = {
  profile: null,
  trips: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_CREATE:
      return {
        ...state,
        profile: payload
      };
    case PROFILE_GET_TRIPS:
      return {
        ...state,
        trips: payload,
        loading: false
      };
    default:
      return state;
  }
}
