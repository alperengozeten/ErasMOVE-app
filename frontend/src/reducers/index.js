import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';
import error from './errorReducer';
import customization from './customizationReducer';
import applications from './applicationReducer';
import universities from './universityReducer';

const reducers = {
  app,
  auth,
  error,
  customization,
  applications,
  universities
};

export default combineReducers(reducers);
