import { takeEvery, put, call, delay } from "redux-saga/effects";
import {
  GET_LANGUAGE_BY_STUDENTID_FAIL,
  GET_LANGUAGE_BY_STUDENTID_SUCCESS,
  GET_LANGUAGE_BY_STUDENTID_REQUEST,
  ADD_LANGUAGE_BY_STUDENTID_FAIL,
  ADD_LANGUAGE_BY_STUDENTID_REQUEST,
  ADD_LANGUAGE_BY_STUDENTID_SUCCESS,
  GET_APPLICATIONS_BY_DEPARTMENT_REQUEST,
} from "../constants/actionTypes";
import { addLanguage, getLanguageByStudentId } from "../lib/api/unsplashService"; //TO BE CHANGED

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
      throw Error("Accept request failed for course approval request ");
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

function* addLanguageByStudentIdReq({payload: { langObj, user }}) {
  yield console.log(`ADD LANGUAGES... `);

  try {
    // TODO: send Post request here
    const { data } = yield call(addLanguage, langObj);

    const status = 200;
    if (status !== 200) {
      throw Error("Add language request failed.");
    }

    yield delay(2);

    yield put({
      type: ADD_LANGUAGE_BY_STUDENTID_SUCCESS,
      payload: {},
    });

    yield put({
      type: GET_APPLICATIONS_BY_DEPARTMENT_REQUEST,
      payload: { user: user, typeForReq: "departmentCoordinator"  }
    });

  } catch (error) {
    yield put({
      type: ADD_LANGUAGE_BY_STUDENTID_FAIL,
      payload: error.message,
    });
  }
}

const languageSaga = [
  takeEvery(GET_LANGUAGE_BY_STUDENTID_REQUEST, getLanguageByStudentIdReq),
  takeEvery(ADD_LANGUAGE_BY_STUDENTID_REQUEST, addLanguageByStudentIdReq),
];

export default languageSaga;
