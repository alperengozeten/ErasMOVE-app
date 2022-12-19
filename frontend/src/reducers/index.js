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
import allUsers from './adminUserReducer';
import notifications from './notificationReducer';
import languages from './languageReducer';




const reducers = {
  app,
  auth,
  error,
  customization,
  applications,
  universities,
  requests,
  announcements,
  languages,
  notifications,
  courses,
  toDoLists,
  user,
  allUsers,
};

export default combineReducers(reducers);
