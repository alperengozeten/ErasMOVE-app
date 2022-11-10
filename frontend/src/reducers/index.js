import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';
import error from './errorReducer';
import customization from './customizationReducer';

const reducers = {
  app,
  auth,
  error,
  customization,
};

export default combineReducers(reducers);
