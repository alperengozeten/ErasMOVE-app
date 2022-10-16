import { createSelector } from 'reselect';

export const getApp = state => state.app;

export const getAppText = createSelector(
  [getApp],
  app => app.text,
);
