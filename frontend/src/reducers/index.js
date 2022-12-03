import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';
import error from './errorReducer';
import customization from './customizationReducer';
import applications from './applicationReducer';

const reducers = {
  app,
  auth,
  error,
  customization,
  applications,
};

export default combineReducers(reducers);
