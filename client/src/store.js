import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');

  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
