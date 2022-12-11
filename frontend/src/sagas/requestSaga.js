import { takeEvery } from 'redux-saga/effects';


import { SEND_REPLACEMENT_OFFER_REQUEST } from '../constants/actionTypes';


function sendReplacementOffer({ payload: { id } }) {
  console.log(`Replacement offerd to student with id ${id}`);
}

const requestSaga = [
  takeEvery(SEND_REPLACEMENT_OFFER_REQUEST, sendReplacementOffer),
];

export default requestSaga;
