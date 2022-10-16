import { combineReducers } from 'redux';

import app from './appReducer';

const reducers = {
  app,
};

export default combineReducers(reducers);
