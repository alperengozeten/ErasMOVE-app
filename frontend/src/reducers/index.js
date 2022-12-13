import { combineReducers } from 'redux';

import app from './appReducer';
import auth from './authReducer';
import error from './errorReducer';
import customization from './customizationReducer';
import applications from './applicationReducer';
import universities from './universityReducer';
import requests from './requestsReducer';
import announcements from './announcementReducer';
import courses from './courseReducer';
import toDoLists from './toDoListReducer';
import user from './userReducer';
import notifications from './notificationReducer';



const reducers = {
  app,
  auth,
  error,
  customization,
  applications,
  universities,
  requests,
  announcements,
  notifications,
  courses,
  toDoLists,
  user,
};

export default combineReducers(reducers);
