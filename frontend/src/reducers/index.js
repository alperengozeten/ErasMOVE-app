import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';
import error from './errorReducer';
import customization from './customizationReducer';
import applications from './applicationReducer';
import universities from './universityReducer';
import requests from './requestsReducer';
import courseRequests from './courseRequestsReducer';
import announcements from './announcementReducer';


const reducers = {
  app,
  auth,
  error,
  customization,
  applications,
  universities,
  requests,
  courseRequests,
  announcements,
};

export default combineReducers(reducers);
