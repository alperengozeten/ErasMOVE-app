import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';
import error from './errorReducer';

const reducers = {
  app,
  auth,
  error,
};

export default combineReducers(reducers);
