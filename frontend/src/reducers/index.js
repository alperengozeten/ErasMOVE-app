import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';

const reducers = {
  app,
  auth,
};

export default combineReducers(reducers);
