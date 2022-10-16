import { INIT_APP } from '../constants/actionTypes';

export const initApp = text => ({
  type: INIT_APP,
  payload: text,
});
