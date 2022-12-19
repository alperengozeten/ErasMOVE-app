import { takeEvery, put, call } from 'redux-saga/effects';
import { GET_LANGUAGE_BY_STUDENTID_FAIL, GET_LANGUAGE_BY_STUDENTID_SUCCESS, GET_LANGUAGE_BY_STUDENTID_REQUEST } from '../constants/actionTypes';
import { getLanguageByStudentId } from '../lib/api/unsplashService'; //TO BE CHANGED

function* getLanguageByStudentIdReq({ payload: { id } }) {
    yield console.log(`Get language... `);
    console.log(id);

    try {

        let languages = [];
        console.log(languages);
        
        const { data } = yield call(getLanguageByStudentId, id);
        languages = [...languages, ...data];

        console.log(languages);
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for course approval request ');
        }
  
        yield put({
            type: GET_LANGUAGE_BY_STUDENTID_SUCCESS,
            payload: languages,
        });

    } catch (error) {
      yield put({
        type: GET_LANGUAGE_BY_STUDENTID_FAIL,
        payload: error.message,
      });
    }
}

const languageSaga = [
    takeEvery(GET_LANGUAGE_BY_STUDENTID_REQUEST, getLanguageByStudentIdReq),
];

export default languageSaga;
