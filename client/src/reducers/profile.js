import { PROFILE_CREATE } from '../actions/types';

const initialState = {
  profile: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_CREATE:
      return {
        ...state,
        profile: payload
      };
    default:
      return state;
  }
}
