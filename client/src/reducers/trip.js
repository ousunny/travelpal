import {
  TRIP_GET,
  TRIP_UPDATE,
  TRIP_ERROR,
  TRIP_DELETE,
  ACTIVITY_UPDATE,
  ACTIVITY_CREATE,
  ACTIVITY_DELETE,
  ACTIVITY_ERROR,
  MEMBER_ERROR,
  CLEAR_TRIP
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
    case ACTIVITY_DELETE:
      return {
        ...state,
        trip: payload,
        loading: false,
        error: {}
      };
    case TRIP_ERROR:
    case ACTIVITY_ERROR:
    case MEMBER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case TRIP_DELETE:
      return {
        ...state,
        loading: false,
        trip: null,
        error: payload
      };
    case CLEAR_TRIP:
      return {
        ...state,
        loading: false,
        error: {},
        trip: null
      };
    default:
      return state;
  }
}
