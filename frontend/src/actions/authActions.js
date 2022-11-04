import { LOG_IN_REQUEST } from '../constants/actionTypes';

export const logInRequest = history => ({
  type: LOG_IN_REQUEST,
  payload: history,
});