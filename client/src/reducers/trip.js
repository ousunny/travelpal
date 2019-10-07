import { TRIP_GET, TRIP_ERROR } from '../actions/types';

const initialState = {
  trip: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TRIP_GET:
      return {
        ...state,
        trip: payload,
        loading: false,
        error: {}
      };
    case TRIP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
