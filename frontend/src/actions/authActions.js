import { CHANGE_PASSWORD_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST, SEND_CODE_REQUEST } from '../constants/actionTypes';

export const logInRequest = (user, navigate) => ({
  type: LOG_IN_REQUEST,
  payload: { user, navigate },
});

export const logOutRequest = navigate => ({
  type: LOG_OUT_REQUEST,
  payload: navigate,
});

export const sendCodeRequest = email => ({
  type: SEND_CODE_REQUEST,
  payload: email,
});

export const changePasswordRequest = user => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: user,
});