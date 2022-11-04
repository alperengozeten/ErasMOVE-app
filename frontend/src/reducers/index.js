import { combineReducers } from 'redux';

import app from './appReducer';
import login from './authReducer';

const reducers = {
  app,
  login,
};

export default combineReducers(reducers);
