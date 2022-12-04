import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';
import error from './errorReducer';
import customization from './customizationReducer';
import applications from './applicationReducer';
import universities from './universityReducer';
import requests from './requestsReducer';


const reducers = {
  app,
  auth,
  error,
  customization,
  applications,
  universities,
  requests
};

export default combineReducers(reducers);
