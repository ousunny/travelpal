import {
  TRIP_GET,
  TRIP_UPDATE,
  TRIP_ERROR,
  ACTIVITY_UPDATE,
  ACTIVITY_CREATE,
  ACTIVITY_ERROR
} from '../actions/types';

const initialState = {
  trip: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TRIP_GET:
    case TRIP_UPDATE:
    case ACTIVITY_UPDATE:
    case ACTIVITY_CREATE:
      return {
        ...state,
        trip: payload,
        loading: false,
        error: {}
      };
    case TRIP_ERROR:
    case ACTIVITY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
